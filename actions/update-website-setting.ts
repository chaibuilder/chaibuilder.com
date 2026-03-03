"use server";

import { getSupabaseAdmin } from "@/app/supabase-admin";
import { SiteData } from "@/types/site";

export type UpdateWebsiteDataPayload = {
    updates: Partial<SiteData>;
};

export async function updateWebsiteData({ updates }: UpdateWebsiteDataPayload) {
    const id = process.env.CHAIBUILDER_APP_KEY;
    if (!id || !updates || Object.keys(updates).length === 0) {
        return { success: false, error: "Missing updates or app key configuration" } as const;
    }

    try {
        const supabase = getSupabaseAdmin();

        // fetch current data
        const { data: current, error: fetchError } = await supabase
            .from("apps")
            .select("name,languages,settings")
            .eq("id", id)
            .single();
        if (fetchError || !current) throw fetchError;

        const update = { ...(current || {}), ...(updates || {}) };
        const { error: updateError } = await supabase.from("apps").update(update).eq("id", id);

        if (updateError) throw updateError;

        return { success: true, data: update } as const;
    } catch (error: any) {
        return { success: false, error: error?.message || "Failed to update data" } as const;
    }
}
