import { registerCustomBlocks } from "@/blocks";
import "@/data/global";
import { registerPageTypes } from "@/page-types";
import {
  ChaiBuilder,
  ChaiPageStyles,
  PreviewBanner,
  RenderChaiBlocks,
} from "@chaibuilder/next/render";
import { ChaiPageProps } from "@chaibuilder/next/types";
import { loadWebBlocks } from "@chaibuilder/next/web-blocks";
import { PageScripts } from "@/components/website-settings/page-scripts";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

loadWebBlocks();
registerCustomBlocks();
registerPageTypes();

export const dynamic = "force-static";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string[] }>;
}) => {
  const nextParams = await props.params;
  const slug = nextParams.slug ? `/${nextParams.slug.join("/")}` : "/";

  const { isEnabled } = await draftMode();
  ChaiBuilder.init(process.env.CHAIBUILDER_APP_KEY!, isEnabled);
  return await ChaiBuilder.getPageSeoData(slug);
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

  const page = response as any;
  //NOTE: pageProps are received in your dataProvider functions for block and page
  const pageProps: ChaiPageProps = {
    slug,
    pageType: page.pageType,
    fallbackLang: page.fallbackLang,
    pageLang: page.lang,
  };
  return (
    <html className={`smooth-scroll`} lang={page.lang}>
      <head>
        <ChaiPageStyles page={page} />
      </head>
      <body className={`font-body antialiased`}>
        <PreviewBanner slug={slug} show={isEnabled} />
        <RenderChaiBlocks page={page} pageProps={pageProps} />
        <PageScripts />
      </body>
    </html>
  );
}
