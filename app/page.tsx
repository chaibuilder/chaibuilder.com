import ChaiBuilderEditor from "@chaibuilder/next";

export default function Home() {
  return <ChaiBuilderEditor flags={{ dragAndDrop: true, designTokens: true }} />;
}
