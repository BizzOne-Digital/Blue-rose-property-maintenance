import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const to = process.env.CONTACT_TO || "Bluerosepm9@gmail.com";

if (!user || !pass) {
  console.error("FAIL: SMTP not configured");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user, pass },
});

const sampleContact = {
  subject: "Contact form test",
  text: [
    "NEW CONTACT MESSAGE (TEST)",
    "========================",
    "Name: Test User",
    "Email: test@example.com",
    "Phone: (306) 555-0100",
    "Service: Carpet Cleaning",
    "Subject: SMTP routing test",
    "",
    "This is a test contact form submission.",
  ].join("\n"),
};

const sampleBooking = {
  subject: "Booking Request - Carpet Cleaning (TEST)",
  text: [
    "BOOKING REQUEST (TEST)",
    "======================",
    "Service: Carpet Cleaning",
    "Bedrooms: 1 Bedroom",
    "Preferred Date: 2026-09-15",
    "Preferred Time: Morning",
    "",
    "Name: Test User",
    "Email: test@example.com",
    "Phone: (306) 555-0100",
  ].join("\n"),
};

try {
  await transporter.sendMail({
    from: `"Blue Rose Property Maintenance" <${process.env.SMTP_FROM || user}>`,
    to,
    replyTo: "test@example.com",
    subject: sampleContact.subject,
    text: sampleContact.text,
  });
  console.log(`OK: Contact test sent to ${to}`);

  await transporter.sendMail({
    from: `"Blue Rose Property Maintenance" <${process.env.SMTP_FROM || user}>`,
    to,
    replyTo: "test@example.com",
    subject: sampleBooking.subject,
    text: sampleBooking.text,
  });
  console.log(`OK: Booking test sent to ${to}`);
} catch (error) {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
}
