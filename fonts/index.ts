import { registerChaiFont } from "@chaibuilder/next/runtime";

export const registerFonts = () => {
  registerChaiFont("Roboto", {
    src: [
      {
        url: "/fonts/roboto/Roboto-300.woff2",
        format: "woff2",
        fontWeight: "300",
      },
      {
        url: "/fonts/roboto/Roboto-400.woff2",
        format: "woff2",
        fontWeight: "400",
      },
      {
        url: "/fonts/roboto/Roboto-700.woff2",
        format: "woff2",
        fontWeight: "700",
      },
    ],
    fallback: "sans-serif",
  });

  registerChaiFont("Open Sans", {
    src: [
      {
        url: "/fonts/opensans/OpenSans-300.woff2",
        format: "woff2",
        fontWeight: "300",
      },
      {
        url: "/fonts/opensans/OpenSans-400.woff2",
        format: "woff2",
        fontWeight: "400",
      },
      {
        url: "/fonts/opensans/OpenSans-700.woff2",
        format: "woff2",
        fontWeight: "700",
      },
    ],
    fallback: "sans-serif",
  });

  registerChaiFont("Lato", {
    src: [
      {
        url: "/fonts/lato/Lato-300.woff2",
        format: "woff2",
        fontWeight: "300",
      },
      {
        url: "/fonts/lato/Lato-400.woff2",
        format: "woff2",
        fontWeight: "400",
      },
      {
        url: "/fonts/lato/Lato-700.woff2",
        format: "woff2",
        fontWeight: "700",
      },
    ],
    fallback: "sans-serif",
  });

  registerChaiFont("Montserrat", {
    src: [
      {
        url: "/fonts/montserrat/Montserrat-300.woff2",
        format: "woff2",
        fontWeight: "300",
      },
      {
        url: "/fonts/montserrat/Montserrat-400.woff2",
        format: "woff2",
        fontWeight: "400",
      },
      {
        url: "/fonts/montserrat/Montserrat-700.woff2",
        format: "woff2",
        fontWeight: "700",
      },
    ],
    fallback: "sans-serif",
  });

  registerChaiFont("Inter", {
    src: [
      {
        url: "/fonts/inter/Inter-300.woff2",
        format: "woff2",
        fontWeight: "300",
      },
      {
        url: "/fonts/inter/Inter-400.woff2",
        format: "woff2",
        fontWeight: "400",
      },
      {
        url: "/fonts/inter/Inter-700.woff2",
        format: "woff2",
        fontWeight: "700",
      },
    ],
    fallback: "sans-serif",
  });
};
