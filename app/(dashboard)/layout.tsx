import { getUser } from "@/actions/get-user-action";
import "@/app/(public)/public.css";
import { getChaiSiteSettings } from "@/chai";
import { Logo } from "@/components/builder/logo";
import { Clarity } from "@/components/clarity";
import { UserProfile } from "@/components/dashboard/user-profile";
import { registerFonts } from "@/fonts";
import { getFontHref, getThemeCustomFontFace } from "@/utils/styles-helper";
import { getChaiThemeCssVariables } from "@chaibuilder/sdk/render";
import { GoogleTagManager } from "@next/third-parties/google";
import { get } from "lodash";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { SalesIQ } from "../SalesIQ";

registerFonts();

export const metadata: Metadata = {
  title: "Chaibuilder - Websites",
  description: "Manage your Chaibuilder websites",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await getChaiSiteSettings();
  if ("error" in siteSettings) {
    console.error(siteSettings.error);
  }
  const theme = get(siteSettings, "theme", {});
  const themeCssVariables = getChaiThemeCssVariables(theme);
  const bodyFont = get(theme, "fontFamily.body", "Inter");
  const headingFont = get(theme, "fontFamily.heading", "Inter");
  const fontUrls = getFontHref([bodyFont, headingFont]);
  const customFontFace = getThemeCustomFontFace([bodyFont, headingFont]);
  const user = await getUser();
  return (
    <html dir="ltr" className="smooth-scroll">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {fontUrls.map((fontUrl: string) => (
          <link key={fontUrl} rel="preload" href={fontUrl} as="style" crossOrigin="" />
        ))}

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <style id="theme-colors" dangerouslySetInnerHTML={{ __html: themeCssVariables }} />
        {fontUrls.map((fontUrl: string) => (
          <link key={fontUrl} rel="stylesheet" href={fontUrl} />
        ))}
        <style id="custom-font-face" dangerouslySetInnerHTML={{ __html: customFontFace }} />
      </head>
      <body className="font-body antialiased">
        <div className="flex h-screen flex-col">
          <header className="border-b bg-white">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <Logo shouldRedirect={false} />
                <span className="ml-2 text-xl font-bold tracking-wide uppercase">Chai Builder</span>
              </div>
              <UserProfile user={user} />
            </div>
          </header>
          <div className="container flex-1 h-full">{children}</div>
        </div>
        <Toaster richColors />
        <Clarity />
        {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
        <SalesIQ />
      </body>
    </html>
  );
}
