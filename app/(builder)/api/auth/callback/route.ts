import { getSupabaseClient } from "@/app/supabase-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const host = request.headers.get("host");
  const origin =
    process.env.NODE_ENV === "development"
      ? `http://${host}`
      : `https://${host}`;

  const code = searchParams.get("code");
  const type = searchParams.get("type") ?? "";
  const next = "/editor";

  if (code) {
    const supabase = await getSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      if (type === "recovery") {
        return NextResponse.redirect(`${origin}/editor/reset-password`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/editor`);
}
