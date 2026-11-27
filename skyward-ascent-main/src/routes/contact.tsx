import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { IMG } from "@/lib/images";
import { seo } from "@/lib/seo";
import { useInquiryHandoff } from "@/lib/use-inquiry";
import { CONTACT, mailtoHref, telHref, whatsappHref } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...seo({
      title: "Contact — SLY Elevators",
      description:
        "Speak with our engineers. Offices in Port Harcourt, Nigeria. Email and phone available.",
      path: "/contact",
      ogTitle: "Let's Build the Future Together",
      image: IMG.skyline,
    }),
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Elevators",
    message: "",
  });
  const handoff = useInquiryHandoff();

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    handoff.submit(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      },
      `Contact from ${form.name.trim()}`,
      [
        { label: "Name", value: form.name },
        { label: "Email", value: form.email },
        { label: "Phone", value: form.phone },
        { label: "Service", value: form.service },
        { label: "Message", value: form.message },
      ],
    );
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Build the Future Together"
        subtitle="Reach our engineers directly. We respond within one business day."
        image={IMG.skyline}
      />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_1.3fr] gap-10">
          <div className="space-y-4">
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    Address
                  </div>
                  <div className="text-sm">{CONTACT.address}</div>
                </div>
              </div>
            </div>
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    Emails
                  </div>
                  <div className="text-sm space-y-1">
                    {CONTACT.emails.map((e) => (
                      <div key={e}>
                        <a
                          href={mailtoHref(e)}
                          className="hover:text-primary transition-colors break-all"
                        >
                          {e}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    Phones
                  </div>
                  <div className="text-sm space-y-1">
                    {CONTACT.phones.map((p) => (
                      <div key={p}>
                        <a
                          href={telHref(p)}
                          className="hover:text-primary transition-colors"
                        >
                          {p}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <a
              href={whatsappHref(
                "Hello SLY Elevators, I'd like to make an inquiry.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-strong rounded-2xl p-6 flex items-center gap-4 hover:cyan-glow transition-shadow"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                <MessageCircle size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  WhatsApp
                </div>
                <div className="text-sm">Chat with our engineers instantly</div>
              </div>
            </a>
          </div>

          {handoff.sent ? (
            <div
              className="glass-strong rounded-3xl p-8 text-center space-y-5"
              role="status"
            >
              <CheckCircle2 size={44} className="text-primary mx-auto" />
              <h2 className="text-2xl font-semibold">
                Your message is ready to send
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Your email app should have opened with everything pre-filled —
                just press send. Didn't happen? Use WhatsApp or copy the message
                below instead.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={
                    handoff.whatsappUrl ||
                    whatsappHref(
                      "Hello SLY Elevators, I'd like to make an inquiry.",
                    )
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
                  {handoff.copied ? "Copied!" : "Copy message"}
                </button>
                <button
                  onClick={handoff.dismiss}
                  type="button"
                  className="inline-flex items-center rounded-full px-6 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Edit message
                </button>
              </div>
            </div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={submit}
              noValidate
              className="glass-strong rounded-3xl p-8 space-y-5"
            >
              <h2 className="text-2xl font-semibold mb-2">Send us a message</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" error={handoff.errors.name}>
                  <input
                    required
                    value={form.name}
                    onChange={set("name")}
                    autoComplete="name"
                    aria-invalid={!!handoff.errors.name}
                    className="input"
                  />
                </Field>
                <Field label="Email" error={handoff.errors.email}>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    autoComplete="email"
                    aria-invalid={!!handoff.errors.email}
                    className="input"
                  />
                </Field>
                <Field label="Phone Number" error={handoff.errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    autoComplete="tel"
                    aria-invalid={!!handoff.errors.phone}
                    className="input"
                  />
                </Field>
                <Field label="Service Needed">
                  <select
                    value={form.service}
                    onChange={set("service")}
                    className="input"
                  >
                    <option>Elevators</option>
                    <option>Glass Partitions</option>
                    <option>Solar Energy</option>
                    <option>Maintenance</option>
                  </select>
                </Field>
              </div>
              <Field label="Message" error={handoff.errors.message}>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  aria-invalid={!!handoff.errors.message}
                  className="input resize-none"
                />
              </Field>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold magnetic-btn hover:cyan-glow btn-sheen"
              >
                Send Message <Send size={16} />
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <style>{`.input{width:100%;background:rgba(255,255,255,.04);border:1px solid var(--color-border);border-radius:12px;padding:.75rem 1rem;font-size:.9rem;outline:none;transition:all .2s;color:inherit}.input:focus{border-color:var(--color-primary);box-shadow:0 0 0 3px rgba(0,194,255,.15)}`}</style>
    </>
  );
}

function Field({
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
