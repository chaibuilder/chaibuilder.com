import "@chaibuilder/pro/styles";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./builder.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChaiBuilder Editor",
  description: "ChaiBuilder Editor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={geist.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
