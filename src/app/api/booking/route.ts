import { NextResponse } from "next/server";
import { z } from "zod";
import { sendBusinessEmail } from "@/lib/mail";
import { siteConfig } from "@/config/site";

const bookingSchema = z.object({
  subject: z.string().min(3),
  body: z.string().min(10),
  replyTo: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const data = bookingSchema.parse(await request.json());

    await sendBusinessEmail({
      subject: `[Website Lead] ${data.subject}`,
      replyTo: data.replyTo,
      text: data.body.includes("Lead Source:")
        ? data.body
        : `Lead Source: ${siteConfig.leadSource}\n${data.body}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
    }

    console.error("Booking email failed:", error);
    return NextResponse.json({ error: "Failed to send booking request" }, { status: 500 });
  }
}
