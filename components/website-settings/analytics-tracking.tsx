"use client";

import { SiteData } from "@/types/site";
import { useTranslation } from "@chaibuilder/next";
import { useState } from "react";

interface AnalyticsTrackingProps {
  data: SiteData;
  onChange: (updates: any) => void;
}

export default function AnalyticsTracking({
  data,
  onChange,
}: AnalyticsTrackingProps) {
  const { t } = useTranslation();
  const [baseline, setBaseline] = useState(data);

  const handleChange = (updates: any) => {
    setBaseline(updates);
    onChange(updates);
  };

  const inputClass =
    "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <section id="analytics-tracking" className="space-y-4 pb-4">
      <div className="space-y-1">
        <label
          htmlFor="googleAnalyticsId"
          className="text-xs font-medium text-gray-700"
        >
          {t("Google Analytics ID")}
        </label>
        <input
          type="text"
          id="googleAnalyticsId"
          value={baseline?.settings?.googleAnalyticsId ?? ""}
          placeholder="eg: UA-XXXXXX"
          onChange={(e) =>
            handleChange?.({
              ...(data || {}),
              settings: {
                ...(data?.settings || {}),
                googleAnalyticsId: e.target.value,
              },
            })
          }
          className={inputClass}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="googleTagManagerId"
          className="text-xs font-medium text-gray-700"
        >
          {t("Google Tag Manager ID")}
        </label>
        <input
          type="text"
          id="googleTagManagerId"
          value={baseline?.settings?.googleTagManagerId ?? ""}
          placeholder="eg: GTM-XXXXXX"
          onChange={(e) =>
            handleChange?.({
              ...(data || {}),
              settings: {
                ...(data?.settings || {}),
                googleTagManagerId: e.target.value,
              },
            })
          }
          className={inputClass}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="metaPixelId"
          className="text-xs font-medium text-gray-700"
        >
          {t("Meta Pixel ID")}
        </label>
        <input
          type="text"
          id="metaPixelId"
          value={baseline?.settings?.metaPixelId ?? ""}
          placeholder="eg: XXXXXX"
          onChange={(e) =>
            handleChange?.({
              ...(data || {}),
              settings: {
                ...(data?.settings || {}),
                metaPixelId: e.target.value,
              },
            })
          }
          className={inputClass}
        />
      </div>
    </section>
  );
}
