"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaFacebookMessenger,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ContactIconKey, ContactMethod } from "@/models/portfolioModel";

interface ContactSectionProps {
  contactMethods: ContactMethod[];
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

export default function ContactSection({ contactMethods }: ContactSectionProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("submitting");

    try {
      const response = await fetch('/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send message");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      toast.success("Message sent successfully! I’ll get back to you soon.");
    } catch (error) {
      setSubmitStatus("error");
      toast.error(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" aria-label="Contact Me" className="scroll-mt-28">
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
                className="group rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-white shadow-[0_14px_38px_-25px_rgba(14,116,144,0.95)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-200/40 hover:bg-white/[0.1]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-200/10 text-amber-200 transition group-hover:bg-amber-200/20">
                  <ContactMethodIcon iconKey={method.iconKey} />
                </div>
                <p className="mt-4 text-sm uppercase tracking-[0.14em] text-slate-400">{method.platform}</p>
                <p className="mt-1 break-all text-sm font-semibold text-white">{method.value}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,1)] backdrop-blur-sm sm:p-7">
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
                className="w-full rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3 text-slate-100 outline-none transition-colors focus:border-amber-300"
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
                className="w-full rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3 text-slate-100 outline-none transition-colors focus:border-amber-300"
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
                className="w-full resize-y rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3 text-slate-100 outline-none transition-colors focus:border-amber-300"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={submitStatus === "submitting"}
              className="inline-flex items-center rounded-xl bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-amber-200/70"
            >
              {submitStatus === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
