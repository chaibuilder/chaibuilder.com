import { ChaiWebsiteBuilder } from "@chaibuilder/next";

export default function Home() {
  return (
    <ChaiWebsiteBuilder
      currentUser={{
        id: "id",
        email: "email",
        name: "name",
      }}
      flags={{ dragAndDrop: true, designTokens: true }}
    />
  );
}
