import { NextResponse } from "next/server";
import { z } from "zod";
import { sendBusinessEmail } from "@/lib/mail";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  subject: z.string().min(3),
  service: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    await sendBusinessEmail({
      subject: `Contact: ${data.subject}`,
      replyTo: data.email,
      text: [
        "NEW CONTACT MESSAGE",
        "===================",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Service: ${data.service}`,
        `Subject: ${data.subject}`,
        "",
        data.message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    console.error("Contact email failed:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
