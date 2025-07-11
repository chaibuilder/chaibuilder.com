"use server";

import { supabaseServer } from "@/chai/supabase.server";
import { revalidatePath } from "next/cache";

export async function updateSite(
  siteId: string,
  updates: {
    name?: string;
    description?: string;
    languages?: string[];
    settings?: Record<string, any>;
  }
) {
  try {
    // Update the apps table
    const { data, error } = await supabaseServer
      .from("apps")
      .update(updates)
      .eq("id", siteId)
      .select()
      .single();

    if (error) throw error;

    // Also update the apps_online table with the same data
    const { error: onlineError } = await supabaseServer
      .from("apps_online")
      .update(updates)
      .eq("id", siteId);

    if (onlineError) throw onlineError;

    revalidatePath("/sites");
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update site" };
  }
}
