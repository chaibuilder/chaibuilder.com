import { getWebsiteSettings } from "@/actions/get-website-settings";
import { SiteData } from "@/types/site";
import { useQuery } from "@tanstack/react-query";

export const useWebsiteSettings = () => {
    return useQuery<SiteData | null>({
        queryKey: ["website-settings"],
        queryFn: async () => {
            return await getWebsiteSettings();
        },
    });
};
