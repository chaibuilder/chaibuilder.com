"use server";

import { getSupabaseAdmin } from "@/app/supabase-admin";
import { SiteData } from "@/types/site";

export async function getWebsiteSettings(): Promise<SiteData | null> {
    const websiteId = process.env.CHAIBUILDER_APP_KEY;
    if (!websiteId) return null;
    try {
        const supabase = getSupabaseAdmin();
        const { data, error } = await supabase
            .from("apps")
            .select(
                `
        id,
        name,
        createdAt,
        settings,
        languages,
        fallbackLang,
        app_domains (
          domain,
          subdomain,
          hosting,
          domainConfigured
        )
      `,
            )
            .eq("id", websiteId)
            .single();

        if (error) throw error;

        return {
            id: data.id,
            name: data.name,
            createdAt: data.createdAt,
            settings: data.settings || {},
            languages: data.languages,
            fallbackLang: data.fallbackLang,
            domainConfigured: (data as any).app_domains?.[0]?.domainConfigured,
            domain: (data as any).app_domains?.[0]?.domain,
            subdomain: (data as any).app_domains?.[0]?.subdomain,
            hosting: (data as any).app_domains?.[0]?.hosting,
        };
    } catch (error) {
        console.error("Error fetching website settings:", error);
        return null;
    }
}
