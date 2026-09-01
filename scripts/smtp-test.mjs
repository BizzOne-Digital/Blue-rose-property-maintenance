import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.SMTP_FROM || user;
const to = process.env.CONTACT_TO || user;

if (!user || !pass) {
  console.error("FAIL: SMTP_USER and SMTP_PASS must be set in .env.local");
  process.exit(1);
}

console.log(`Testing SMTP: ${host}:${port} as ${user}`);
console.log(`Send test to: ${to}`);

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user, pass },
});

try {
  await transporter.verify();
  console.log("OK: SMTP connection verified");

  const info = await transporter.sendMail({
    from: `"Blue Rose SMTP Test" <${from}>`,
    to,
    subject: "Blue Rose SMTP test",
    text: `SMTP test succeeded at ${new Date().toISOString()}\n\nIf you received this, contact and booking emails should work.`,
  });

  console.log(`OK: Test email sent (messageId: ${info.messageId})`);
} catch (error) {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
}
