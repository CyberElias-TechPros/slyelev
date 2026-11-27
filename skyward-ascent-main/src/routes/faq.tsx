import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Accordion } from "@/routes/elevators";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — SLY Elevators" },
      { name: "description", content: "Answers to common questions about elevators, glass partitions, solar, maintenance, installation, and warranty." },
      { property: "og:title", content: "Frequently Asked Questions — SLY Elevators" },
      { property: "og:description", content: "Everything you need to know before we begin." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: IMG.blueprint },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: IMG.blueprint },
    ],
  }),
  component: FAQPage,
});

const sections: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Elevators",
    items: [
      { q: "What types of elevators do you install?", a: "Passenger, freight, hospital, dumbwaiter, panoramic glass, hydraulic, and MRL systems." },
      { q: "Can you modernize old elevators?", a: "Yes — we upgrade controls, drives, cabins, and safety systems on existing lifts." },
    ],
  },
  {
    title: "Glass Partitions",
    items: [
      { q: "Are your partitions soundproof?", a: "We offer acoustic glass systems with double glazing for high sound attenuation." },
      { q: "Do you support smart switchable glass?", a: "Yes — PDLC switchable glass for privacy on demand is available." },
    ],
  },
  {
    title: "Solar Energy",
    items: [
      { q: "How long until I see savings?", a: "Most residential systems achieve meaningful payback within 3–5 years depending on load." },
      { q: "Do you offer battery backup?", a: "Yes — lithium battery banks are integrated with hybrid and off-grid systems." },
    ],
  },
  {
    title: "Maintenance",
    items: [
      { q: "Do you offer 24/7 support?", a: "Yes — emergency support is available 24/7 for all installed systems." },
      { q: "How often is servicing required?", a: "Typically quarterly for elevators; bi-annually for solar systems." },
    ],
  },
  {
    title: "Installation & Warranty",
    items: [
      { q: "How long does installation take?", a: "Elevators: 4–8 weeks. Glass partitions: 1–3 weeks. Solar: 1–2 weeks per system." },
      { q: "What warranty do you provide?", a: "Standard 1-year workmanship warranty plus full manufacturer warranties on equipment." },
    ],
  },
];

function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        subtitle="Quick answers across elevators, glass, solar, maintenance, installation, and warranties."
        image={IMG.blueprint}
      />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-2xl font-semibold mb-5 text-primary">{s.title}</h2>
              {s.items.map((it) => <Accordion key={it.q} q={it.q} a={it.a} />)}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
