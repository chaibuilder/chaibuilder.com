import { registerChaiBlock } from "@chaibuilder/pro/runtime";
import dynamic from "next/dynamic";
import { FormConfig } from "./form/form-block";
import { HeroVideoDialogConfig } from "./hero-video-dialog";

//Important: Dynamic import is required for custom blocks
const ChaiForm = dynamic(() => import("./form/form-block"));
const HeroVideoDialogBlock = dynamic(() => import("./hero-video-dialog"));

export const registerCustomBlocks = () => {
  registerChaiBlock(ChaiForm, FormConfig);
  registerChaiBlock(HeroVideoDialogBlock, HeroVideoDialogConfig);
};
