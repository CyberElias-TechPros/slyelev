import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { IMG } from "@/lib/images";
import { seo } from "@/lib/seo";
import { CONTACT, mailtoHref, telHref } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    ...seo({
      title: "Privacy Policy — SLY Elevators",
      description:
        "How SLY Elevators handles your information when you use our website or contact us.",
      path: "/privacy",
      ogTitle: "Privacy Policy — SLY Elevators",
      image: IMG.skyscraper,
    }),
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we handle your information — plainly stated."
        image={IMG.skyscraper}
      />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div className="glass-strong rounded-2xl p-8 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              What this website collects
            </h2>
            <p>
              Nothing. This website has no accounts, no analytics trackers, no
              advertising, and no cookies of its own. We do not collect, store,
              or process any personal data on the site itself.
            </p>
          </div>

          <div className="glass-strong rounded-2xl p-8 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              When you contact us
            </h2>
            <p>
              When you use the quote or contact forms, your details are placed
              into a pre-filled email or WhatsApp message{" "}
              <em>on your own device</em> and sent by you directly to us. We
              never see that information until you choose to send it. Once you
              contact us, we use your details solely to respond to your inquiry
              and prepare quotations — never for third-party marketing.
            </p>
          </div>

          <div className="glass-strong rounded-2xl p-8 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              Third-party services
            </h2>
            <p>
              The site loads fonts from Google Fonts and Fontshare, and some
              page imagery from Unsplash. Those providers may see your IP
              address as part of any normal web request. WhatsApp conversations
              are governed by WhatsApp's own privacy policy.
            </p>
          </div>

          <div className="glass-strong rounded-2xl p-8 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              Your data, your control
            </h2>
            <p>
              You may ask us at any time what contact details we hold about you,
              request a correction, or ask us to delete them. Reach us through
              any of the channels below and we will act on your request
              promptly.
            </p>
          </div>

          <div className="glass-strong rounded-2xl p-8 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />{" "}
                {CONTACT.address}
              </li>
              <li className="flex gap-2">
                <Phone size={16} className="text-primary mt-0.5 shrink-0" />{" "}
                <a
                  href={telHref(CONTACT.primaryPhone)}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT.primaryPhone}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="text-primary mt-0.5 shrink-0" />{" "}
                <a
                  href={mailtoHref(CONTACT.primaryEmail)}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT.primaryEmail}
                </a>
              </li>
            </ul>
            <p className="pt-2 text-xs">
              Questions about this policy?{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
