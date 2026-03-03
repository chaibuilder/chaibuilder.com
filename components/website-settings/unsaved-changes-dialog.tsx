"use client";

import { useTranslation } from "@chaibuilder/next";

// Reusable Unsaved Changes Dialog Component
interface UnsavedChangesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
}

export function UnsavedChangesDialog({
  open,
  onOpenChange,
  onCancel,
  onConfirm,
  title,
  description,
  confirmText,
}: UnsavedChangesDialogProps) {
  const { t } = useTranslation();
  const dialogTitle = title || t("Unsaved Changes");
  const dialogDescription =
    description ||
    t(
      "You have unsaved changes. Are you sure you want to continue without saving?",
    );
  const dialogConfirmText = confirmText || t("Continue without saving");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10 bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-lg font-semibold mb-2">{dialogTitle}</h2>
        <p className="text-sm text-gray-600 mb-6">{dialogDescription}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {t("Cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          >
            {dialogConfirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
