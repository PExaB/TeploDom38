import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Теплодом38",
  description: "Утепление домов и промышленных объектов напыляемым ППУ",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
