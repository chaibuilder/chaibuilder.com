import { MetadataRoute } from "next";
import { getSupabaseAdmin } from "./supabase-admin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = "https://chaibuilder.com";
  const supabase = await getSupabaseAdmin();
  const { data: pages } = await supabase
    .from("app_pages_online")
    .select("slug,lang,lastSaved")
    .eq("app", process.env.CHAIBUILDER_APP_KEY)
    .neq("slug", "");

  return (
    pages?.map((page) => {
      const item: any = { url: `${host}${page.slug}` };
      if (page.lastSaved) item.lastModified = new Date(page.lastSaved);
      return item;
    }) || []
  );
}
