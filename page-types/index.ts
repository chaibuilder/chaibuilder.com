import { registerChaiPageType } from "@chaibuilder/pro/runtime";
import { BlogPageType } from "./blog";

export const registerPageTypes = () => {
  registerChaiPageType(BlogPageType.key, BlogPageType);
};
