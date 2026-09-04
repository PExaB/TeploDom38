import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Теплодом38 — утепление домов древесным волокном Krasinsul",
  description: "Утепление стен, пола, перекрытий и кровли натуральным задувным древесным утеплителем в Иркутске и области.",
  keywords: [
    "древесный утеплитель",
    "задувной утеплитель",
    "утепление дома Иркутск",
    "Krasinsul",
    "утепление каркасного дома",
  ],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
