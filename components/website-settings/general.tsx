"use client";

import { SiteData } from "@/types/site";
import { useTranslation } from "@chaibuilder/next";
import { useState } from "react";

interface GeneralProps {
  data: SiteData;
  onChange: (updates: any) => void;
}

export default function General({ data, onChange }: GeneralProps) {
  const { t } = useTranslation();
  const [baseline, setBaseline] = useState(data);

  const handleChange = (updates: any) => {
    setBaseline((prev) => ({ ...(prev || data), ...updates }));
    onChange(updates);
  };

  return (
    <section id="general" className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="siteName" className="text-xs font-medium text-gray-700">
          {t("Website name")}
        </label>
        <input
          type="text"
          placeholder={t("eg: My Website")}
          id="siteName"
          value={baseline?.settings?.siteName ?? ""}
          onChange={(e) =>
            handleChange?.({
              ...(data || {}),
              name: e.target.value,
              settings: { ...(data?.settings || {}), siteName: e.target.value },
            })
          }
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="siteTagline"
          className="text-xs font-medium text-gray-700"
        >
          {t("Tagline")}
        </label>
        <input
          type="text"
          placeholder={t("eg: The best website ever")}
          id="siteTagline"
          value={baseline?.settings?.siteTagline ?? ""}
          onChange={(e) =>
            handleChange?.({
              ...(data || {}),
              settings: {
                ...(data?.settings || {}),
                siteTagline: e.target.value,
              },
            })
          }
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </section>
  );
}
