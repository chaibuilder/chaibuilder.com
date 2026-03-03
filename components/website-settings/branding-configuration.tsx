"use client";

import { SiteData } from "@/types/site";
import { ImagePicker, useTranslation } from "@chaibuilder/next";
import { useState } from "react";

interface BrandingProps {
  data: SiteData;
  onChange?: (updates: Partial<SiteData>) => void;
}

export default function BrandingConfiguration({
  data,
  onChange,
}: BrandingProps) {
  const { t } = useTranslation();
  const [baseline, setBaseline] = useState<SiteData>(data);

  const handleUpdate = (updates: any) => {
    if (!onChange) return;
    const newData = {
      ...(data || {}),
      settings: { ...(data?.settings || {}), ...updates },
    };
    setBaseline(newData);
    onChange(newData);
  };

  return (
    <section id="branding">
      <div className="space-y-6">
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">
            {t("Logo")}
          </label>
          <div className="mt-2">
            <ImagePicker
              assetId={baseline?.settings?.logo?.assetId}
              assetUrl={
                baseline?.settings?.logo?.url || baseline?.settings?.logoURL
              }
              onChange={(asset) => {
                handleUpdate({
                  logo: {
                    url: asset.url,
                    assetId: asset.id,
                  },
                });
              }}
              placeholder={t("Select Logo")}
              className="mb-2"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">
            {t("Favicon")}
          </label>
          <div className="mt-2">
            <ImagePicker
              assetId={baseline?.settings?.favicon?.assetId}
              assetUrl={
                baseline?.settings?.favicon?.url ||
                baseline?.settings?.faviconURL
              }
              onChange={(asset) => {
                handleUpdate({
                  favicon: {
                    url: asset.url,
                    assetId: asset.id,
                  },
                });
              }}
              placeholder={t("Select Favicon")}
              className="mb-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
