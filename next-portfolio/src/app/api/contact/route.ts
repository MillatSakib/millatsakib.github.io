import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");
    const subjectName = name.replace(/[\r\n]/g, " ").slice(0, 100);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "me@millatsakib.com",
      replyTo: email,
      subject: `New portfolio message from ${subjectName}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="margin:0;background:#f1f5f9;padding:32px 16px;font-family:Arial,sans-serif;color:#172033">
          <div style="max-width:620px;margin:0 auto;overflow:hidden;border:1px solid #e2e8f0;border-radius:18px;background:#ffffff;box-shadow:0 10px 30px rgba(15,23,42,.08)">
            <div style="padding:28px 32px;background:linear-gradient(135deg,#0f172a,#134e4a);color:#ffffff">
              <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#a7f3d0">Portfolio contact</p>
              <h1 style="margin:0;font-size:26px;line-height:1.25">You received a new message</h1>
            </div>
            <div style="padding:28px 32px">
              <div style="margin-bottom:24px;padding:16px;border-radius:12px;background:#f8fafc">
                <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#64748b">From</p>
                <p style="margin:0;font-size:17px;font-weight:700;color:#0f172a">${safeName}</p>
                <p style="margin:5px 0 0;font-size:14px;color:#0f766e">${safeEmail}</p>
              </div>
              <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#64748b">Message</p>
              <div style="padding:18px;border-left:4px solid #10b981;border-radius:0 10px 10px 0;background:#f0fdf4;font-size:15px;line-height:1.7;color:#334155">${safeMessage}</div>
              <p style="margin:26px 0 0;font-size:13px;color:#64748b">Reply directly to this email to continue the conversation.</p>
            </div>
          </div>
        </div>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
