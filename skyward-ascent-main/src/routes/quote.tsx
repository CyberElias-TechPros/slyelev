import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Mail,
  MessageCircle,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { IMG } from "@/lib/images";
import { seo } from "@/lib/seo";
import { useInquiryHandoff } from "@/lib/use-inquiry";
import { whatsappHref } from "@/lib/site";

export const Route = createFileRoute("/quote")({
  head: () => ({
    ...seo({
      title: "Request a Quote — SLY Elevators",
      description:
        "Request a tailored quotation for elevators, glass partitions, or solar energy systems.",
      path: "/quote",
      ogTitle: "Request a Quote — SLY Elevators",
      image: IMG.heroBuilding,
    }),
  }),
  component: QuotePage,
});

const SERVICES = ["Elevators", "Glass Partitions", "Solar Energy", "Multiple"];

function QuotePage() {
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Elevators",
    location: "",
    budget: "",
    details: "",
  });
  const handoff = useInquiryHandoff();

  const set =
    (k: keyof typeof f) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    handoff.submit(
      { name: f.name, email: f.email, phone: f.phone, details: f.details },
      "Request for Quotation",
      [
        { label: "Name", value: f.name },
        { label: "Email", value: f.email },
        { label: "Phone", value: f.phone },
        { label: "Service", value: f.service },
        { label: "Location", value: f.location },
        { label: "Budget", value: f.budget },
        { label: "Details", value: f.details },
      ],
    );
  };

  const err = (k: string) =>
    handoff.errors[k] ? (
      <p className="mt-1.5 text-xs text-destructive" role="alert">
        {handoff.errors[k]}
      </p>
    ) : null;

  return (
    <>
      <PageHero
        eyebrow="Quotation"
        title="Request a Tailored Quote"
        subtitle="Tell us about your project — our engineers will prepare a detailed proposal within one business day."
        image={IMG.heroBuilding}
      />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          {handoff.sent ? (
            <div
              className="glass-strong rounded-3xl p-8 md:p-10 text-center space-y-5"
              role="status"
            >
              <CheckCircle2 size={44} className="text-primary mx-auto" />
              <h2 className="text-2xl font-semibold">
                Your request is ready to send
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Your email app should have opened with everything pre-filled —
                just press send. Didn't happen? Use WhatsApp or copy the details
                below instead.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={
                    handoff.whatsappUrl ||
                    whatsappHref("Hello SLY Elevators, I'd like a quotation.")
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold magnetic-btn"
                >
                  <MessageCircle size={16} /> Send via WhatsApp
                </a>
                <button
                  onClick={handoff.copy}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-semibold"
                >
                  <Copy size={16} />{" "}
                  {handoff.copied ? "Copied!" : "Copy details"}
                </button>
                <button
                  onClick={handoff.dismiss}
                  type="button"
                  className="inline-flex items-center rounded-full px-6 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Edit request
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={submit}
              noValidate
              className="glass-strong rounded-3xl p-8 md:p-10 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <L label="Full Name" error={handoff.errors.name}>
                  <input
                    required
                    value={f.name}
                    onChange={set("name")}
                    autoComplete="name"
                    aria-invalid={!!handoff.errors.name}
                    className="ip"
                  />
                </L>
                <L label="Email" error={handoff.errors.email}>
                  <input
                    required
                    type="email"
                    value={f.email}
                    onChange={set("email")}
                    autoComplete="email"
                    aria-invalid={!!handoff.errors.email}
                    className="ip"
                  />
                </L>
                <L label="Phone" error={handoff.errors.phone}>
                  <input
                    type="tel"
                    value={f.phone}
                    onChange={set("phone")}
                    autoComplete="tel"
                    aria-invalid={!!handoff.errors.phone}
                    className="ip"
                  />
                </L>
                <L label="Service">
                  <select
                    value={f.service}
                    onChange={set("service")}
                    className="ip"
                  >
                    {SERVICES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </L>
                <L label="Project Location">
                  <input
                    value={f.location}
                    onChange={set("location")}
                    className="ip"
                  />
                </L>
                <L label="Estimated Budget">
                  <input
                    placeholder="Optional"
                    value={f.budget}
                    onChange={set("budget")}
                    className="ip"
                  />
                </L>
              </div>
              <L label="Project Details" error={handoff.errors.details}>
                <textarea
                  required
                  rows={6}
                  value={f.details}
                  onChange={set("details")}
                  aria-invalid={!!handoff.errors.details}
                  className="ip resize-none"
                  placeholder="Building type, floors, square meters, special requirements..."
                />
              </L>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold magnetic-btn hover:cyan-glow btn-sheen"
                >
                  Request Quotation <ArrowRight size={16} />
                </button>
                <a
                  href="mailto:slyelevator@gmail.com?subject=Request%20for%20Quotation"
                  className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-semibold"
                >
                  <Mail size={16} /> Email Directly
                </a>
              </div>
            </form>
          )}
        </div>
      </section>
      <style>{`.ip{width:100%;background:rgba(255,255,255,.04);border:1px solid var(--color-border);border-radius:12px;padding:.75rem 1rem;font-size:.9rem;outline:none;color:inherit;transition:all .2s}.ip:focus{border-color:var(--color-primary);box-shadow:0 0 0 3px rgba(0,194,255,.15)}`}</style>
    </>
  );
}

function L({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </span>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </label>
  );
}
