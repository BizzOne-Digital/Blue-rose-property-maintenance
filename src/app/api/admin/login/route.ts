import { NextResponse } from "next/server";
import { z } from "zod";
import {
  COOKIE_NAME,
  createAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/service-catalog/auth";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const { email, password } = bodySchema.parse(await request.json());
    if (!(await verifyAdminCredentials(email, password))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const token = createAdminSessionToken();
    if (!token) {
      return NextResponse.json(
        {
          error:
            "Admin session is not configured. Set SESSION_SECRET or ADMIN_PASSWORD on the server.",
        },
        { status: 503 }
      );
    }
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
