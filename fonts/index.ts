import { registerChaiFont } from "@chaibuilder/next/runtime";

export const registerFonts = () => {
  registerChaiFont("Inter", {
    src: [
      {
        url: "/fonts/inter/Inter-VariableFont_opsz,wght.woff2",
        format: "woff2",
      },
    ],
    fallback: "serif",
  });

  registerChaiFont("Montserrat", {
    src: [
      {
        url: "/fonts/montserrat/Montserrat-VariableFont_wght.woff2",
        format: "woff2",
      },
    ],
    fallback: "serif",
  });

  registerChaiFont("Roboto", {
    src: [
      {
        url: "/fonts/robot/Roboto-VariableFont_wdth,wght.woff2",
        format: "woff2",
      },
    ],
    fallback: "serif",
  });

  registerChaiFont("Roboto Flex", {
    src: [
      {
        url: "/fonts/robot-flex/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.woff2",
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
