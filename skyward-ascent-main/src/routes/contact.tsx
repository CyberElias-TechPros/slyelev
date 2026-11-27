import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SLY Elevators" },
      { name: "description", content: "Speak with our engineers. Offices in Port Harcourt, Nigeria. Email and phone available." },
      { property: "og:title", content: "Let's Build the Future Together" },
      { property: "og:description", content: "Contact SLY Elevators today." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: IMG.skyline },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: IMG.skyline },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Elevators", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}%0APhone: ${form.phone}%0AService: ${form.service}%0A%0A${form.message}`;
    window.location.href = `mailto:slyelevator@gmail.com?subject=Contact%20from%20${encodeURIComponent(form.name)}&body=${body}`;
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
            {[
              { icon: MapPin, label: "Address", value: "No. 9 Emekuku Street, D-Line, Port Harcourt, Nigeria" },
              { icon: Mail, label: "Emails", value: "slyelevator@gmail.com\ninfo@slyelevators.com\nslypeeniglyd@yahoo.co.uk" },
              { icon: Phone, label: "Phones", value: "+234 803 404 6591\n+234 803 339 6799\n+234 814 688 8616" },
            ].map((c) => (
              <div key={c.label} className="glass-strong rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0"><c.icon size={20} /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{c.label}</div>
                    <div className="text-sm whitespace-pre-line">{c.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="glass-strong rounded-3xl p-8 space-y-5">
            <h2 className="text-2xl font-semibold mb-2">Send us a message</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name"><input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="input" /></Field>
              <Field label="Email"><input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="input" /></Field>
              <Field label="Phone Number"><input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="input" /></Field>
              <Field label="Service Needed">
                <select value={form.service} onChange={(e) => setForm({...form, service: e.target.value})} className="input">
                  <option>Elevators</option><option>Glass Partitions</option><option>Solar Energy</option><option>Maintenance</option>
                </select>
              </Field>
            </div>
            <Field label="Message"><textarea required rows={5} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="input resize-none" /></Field>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold magnetic-btn hover:cyan-glow">
              Send Message <Send size={16} />
            </button>
          </motion.form>
        </div>
      </section>

      <style>{`.input{width:100%;background:rgba(255,255,255,.04);border:1px solid var(--color-border);border-radius:12px;padding:.75rem 1rem;font-size:.9rem;outline:none;transition:all .2s;color:inherit}.input:focus{border-color:var(--color-primary);box-shadow:0 0 0 3px rgba(0,194,255,.15)}`}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}
