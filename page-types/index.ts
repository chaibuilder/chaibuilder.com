import { registerChaiPageType } from "@chaibuilder/pro/server";
import { BlogPageType } from "./blog";

export const registerPageTypes = () => {
  registerChaiPageType(BlogPageType.key, BlogPageType);
};
