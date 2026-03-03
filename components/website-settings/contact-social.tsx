"use client";

import { SiteData } from "@/types/site";
import { useTranslation } from "@chaibuilder/next";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

// List of social networking sites
const SOCIAL_PLATFORMS = [
  {
    value: "facebook",
    label: "Facebook",
    placeholder: "https://facebook.com/yourpage",
  },
  {
    value: "twitter",
    label: "Twitter/X",
    placeholder: "https://twitter.com/yourusername",
  },
  {
    value: "instagram",
    label: "Instagram",
    placeholder: "https://instagram.com/yourusername",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/yourprofile",
  },
  {
    value: "youtube",
    label: "YouTube",
    placeholder: "https://youtube.com/@yourchannel",
  },
  {
    value: "tiktok",
    label: "TikTok",
    placeholder: "https://tiktok.com/@yourusername",
  },
  {
    value: "github",
    label: "GitHub",
    placeholder: "https://github.com/yourusername",
  },
];

interface SocialLinksProps {
  data: SiteData;
  onChange: (links: any) => void;
}

function SocialLinks({ data, onChange }: SocialLinksProps) {
  const { t } = useTranslation();
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>(
    data?.settings?.socialLinks ?? {},
  );
  const [canAddNew, setCanAddNew] = useState(false);

  const getPlatformInfo = (key: string) =>
    SOCIAL_PLATFORMS.find((p) => p.value === key);
  const availablePlatforms = SOCIAL_PLATFORMS.filter(
    (p) => !socialLinks[p.value],
  );
  const isAddEnabled =
    Object.values(data?.settings?.socialLinks ?? {}).filter((v) => !v)
      .length === 0;

  const removeSocialLink = (key: string) => {
    const updated = { ...socialLinks };
    delete updated[key];
    setSocialLinks(updated);
    onChange(updated);
  };

  const inputClass =
    "flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const selectClass =
    "w-40 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-gray-700">
        {t("Social Links")}
      </label>
      <div className="space-y-2">
        {Object.keys(socialLinks).map((key) => {
          const platformInfo = getPlatformInfo(key);
          const availableForEdit = SOCIAL_PLATFORMS.filter(
            ({ value }) => value === key || !socialLinks[value],
          );
          const item = { key, value: socialLinks[key] };

          return (
            <div key={key} className="flex items-center gap-2">
              <select
                value={item.key}
                onChange={(e) => {
                  const newKey = e.target.value;
                  const updated = { ...socialLinks };
                  delete updated[item.key];
                  updated[newKey] = item.value;
                  setSocialLinks(updated);
                  onChange(updated);
                }}
                className={selectClass}
              >
                {availableForEdit.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={item.value}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  const updated = { ...socialLinks, [item.key]: val };
                  setSocialLinks(updated);
                  onChange(updated);
                }}
                placeholder={platformInfo?.placeholder || t("Enter URL")}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeSocialLink(key)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}

        {availablePlatforms.length > 0 && canAddNew && isAddEnabled && (
          <div className="flex items-center gap-2">
            <select
              defaultValue=""
              onChange={(e) => {
                const value = e.target.value;
                if (!value) return;
                const updated = { ...socialLinks, [value]: "" };
                setSocialLinks(updated);
                onChange(updated);
                setCanAddNew(false);
              }}
              className={selectClass}
            >
              <option value="">{t("Add platform")}</option>
              {availablePlatforms.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder={t("Enter URL")}
              disabled
              className={`${inputClass} bg-gray-100`}
            />
          </div>
        )}

        {Object.keys(socialLinks).length < SOCIAL_PLATFORMS.length && (
          <button
            type="button"
            onClick={() => setCanAddNew(true)}
            disabled={!isAddEnabled || canAddNew}
            className="flex items-center gap-1 mt-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-4 w-4" /> {t("Add Link")}
          </button>
        )}
      </div>
    </div>
  );
}

interface ContactSocialProps {
  data: SiteData;
  onChange?: (updates: any) => void;
}

export default function ContactSocial({ data, onChange }: ContactSocialProps) {
  const { t } = useTranslation();
  const [baseline, setBaseline] = useState<SiteData>(data);

  const handleInputChange = (
    field: "email" | "phone" | "address",
    value: string,
  ) => {
    if (!onChange) return;
    const updates = {
      ...(data || {}),
      settings: { ...(data?.settings || {}), [field]: value },
    };
    setBaseline(updates);
    onChange(updates);
  };

  const handleSocialLinksChange = (socialLinks: any) => {
    if (!onChange) return;
    onChange({ settings: { ...data.settings, socialLinks } });
  };

  const inputClass =
    "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="space-y-6 pb-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            {t("Email")}
          </label>
          <input
            id="email"
            type="email"
            placeholder="contact@example.com"
            value={baseline?.settings?.email ?? ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            {t("Phone")}
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={baseline?.settings?.phone ?? ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="address"
            className="text-sm font-medium text-gray-700"
          >
            {t("Address")}
          </label>
          <input
            id="address"
            placeholder="123 Main St, City, Country"
            value={baseline?.settings?.address ?? ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className={inputClass}
          />
        </div>

        <SocialLinks data={data} onChange={handleSocialLinksChange} />
      </div>
    </div>
  );
}
