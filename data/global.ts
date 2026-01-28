import { registerChaiGlobalDataProvider } from "@chaibuilder/next/runtime";

/**
 * Global data provider for the application.
 * This data is availble to all pages as {{global.xxxx}} data binding
 * @returns Global data object
 */
const globalDataProvider = async () => {
  return {
    name: "ChaiBuilder",
    description: "ChaiBuilder is a Low Code website builder.",
  };
};

registerChaiGlobalDataProvider(globalDataProvider);
