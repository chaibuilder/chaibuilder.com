"use client";

import { getSupabaseClient } from "@/app/supabase-client";
import { registerCustomBlocks } from "@/blocks";
import { registerFonts } from "@/fonts";
import {
  ChaiWebsiteBuilder,
  defaultChaiLibrary,
  registerChaiLibrary,
} from "@chaibuilder/pro";
import type { ChaiLoggedInUser } from "@chaibuilder/pro/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LoginScreen } from "./login";

registerCustomBlocks();
registerChaiLibrary("chai-library", defaultChaiLibrary());
registerFonts();

const supabase = getSupabaseClient();

const injectSiteContext = (data: unknown) => {
  const siteContextData: Record<string, unknown> = {
    address: "Pune, India",
    email: "support@chaibuilder.com",
    socialLinks: {
      x: "https://x.com/chaibuilder",
      youtube: "https://youtube.com/@chaibuilder",
      discord: "https://discord.com/invite/czkgwX2rnD",
      github: "https://github.com/chaibuilder",
    },
    siteName: "ChaiBuilder",
    siteTagline: "React & Next.js Website Builder, Open Source",
  };
  const clonedData = JSON.parse(JSON.stringify(data));

  if (!clonedData.context) {
    clonedData.context = {};
  }
  if (!clonedData.context.site) {
    clonedData.context.site = {};
  }

  const existingContext = clonedData.context.site.siteContext || "";
  const existingLines = existingContext
    .split("\n")
    .filter((line: string) => line.trim());

  const newLines = Object.entries(siteContextData).map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      return `${key}: ${JSON.stringify(value)}`;
    }
    return `${key}: ${value}`;
  });

  const uniqueLines = [...existingLines];
  newLines.forEach((newLine) => {
    const key = newLine.split(":")[0];
    const existingIndex = uniqueLines.findIndex((line) =>
      line.startsWith(`${key}:`),
    );
    if (existingIndex !== -1) {
      uniqueLines[existingIndex] = newLine;
    } else {
      uniqueLines.push(newLine);
    }
  });

  clonedData.context.site.siteContext = uniqueLines.join("\n");

  return clonedData;
};

export default function Editor() {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [user, setUser] = useState<ChaiLoggedInUser | null>(null);
  useEffect(() => {
    // Check initial session
    const checkInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata.name,
          role: session.user.user_metadata.role,
        } as ChaiLoggedInUser);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkInitialSession();

    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (user?.id && session?.user) {
        //already logged in
        return;
      }
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata.name,
          role: session.user.user_metadata.role,
        } as ChaiLoggedInUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id]);

  const handleLogout = useCallback(
    async (reason?: string) => {
      await supabase.auth.signOut();
      if (reason) {
        window.location.href = `/editor?${reason.toLowerCase()}=true`;
      } else {
        window.location.reload();
      }
    },
    [supabase],
  );

  const getAccessToken = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.access_token as string;
  }, []);

  const getPreviewUrl = useCallback(
    (slug: string) => `/api/preview?slug=${slug}`,
    [],
  );
  const getLiveUrl = useCallback(
    (slug: string) => `/api/preview?disable=true&slug=${slug}`,
    [],
  );
  const injectExtraSiteData = useCallback(
    (request: { data: unknown; action: string }) => {
      if (!["ASK_AI", "GENERATE_SEO_FIELD"].includes(request.action)) {
        return request;
      }
      return {
        ...request,
        data: injectSiteContext(request.data),
      };
    },
    [],
  );

  const damProps = useMemo(() => {
    return {
      searchImages: {
        providers: [
          {
            id: "pexels",
            filters: {
              orientation: ["default", "landscape", "portrait", "square"],
              size: ["default", "large ", "medium", "small"],
              color: [
                "default",
                "red",
                "orange",
                "yellow",
                "green",
                "turquoise",
                "blue",
                "violet",
                "pink",
                "brown",
                "black",
                "gray",
                "white",
              ],
            },
          },
          {
            id: "unsplash",
            filters: {
              orientation: ["default", "landscape", "portrait", "squarish"],
              color: [
                "default",
                "black_and_white",
                "black",
                "white",
                "yellow",
                "orange",
                "red",
                "purple",
                "magenta",
                "green",
                "teal",
                "blue",
              ],
              order_by: ["default", "relevant", "latest"],
            },
          },
        ],
      },
    };
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <ChaiWebsiteBuilder
      flags={{ dragAndDrop: true, ai: true, dam: { searchImages: true } }}
      beforeRequest={injectExtraSiteData}
      currentUser={user}
      autoSave
      autoSaveActionsCount={5}
      getAccessToken={getAccessToken}
      apiUrl="api"
      getPreviewUrl={getPreviewUrl}
      getLiveUrl={getLiveUrl}
      onLogout={handleLogout}
      dam={damProps}
    />
  );
}
