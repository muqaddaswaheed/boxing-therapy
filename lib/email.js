import nodemailer from "nodemailer";
import { bookingEmail } from "./email-templates";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) return null; // email not configured
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  return transporter;
}

/**
 * Sends the booking confirmation email. Never throws — returns {sent, error}
 * so a mail failure can't break the booking flow.
 */
export async function sendBookingConfirmation({
  to,
  name,
  lang = "fr",
  dateTime = null,
  sessionLabel = "",
  remaining = null,
  total = null,
}) {
  const tx = getTransporter();
  if (!tx || !to) return { sent: false, error: "EMAIL_NOT_CONFIGURED_OR_NO_RECIPIENT" };

  const { subject, html } = bookingEmail(lang, {
    name,
    dateTime,
    sessionLabel,
    remaining,
    total,
  });
  try {
    await tx.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    return { sent: true };
  } catch (err) {
    return { sent: false, error: err?.message || "SEND_FAILED" };
  }
}
