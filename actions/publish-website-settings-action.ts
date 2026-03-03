"use server";

import { getSupabaseAdmin } from "@/app/supabase-admin";
import { revalidateTag } from "next/cache";

export async function publishWebsiteSettings() {
    const id = process.env.CHAIBUILDER_APP_KEY;
    if (!id) return { success: false, error: "Missing app key configuration" };
    try {
        const supabase = getSupabaseAdmin();

        // fetch current data
        const { data: current, error: fetchError } = await supabase.from("apps").select("settings").eq("id", id).single();

        if (fetchError) throw fetchError;

        // update apps_online > settings
        const { error: updateError } = await supabase
            .from("apps_online")
            .update({ settings: current.settings })
            .eq("id", id);

        if (updateError) throw updateError;

        // Revalidate the cache for this website's settings
        revalidateTag(`website-settings-${id}`, "default");

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error?.message || "Failed to publish website settings" };
    }
}
