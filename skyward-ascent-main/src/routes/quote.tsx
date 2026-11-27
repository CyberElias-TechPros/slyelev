import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote — SLY Elevators" },
      { name: "description", content: "Request a tailored quotation for elevators, glass partitions, or solar energy systems." },
      { property: "og:title", content: "Request a Quote — SLY Elevators" },
      { property: "og:description", content: "Tell us about your project. We respond within one business day." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: IMG.heroBuilding },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: IMG.heroBuilding },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  const [f, setF] = useState({ name: "", email: "", phone: "", service: "Elevators", location: "", budget: "", details: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${f.name}%0APhone: ${f.phone}%0AService: ${f.service}%0ALocation: ${f.location}%0ABudget: ${f.budget}%0A%0A${f.details}`;
    window.location.href = `mailto:slyelevator@gmail.com?subject=Request%20for%20Quotation&body=${body}`;
  };
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
          <form onSubmit={submit} className="glass-strong rounded-3xl p-8 md:p-10 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <L label="Full Name"><input required value={f.name} onChange={(e)=>setF({...f,name:e.target.value})} className="ip" /></L>
              <L label="Email"><input required type="email" value={f.email} onChange={(e)=>setF({...f,email:e.target.value})} className="ip" /></L>
              <L label="Phone"><input value={f.phone} onChange={(e)=>setF({...f,phone:e.target.value})} className="ip" /></L>
              <L label="Service">
                <select value={f.service} onChange={(e)=>setF({...f,service:e.target.value})} className="ip">
                  <option>Elevators</option><option>Glass Partitions</option><option>Solar Energy</option><option>Multiple</option>
                </select>
              </L>
              <L label="Project Location"><input value={f.location} onChange={(e)=>setF({...f,location:e.target.value})} className="ip" /></L>
              <L label="Estimated Budget"><input placeholder="Optional" value={f.budget} onChange={(e)=>setF({...f,budget:e.target.value})} className="ip" /></L>
            </div>
            <L label="Project Details"><textarea required rows={6} value={f.details} onChange={(e)=>setF({...f,details:e.target.value})} className="ip resize-none" placeholder="Building type, floors, square meters, special requirements..." /></L>
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold magnetic-btn hover:cyan-glow">
                Request Quotation <ArrowRight size={16} />
              </button>
              <a href="mailto:slyelevator@gmail.com?subject=Request%20for%20Quotation" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-semibold">
                <Mail size={16} /> Email Directly
              </a>
            </div>
          </form>
        </div>
      </section>
      <style>{`.ip{width:100%;background:rgba(255,255,255,.04);border:1px solid var(--color-border);border-radius:12px;padding:.75rem 1rem;font-size:.9rem;outline:none;color:inherit;transition:all .2s}.ip:focus{border-color:var(--color-primary);box-shadow:0 0 0 3px rgba(0,194,255,.15)}`}</style>
    </>
  );
}

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</span>{children}</label>;
}
