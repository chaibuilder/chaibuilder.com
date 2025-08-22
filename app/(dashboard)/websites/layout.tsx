import { getUser } from "@/actions/get-user-action";
import "@/app/(public)/public.css";
import TopNavigation from "@/components/top-navigation";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Website Builder - Project Management",
  description: "Manage your website builder projects and settings",
  generator: "v0.app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <body className="flex h-screen flex-col">
      <TopNavigation user={user} />
      <main className="flex-1 container h-[calc(100vh-4rem)] pb-2 overflow-hidden">{children}</main>
    </body>
  );
}
