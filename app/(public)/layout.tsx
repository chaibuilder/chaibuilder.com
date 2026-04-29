import { PageScripts } from "@/components/website-settings/page-scripts";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./public.css";

export const metadata: Metadata = {
  title: "Chai Builder",
  description: "Chai Builder",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`scroll-smooth`} lang="en">
      <body className={`antialiased`}>
        {children}
        <PageScripts />
        <Analytics />
      </body>
    </html>
  );
}
