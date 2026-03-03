"use client";

import { useWebsiteSettings } from "@/hooks/use-website-settings";
import { SiteData } from "@/types/site";
import { useSavePage, useTranslation } from "@chaibuilder/next";
import { useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  Code,
  Cross,
  ExternalLinkIcon,
  ImageIcon,
  Loader,
  Settings,
  Share2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AnalyticsTracking from "./analytics-tracking";
import ContactSocial from "./contact-social";
import CustomHtmlCode from "./custom-html-code";
import General from "./general";
import SaveButton from "./save-button";
import { UnsavedChangesDialog } from "./unsaved-changes-dialog";

import BrandingConfiguration from "./branding-configuration";

const getSidebarItems = (t: (key: string) => string) => [
  { id: "general", label: t("General"), icon: Settings, component: General },
  {
    id: "branding",
    label: t("Branding"),
    icon: ImageIcon,
    component: BrandingConfiguration,
  },
  {
    id: "contact-social",
    label: t("Contact & Social"),
    icon: Share2,
    component: ContactSocial,
  },
  {
    id: "analytics-tracking",
    label: t("Analytics Tracking"),
    icon: Activity,
    component: AnalyticsTracking,
  },
  {
    id: "custom-html",
    label: t("Custom HTML"),
    icon: Code,
    component: CustomHtmlCode,
  },
];

/**
 * Website settings content component
 */
function WebsiteSettingsContent({
  initData,
  setInitData,
  isDataChange,
  setIsDataChange,
}: {
  initData: any;
  setInitData: (value: any) => void;
  isDataChange: boolean;
  setIsDataChange: (value: boolean) => void;
}) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("general");
  const [showTabChangeDialog, setShowTabChangeDialog] = useState(false);
  const [pendingTabChange, setPendingTabChange] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const SIDEBAR_ITEMS = getSidebarItems(t);

  const { data: siteData, isLoading } = useWebsiteSettings();
  useEffect(() => {
    if (siteData && !initData) {
      setInitData(siteData);
    }
  }, [siteData, initData, setInitData]);

  const updateSiteDataLocally = (updates: Partial<SiteData>) => {
    queryClient.setQueryData(["website-settings"], (prevData: SiteData) => {
      return prevData
        ? {
            ...prevData,
            ...updates,
            settings: {
              ...(prevData.settings || {}),
              ...(updates?.settings || {}),
            },
          }
        : prevData;
    });
  };

  useEffect(() => {
    if (!siteData || !initData) return;
    const isDataChanged = JSON.stringify(siteData) !== JSON.stringify(initData);
    setIsDataChange(isDataChanged);
  }, [siteData, initData, setIsDataChange]);

  const handleTabChange = (newTab: string) => {
    if (isDataChange && newTab !== activeTab) {
      setPendingTabChange(newTab);
      setShowTabChangeDialog(true);
    } else {
      setActiveTab(newTab);
    }
  };

  const handleConfirmTabChange = () => {
    if (pendingTabChange) setActiveTab(pendingTabChange);
    updateSiteDataLocally(initData);
    setShowTabChangeDialog(false);
    setPendingTabChange(null);
    setIsDataChange(false);
  };

  const handleCancelTabChange = () => {
    setShowTabChangeDialog(false);
    setPendingTabChange(null);
  };

  const activeItem = SIDEBAR_ITEMS.find((item) => item.id === activeTab);
  const Icon = activeItem?.icon;
  const Component = activeItem?.component;

  if (isLoading || !siteData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full">
        <Loader className="animate-spin text-blue-500 h-6 w-6" />
      </div>
    );
  }

  return (
    <>
      <div className="flex overflow-hidden h-full w-full ">
        {/* Sidebar */}
        <div className="w-52 h-full bg-gray-50 border-r border-gray-200 pr-2 flex-shrink-0 flex flex-col py-3 px-2">
          <div className="px-2 pt-2">
            <div className="text-xs text-blue-600 truncate">
              {siteData?.name}
            </div>
            {siteData?.domainConfigured && siteData?.domain && (
              <a
                href={`https://${siteData.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-light text-blue-500 hover:text-blue-800 flex items-center gap-1 truncate"
              >
                <span className="truncate">{siteData.domain}</span>
                <ExternalLinkIcon className="h-2.5 w-2.5 flex-shrink-0" />
              </a>
            )}
            {siteData?.subdomain && (
              <a
                href={`https://${siteData.subdomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-light text-blue-500 hover:text-blue-800 flex items-center gap-1 truncate"
              >
                <span className="truncate">{siteData.subdomain}</span>
                <ExternalLinkIcon className="h-2.5 w-2.5 flex-shrink-0" />
              </a>
            )}
          </div>
          <nav className="pt-4 flex-1">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors text-left ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Loader className="animate-spin text-blue-500 h-6 w-6" />
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-w-0 py-3 px-2">
            <div className="flex items-center gap-x-2 pb-4 px-6">
              {Icon && <Icon className="h-5 w-5 text-gray-600" />}
              <h2 className="font-semibold text-gray-800">
                {activeItem?.label}
              </h2>
            </div>
            <div
              className="flex-1 overflow-y-auto px-6"
              style={{ scrollBehavior: "smooth" }}
            >
              <ErrorBoundary
                fallback={
                  <div className="text-center text-red-500 p-10">
                    {t("Something went wrong, Please try again")}
                  </div>
                }
              >
                {Component && (
                  <Component data={siteData} onChange={updateSiteDataLocally} />
                )}
              </ErrorBoundary>
              <div className="h-16" />
            </div>

            {Component && (
              <div className="px-6 border-t pt-4 flex items-center gap-x-4">
                <SaveButton
                  data={siteData}
                  hasChanges={isDataChange}
                  showSave={true}
                  onSaveSuccess={() => setInitData(siteData)}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tab Change Confirmation Dialog */}
      <UnsavedChangesDialog
        open={showTabChangeDialog}
        onOpenChange={setShowTabChangeDialog}
        onCancel={handleCancelTabChange}
        onConfirm={handleConfirmTabChange}
        description={t(
          "You have unsaved changes. Are you sure you want to switch tabs without saving?",
        )}
        confirmText={t("Switch without saving")}
      />
    </>
  );
}

/**
 * Website settings modal component
 */
const WebsiteSettingsModal = ({ isLoading }: { isLoading?: boolean }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { savePageAsync } = useSavePage();
  const [isDataChange, setIsDataChange] = useState(false);
  const [initData, setInitData] = useState<any>(null);
  const queryClient = useQueryClient();

  const handleOpen = async () => {
    await savePageAsync();
    setShowModal(true);
  };

  const handleClose = () => {
    if (isDataChange) {
      setShowConfirmDialog(true);
    } else {
      setShowModal(false);
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    setShowModal(false);
    setIsDataChange(false);
    if (!initData) return;
    queryClient.setQueryData(["website-settings"], () => initData);
  };

  const handleCancelClose = () => {
    setShowConfirmDialog(false);
  };

  if (isLoading) {
    return (
      <button
        disabled
        className="p-0 w-8 h-8 flex items-center justify-center rounded-md text-gray-400 cursor-not-allowed"
      >
        <Settings className="h-4 w-4" />
        <span className="sr-only">Settings</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="p-0 w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <Settings className="h-4 w-4" />
        <span className="sr-only">{t("Settings")}</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
          <div
            className="relative z-10 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              height: "700px",
              maxHeight: "700px",
              width: "800px",
              maxWidth: "800px",
            }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900 text-base">
                {t("Website Settings")}
              </h2>
              <button
                onClick={handleClose}
                className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Modal content */}
            <div className="flex-1 overflow-hidden">
              <WebsiteSettingsContent
                initData={initData}
                setInitData={setInitData}
                isDataChange={isDataChange}
                setIsDataChange={setIsDataChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Unsaved changes on close */}
      <UnsavedChangesDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onCancel={handleCancelClose}
        onConfirm={handleConfirmClose}
        description={t(
          "You have unsaved changes. Are you sure you want to close without saving?",
        )}
        confirmText={t("Close without saving")}
      />
    </>
  );
};

/**
 * Main WebsiteSettings component for chaibuilder.com (single-tenant)
 * Uses CHAIBUILDER_APP_KEY from env as the websiteId
 */
export default function WebsiteSettings() {
  return (
    <div className="flex items-center gap-x-1 ">
      <div className="flex items-center border rounded-md p-0 h-9 px-1">
        <WebsiteSettingsModal />
      </div>
    </div>
  );
}
