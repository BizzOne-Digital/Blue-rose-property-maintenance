import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

function getSmtpConfig() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    user,
    pass,
    from: process.env.SMTP_FROM || user,
    to: process.env.CONTACT_TO || siteConfig.email,
  };
}

export function isMailConfigured() {
  return getSmtpConfig() !== null;
}

export async function sendBusinessEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error("SMTP is not configured");
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: `"Blue Rose Property Maintenance" <${config.from}>`,
    to: config.to,
    replyTo,
    subject,
    text,
  });
}
