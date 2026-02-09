import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  if (request.nextUrl.searchParams.has("r")) {
    const url = new URL(request.nextUrl.href);
    url.searchParams.delete("r");
    return NextResponse.redirect(
      `${url.origin}/chai/revalidate?redirect=true&paths=${url.pathname}`,
    );
  }
  return NextResponse.next();
}
