import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(
      /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
      "Введите корректный номер телефона"
    ),
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
    return NextResponse.json(
      { error: "Некорректные данные формы" },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Укажите телефон" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.LEAD_RECIPIENT_EMAIL;
  const sender = process.env.LEAD_SENDER_EMAIL;

  if (!apiKey || !recipient || !sender) {
    console.error("Lead email environment variables are not configured");

    return NextResponse.json(
      { error: "Форма временно недоступна" },
      { status: 503 },
    );
  }

  const phone = parsed.data.phone;

  const html = `
    <h2>Новая заявка с сайта</h2>
    <p><strong>Телефон клиента:</strong> ${escapeHtml(phone)}</p>
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
      subject: `Новая заявка с сайта — ${phone}`,
      html,
    }),
  });

  if (!response.ok) {
    const details = await response.text();

    console.error(
      "Resend rejected lead email",
      response.status,
      details,
    );

    return NextResponse.json(
      { error: "Не удалось отправить заявку" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}