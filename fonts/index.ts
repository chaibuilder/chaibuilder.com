import { registerChaiFont } from "@chaibuilder/next/runtime";

export const registerFonts = () => {
  registerChaiFont("Figtree", {
    src: [
      {
        url: "/fonts/figtree/Figtree-VariableFont_wght.woff2",
        format: "woff2",
      },
    ],
    fallback: "serif",
  });

  registerChaiFont("Manrope", {
    src: [
      {
        url: "/fonts/manrope/Manrope-VariableFont_wght.woff2",
        format: "woff2",
      },
    ],
    fallback: "serif",
  });

  registerChaiFont("Onest", {
    src: [
      {
        url: "/fonts/onset/Onest-VariableFont_wght.woff2",
        format: "woff2",
      },
    ],
    fallback: "serif",
  });

  registerChaiFont("Urbanist", {
    src: [
      {
        url: "/fonts/urbanist/Urbanist-VariableFont_wght.woff2",
        format: "woff2",
      },
    ],
    fallback: "serif",
  });

  registerChaiFont("Work Sans", {
    src: [
      {
        url: "/fonts/work-sans/WorkSans-VariableFont_wght.woff2",
        format: "woff2",
      },
    ],
    fallback: "serif",
  });
};
