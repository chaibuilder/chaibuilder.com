"use client";

import { SiteData } from "@/types/site";
import { useTranslation } from "@chaibuilder/next";
import { useState } from "react";

interface CustomHtmlProps {
  data: SiteData;
  onChange: (updates: any) => void;
}

export default function CustomHtmlCode({ data, onChange }: CustomHtmlProps) {
  const { t } = useTranslation();
  const [baseline, setBaseline] = useState(data);

  const handleChange = (updates: any) => {
    setBaseline(updates);
    onChange(updates);
  };

  const textareaClass =
    "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono resize-none";

  return (
    <section id="custom-html" className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="headHTML" className="text-xs font-medium text-gray-700">
          {t("Head HTML")}
        </label>
        <p className="text-xs text-gray-500 mb-2">
          {t(
            "Add custom HTML that will be inserted into the <head> section of your website",
          )}
        </p>
        <textarea
          id="headHTML"
          className={textareaClass}
          value={baseline?.settings?.headHTML ?? ""}
          placeholder="<script>...</script> or <meta>...</meta> or <link>...</link>"
          onChange={(e) =>
            handleChange?.({
              ...(data || {}),
              settings: { ...(data?.settings || {}), headHTML: e.target.value },
            })
          }
          rows={8}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="footerHTML"
          className="text-xs font-medium text-gray-700"
        >
          {t("Footer HTML")}
        </label>
        <p className="text-xs text-gray-500 mb-2">
          {t(
            "Add custom HTML that will be inserted before the closing </body> tag",
          )}
        </p>
        <textarea
          id="footerHTML"
          className={textareaClass}
          value={baseline?.settings?.footerHTML ?? ""}
          placeholder="<script>...</script> or other HTML elements"
          onChange={(e) =>
            handleChange?.({
              ...(data || {}),
              settings: {
                ...(data?.settings || {}),
                footerHTML: e.target.value,
              },
            })
          }
          rows={8}
        />
      </div>
    </section>
  );
}
