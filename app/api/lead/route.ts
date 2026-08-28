import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  phone: z.string().trim().min(7, "Укажите телефон").max(30),
  website: z.string().optional().default(""),
  area: z.coerce.number().min(20).max(500),
  thickness: z.coerce.number().min(30).max(100),
  estimate: z.coerce.number().positive().optional(),
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

  const estimate = Math.round(lead.area * 1100 * (lead.thickness / 50));
  const formattedEstimate = new Intl.NumberFormat("ru-RU").format(estimate);
  const subject = `Новая заявка с сайта — ${lead.name}`;
  const html = `
    <h2>Новая заявка на расчёт утепления</h2>
    <p><strong>Имя:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Телефон:</strong> ${escapeHtml(lead.phone)}</p>
    <p><strong>Площадь:</strong> ${lead.area} м²</p>
    <p><strong>Толщина слоя:</strong> ${lead.thickness} мм</p>
    <p><strong>Ориентировочная стоимость:</strong> ${formattedEstimate} ₽</p>
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
      reply_to: recipient,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Resend rejected lead email", response.status, details);
    return NextResponse.json({ error: "Не удалось отправить заявку. Попробуйте ещё раз." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
