import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Handles the redirect back from Google via Supabase Auth.
// Supabase sends ?code=... which we exchange for a session cookie.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  console.log("AUTH CALLBACK HIT", { code, next, origin });

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    // Log the real reason the exchange failed
    console.error("EXCHANGE ERROR:", error.message, error);
  } else {
    console.error("AUTH CALLBACK: no 'code' param found in URL");
  }

  // Something went wrong — send the user home with an error flag
  // the UI can use to show a toast.
  return NextResponse.redirect(`${origin}/?auth_error=1`);
}