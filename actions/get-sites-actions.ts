"use server";

import { supabaseServer } from "@/chai/supabase.server";

export async function getSites(userId: string, sitesWithDomainOnly = false) {
  const { data, error } = await supabaseServer
    .from("apps")
    .select(
      `
      id,
      name,
      createdAt,
      fallbackLang,
      languages,
      app_api_keys (
        apiKey
      ),
      app_domains (
        domain,
        subdomain,
        hosting,
        domainConfigured,
        hostingProjectId
      )
    `,
    )
    .eq("user", userId)
    .is("deletedAt", null)
    .order("createdAt", { ascending: false });

  if (error) throw error;

  // Transform the data to flatten app_domains and apiKey into Site objects
  return data
    ?.map((site) => {
      const domainData = site.app_domains?.[0] || {};
      const apiKeyData = site.app_api_keys?.[0] || {};

      return {
        id: site.id,
        name: site.name,
        createdAt: site.createdAt,
        fallbackLang: site.fallbackLang,
        languages: site.languages,
        apiKey: apiKeyData.apiKey || "",
        domain: domainData.domain || undefined,
        subdomain: domainData.subdomain || undefined,
        hostingProjectId: domainData.hostingProjectId || undefined,
        hosting: domainData.hosting || undefined,
        domainConfigured: domainData.domainConfigured || false,
      };
    })
    .filter((site) => (sitesWithDomainOnly ? site.subdomain : !site.subdomain));
}
