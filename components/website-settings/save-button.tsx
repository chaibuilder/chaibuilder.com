"use client";

import { publishWebsiteSettings } from "@/actions/publish-website-settings-action";
import { updateWebsiteData } from "@/actions/update-website-setting";
import { SiteData } from "@/types/site";
import { useReloadPage, useTranslation } from "@chaibuilder/next";
import { useQueryClient } from "@tanstack/react-query";
import { Loader, Rocket, Save } from "lucide-react";
import { useActionState } from "react";
import { toast } from "sonner";

interface SaveButtonProps {
  hasChanges: boolean;
  data: SiteData;
  showSave: boolean;
  onSaveSuccess?: () => void;
}

export default function SaveButton({
  hasChanges,
  data,
  showSave = true,
  onSaveSuccess,
}: SaveButtonProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const reloadPage = useReloadPage();

  // * Save action
  const [, handleSave, isSaving] = useActionState(async () => {
    try {
      if (typeof data?.settings !== "object") return { success: false };
      const socialLinks = data?.settings?.socialLinks || {};
      Object.keys(socialLinks).forEach((link) => {
        if (socialLinks && !socialLinks[link]) {
          delete socialLinks[link];
        }
      });

      const updates: Partial<SiteData> = {
        name: data?.name,
        settings: { ...data?.settings, socialLinks },
      };

      const result = await updateWebsiteData({ updates });
      if (result.success) {
        toast.success(t("Website settings updated successfully!"));
        await queryClient.invalidateQueries({ queryKey: ["website-settings"] });
        onSaveSuccess?.();
        reloadPage();
      } else {
        toast.error(
          (result as any).error || t("Failed to update website settings"),
        );
      }
      return result;
    } catch (error: any) {
      toast.error(error?.message || t("Failed to update website settings"));
      return { success: false, error: error?.message };
    }
  }, null);

  // * Publish action
  const [, handlePublish, isPublishing] = useActionState(async () => {
    try {
      if (hasChanges) {
        await handleSave();
      }
      const result = await publishWebsiteSettings();
      if (result.success) {
        toast.success(t("Website settings published successfully!"));
      } else {
        toast.error(result.error || t("Failed to publish website settings"));
      }
      return result;
    } catch (error: any) {
      toast.error(error?.message || t("Failed to publish website settings"));
      return { success: false, error: error?.message };
    }
  }, null);

  const btnBase =
    "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-36 justify-center";

  return (
    <div className="flex justify-start gap-4">
      {showSave && (
        <form action={handleSave}>
          <button
            type="submit"
            disabled={isSaving || !hasChanges}
            className={`${btnBase} bg-blue-600 text-white hover:bg-blue-700`}
          >
            {isSaving ? (
              <>
                <Loader className="h-3 w-3 animate-spin" />
                {t("Saving")}
              </>
            ) : (
              <>
                <Save className="h-3 w-3" />
                {t("Save Draft")}
              </>
            )}
          </button>
        </form>
      )}
      <form action={handlePublish}>
        <button
          type="submit"
          disabled={isSaving || isPublishing}
          className={`${btnBase} bg-green-500 text-white hover:bg-green-600`}
        >
          {isPublishing ? (
            <>
              <Loader className="h-3 w-3 animate-spin" />
              {t("Publishing")}
            </>
          ) : (
            <>
              <Rocket className="h-3 w-3" />
              {t("Publish Settings")}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
