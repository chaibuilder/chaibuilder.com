"use client";

import { deleteSite } from "@/actions/delete-site-action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { toast } from "sonner";

interface DeleteWebsiteButtonProps {
  websiteId: string;
  siteData: {
    id: any;
    name: any;
    createdAt: any;
    fallbackLang: any;
    languages: any;
    app_api_keys: { apiKey: any }[];
  };
}

function DeleteWebsiteButton({ websiteId, siteData }: DeleteWebsiteButtonProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const router = useRouter();

  const [deleteState, deleteAction, deletePending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        await deleteSite(siteData.id);
        toast.success("Website deleted successfully");
        router.push("/websites");
        return { success: true };
      } catch (error: any) {
        toast.error(error.message || "Failed to delete website");
        return { success: false, error: error.message };
      }
    },
    { success: false },
  );

  return (
    <section className="pt-8">
      <Card className="border-destructive/20 shadow-none">
        <CardHeader>
          <CardTitle className="text-destructive">Delete Website</CardTitle>
          <CardDescription>
            Permanently delete this website and all of its data. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Website</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your website and remove all data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form action={deleteAction}>
                <input type="hidden" name="websiteId" value={websiteId} />
                <div className="space-y-2">
                  <Label htmlFor="delete-confirm">Type &lsquo;DELETE&lsquo; to confirm</Label>
                  <Input
                    id="delete-confirm"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="DELETE"
                  />
                </div>
                <AlertDialogFooter className="pt-4">
                  <AlertDialogCancel onClick={() => setDeleteConfirmation("")}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    type="submit"
                    disabled={deleteConfirmation.toLowerCase() !== "delete" || deletePending}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    {deletePending ? "Deleting..." : "Delete Website"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </section>
  );
}

DeleteWebsiteButton.displayName = "DeleteWebsiteButton";

export default DeleteWebsiteButton;
