"use client";

import { FormEvent, useState } from "react";
import {
  FaEnvelope,
  FaFacebookMessenger,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ContactFormConfig, ContactIconKey, ContactMethod } from "@/models/portfolioModel";

interface ContactSectionProps {
  contactMethods: ContactMethod[];
  contactForm: ContactFormConfig;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function ContactMethodIcon({ iconKey }: { iconKey: ContactIconKey }) {
  if (iconKey === "mail") {
    return <FaEnvelope className="text-[1.65rem]" />;
  }

  if (iconKey === "whatsapp") {
    return <FaWhatsapp className="text-[1.75rem]" />;
  }

  if (iconKey === "messenger") {
    return <FaFacebookMessenger className="text-[1.75rem]" />;
  }

  return <FaTelegramPlane className="text-[1.75rem]" />;
}

export default function ContactSection({ contactMethods, contactForm }: ContactSectionProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("submitting");
    setStatusMessage("");

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("message", formData.message);
      payload.append("_autoresponse", contactForm.autoresponse);
      payload.append("_next", contactForm.nextUrl);
      payload.append("_cc", contactForm.copyRecipients.join(","));
      payload.append("_captcha", "false");
      payload.append("_subject", contactForm.subject);
      payload.append("_template", contactForm.template);

      const response = await fetch(`https://formsubmit.co/ajax/${contactForm.recipientEmail}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      const result = (await response.json()) as { success?: string | boolean };

      if (!response.ok || (result.success !== true && result.success !== "true")) {
        throw new Error("Unable to send message");
      }

      setSubmitStatus("success");
      setStatusMessage("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus("error");
      setStatusMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="scroll-mt-28">
      <SectionHeading title="Contact Me" />

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-5 text-center font-display text-2xl font-semibold text-white underline decoration-emerald-400 decoration-2 underline-offset-6 sm:text-left">
            Talk with me
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactMethods.map((method) => (
              <a
                key={method.platform}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-slate-700/70 bg-sky-600/80 p-5 text-white shadow-[0_14px_38px_-25px_rgba(14,116,144,0.95)] transition-all duration-300 hover:-translate-y-1 hover:bg-sky-500"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-900/35 text-white transition group-hover:bg-sky-900/50">
                  <ContactMethodIcon iconKey={method.iconKey} />
                </div>
                <p className="mt-4 text-sm uppercase tracking-[0.14em] text-sky-100">{method.platform}</p>
                <p className="mt-1 break-all text-sm font-semibold text-white">{method.value}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/65 p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,1)] backdrop-blur-sm sm:p-7">
          {statusMessage ? (
            <div
              className={`mb-4 rounded-lg px-4 py-3 text-sm font-semibold ${
                submitStatus === "success"
                  ? "border border-emerald-300/40 bg-emerald-300/10 text-emerald-200"
                  : "border border-rose-300/40 bg-rose-300/10 text-rose-200"
              }`}
            >
              {statusMessage}
            </div>
          ) : null}

          <h3 className="font-display text-2xl font-semibold text-white underline decoration-emerald-400 decoration-2 underline-offset-6">
            Send Message
          </h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-200">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(event) =>
                  setFormData((previous) => ({ ...previous, name: event.target.value }))
                }
                required
                className="w-full rounded-lg border border-yellow-300/80 bg-slate-950/65 px-4 py-3 text-slate-100 outline-none transition-colors focus:border-emerald-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-200">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData((previous) => ({ ...previous, email: event.target.value }))
                }
                required
                className="w-full rounded-lg border border-yellow-300/80 bg-slate-950/65 px-4 py-3 text-slate-100 outline-none transition-colors focus:border-emerald-400"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(event) =>
                  setFormData((previous) => ({ ...previous, message: event.target.value }))
                }
                rows={4}
                required
                className="w-full resize-y rounded-lg border border-yellow-300/80 bg-slate-950/65 px-4 py-3 text-slate-100 outline-none transition-colors focus:border-emerald-400"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={submitStatus === "submitting"}
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400/70"
            >
              {submitStatus === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
