import { registerChaiFont } from "@chaibuilder/next/runtime";

export const registerFonts = () => {
  registerChaiFont("Roboto", {
    src: [
      {
        url: "/fonts/roboto/Roboto-Variable.woff2",
        format: "woff2",
      },
    ],
    fallback: "sans-serif",
  });

  registerChaiFont("Open Sans", {
    src: [
      {
        url: "/fonts/opensans/OpenSans-Variable.woff2",
        format: "woff2",
      },
    ],
    fallback: "sans-serif",
  });

  registerChaiFont("Lato", {
    src: [
      {
        url: "/fonts/lato/Lato-Regular.woff2",
        format: "woff2",
      },
    ],
    fallback: "sans-serif",
  });

  registerChaiFont("Montserrat", {
    src: [
      {
        url: "/fonts/montserrat/Montserrat-Variable.woff2",
        format: "woff2",
      },
    ],
    fallback: "sans-serif",
  });

  registerChaiFont("Inter", {
    src: [
      {
        url: "/fonts/inter/Inter-Variable.woff2",
        format: "woff2",
      },
    ],
    fallback: "sans-serif",
  });
};
