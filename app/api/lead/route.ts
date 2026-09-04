import { NextResponse } from "next/server";
import { z } from "zod";

const optionalText = (max: number) => z.preprocess(
  (value) => typeof value === "string" && value.trim() === "" ? undefined : value,
  z.string().trim().max(max).optional(),
);

const optionalNumber = (min: number, max: number) => z.preprocess(
  (value) => value === "" || value === null || value === undefined ? undefined : value,
  z.coerce.number().min(min).max(max).optional(),
);

const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  phone: z.string().trim().min(7, "Укажите телефон").max(30),
  city: optionalText(120),
  workType: optionalText(120),
  area: optionalNumber(1, 10_000),
  thickness: optionalNumber(1, 1_000),
  message: optionalText(2_000),
  website: z.string().optional().default(""),
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректные данные формы" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Проверьте заполненные поля" },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Скрытое поле заполняют автоматические боты. Отвечаем успешно, но письмо не отправляем.
  if (lead.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.LEAD_RECIPIENT_EMAIL;
  const sender = process.env.LEAD_SENDER_EMAIL;

  if (!apiKey || !recipient || !sender) {
    console.error("Lead email environment variables are not configured");
    return NextResponse.json({ error: "Форма временно недоступна. Позвоните нам по телефону." }, { status: 503 });
  }

  const valueOrDash = (value: string | number | undefined, suffix = "") =>
    value === undefined ? "не указано" : `${escapeHtml(String(value))}${suffix}`;

  const subject = `Заявка на расчёт утепления — ${lead.name}`;
  const html = `
    <h2>Новая заявка на расчёт утепления</h2>
    <p><strong>Имя:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Телефон:</strong> ${escapeHtml(lead.phone)}</p>
    <p><strong>Город или район:</strong> ${valueOrDash(lead.city)}</p>
    <p><strong>Что утеплить:</strong> ${valueOrDash(lead.workType)}</p>
    <p><strong>Площадь:</strong> ${valueOrDash(lead.area, " м²")}</p>
    <p><strong>Толщина конструкции:</strong> ${valueOrDash(lead.thickness, " мм")}</p>
    <p><strong>Комментарий:</strong><br>${valueOrDash(lead.message).replaceAll("\n", "<br>")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Resend rejected lead email", response.status, details);
    return NextResponse.json({ error: "Не удалось отправить заявку. Попробуйте ещё раз." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
