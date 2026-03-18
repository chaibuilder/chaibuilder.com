import type { NextConfig } from "next";
import { IMAGE_DOMAINS } from "./remote-pattern";

const nextConfig: NextConfig = {
  images: {
    //NOTE: Update this list as needed
    remotePatterns: [...IMAGE_DOMAINS.map((domain) => ({ hostname: domain }))],
  },
  redirects: async () => [
    {
      source: "/white-label-website-builder",
      destination: "/products/white-label-website-builder",
      permanent: true,
    },
    {
      source: "/pricing",
      destination: "/products/studio/pricing",
      permanent: true,
    },
    {
      source: "/faq",
      destination: "/products/studio/faq",
      permanent: true,
    },
    {
      source: "/home",
      destination: "/",
      permanent: true,
    },
    {
      source: "/studio",
      destination: "/products/studio",
      permanent: true,
    },
    {
      source: "/demo-request",
      destination: "/products/white-label-website-builder",
      permanent: true,
    },
    {
      source: "/docs",
      destination: "https://docs.chaibuilder.com",
      permanent: true,
    },
    {
      source: "/login",
      destination: "https://app.chaibuilder.com",
      permanent: true,
    },
  ],
};
export default nextConfig;
