import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "My Bookshelf",
  description: "Track your reading journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${nunito.variable} font-nunito antialiased`}>
        {children}
      </body>
    </html>
  );
}
