import type { Metadata } from "next";
import { Antonio, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// Antonio: sans condensada, alta e geométrica — ecoa as proporções
// da logo (GABRIELA SILVA) em vez da serifa suave anterior (Fraunces).
const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gabriela Silva | Psicóloga Clínica",
  description:
    "Atendimento psicológico acolhedor com Gabriela Silva, psicóloga clínica (CRP 06/175907). Sessões online e presenciais.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" className={`${antonio.variable} ${inter.variable}`}>
        <body className="font-sans">{children}</body>
      </html>
    </ClerkProvider>
  );
}
