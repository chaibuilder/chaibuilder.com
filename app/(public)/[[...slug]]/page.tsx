import { registerCustomBlocks } from "@/blocks";
import { ImageBlock } from "@/blocks/image";
import { PageScripts } from "@/components/website-settings/page-scripts";
import "@/data/global";
import { registerFonts } from "@/fonts";
import { registerPageTypes } from "@/page-types";
import {
  ChaiPageStyles,
  PreviewBanner,
  RenderChaiBlocks,
} from "@chaibuilder/pro/render";
import { ChaiBuilder } from "@chaibuilder/pro/api";
import { loadWebBlocks } from "@chaibuilder/pro/web-blocks";
import { Analytics } from "@vercel/analytics/next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

loadWebBlocks();
registerCustomBlocks();
registerPageTypes();
registerFonts();

export const dynamic = "force-static";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string[] }>;
}) => {
  const nextParams = await props.params;
  const slug = nextParams.slug ? `/${nextParams.slug.join("/")}` : "/";

  const { isEnabled } = await draftMode();
  ChaiBuilder.init(process.env.CHAIBUILDER_APP_KEY!, isEnabled);
  const { page, settings, pageData } =
    await ChaiBuilder.getPageMetadataPayload(slug);
  return ChaiBuilder.generateMetaData({ page, pageData, settings });
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const nextParams = await params;
  const slug = nextParams.slug ? `/${nextParams.slug.join("/")}` : "/";

  const { isEnabled } = await draftMode();
  ChaiBuilder.init(process.env.CHAIBUILDER_APP_KEY!, isEnabled);
  const response = await ChaiBuilder.getPage(slug);
  if ("error" in response && response.error === "NOT_FOUND") {
    return notFound();
  }

  const { page, settings, pageData, pageProps } =
    await ChaiBuilder.getPagePayload(slug);
  return (
    <html className={`scroll-smooth`} lang={page.lang}>
      <head>
        <ChaiPageStyles page={page} />
      </head>
      <body className={`antialiased`}>
        <PreviewBanner show={isEnabled} />
        <RenderChaiBlocks
          pageData={pageData}
          settings={settings}
          page={page}
          pageProps={pageProps}
          imageComponent={ImageBlock}
        />
        <PageScripts />
        <Analytics />
      </body>
    </html>
  );
}
