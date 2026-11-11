import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATLAS — Biomechanics, Strength & Evolution",
  description:
    "O peso do cosmos sob teus ombros. Sistema de treino de força, periodização por blocos semanais e compêndio biomecânico.",
  icons: {
    icon: "/atlas-full.jpg",
    apple: "/atlas-full.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-sky-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
