import { getWebsiteSettings } from "@/actions/get-website-settings";
import { get, pick } from "lodash";

export const loadSiteGlobalData = async ({ inBuilder }: { inBuilder: boolean }) => {
    const siteSettings = await getWebsiteSettings();
    // Load
    return {
        ...pick(get(siteSettings, `settings`, {}), [
            "siteName",
            "siteTagline",
            "logo.url",
            "email",
            "phone",
            "address",
            "socialLinks",
        ]),
    };
};
