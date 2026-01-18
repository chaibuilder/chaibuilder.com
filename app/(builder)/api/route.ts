import { initChaiBuilderActionHandler } from "@chaibuilder/next/actions";

const apiKey = process.env.CHAIBUILDER_API_KEY!;

export async function POST() {
  return initChaiBuilderActionHandler({ apiKey, userId: "" });
}
