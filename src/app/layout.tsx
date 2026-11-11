import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goliath — Evolution & Workout Tracker",
  description:
    "Sistema unificado de acompanhamento de treinos ao vivo, periodização por blocos, medidas corporais e análise biomecânica",
  icons: {
    icon: "/goliath-logo.jpg",
    apple: "/goliath-logo.jpg",
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
