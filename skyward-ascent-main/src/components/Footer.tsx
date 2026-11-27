import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import logo from "@/assets/sly-logo.png";
import { CONTACT, mailtoHref, telHref } from "@/lib/site";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");

  // No backend on this site: "subscribe" hands off to the visitor's mail
  // client with a pre-filled request, then confirms inline.
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    window.location.href = mailtoHref(
      CONTACT.primaryEmail,
      `Newsletter subscription — ${email.trim()}`,
    );
    setSubscribed(true);
  };

  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="absolute inset-0 radial-glow opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <img src={logo} alt="SLY Elevators" className="h-12 w-auto mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Engineering vertical intelligence, architectural transparency, and
              sustainable energy across Nigeria.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                ["About", "/about"],
                ["Services", "/services"],
                ["Projects", "/projects"],
                ["FAQ", "/faq"],
                ["Contact", "/contact"],
              ].map(([l, t]) => (
                <li key={t}>
                  <Link to={t} className="hover:text-primary transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/elevators"
                  className="hover:text-primary transition-colors"
                >
                  Elevator Systems
                </Link>
              </li>
              <li>
                <Link
                  to="/glass"
                  className="hover:text-primary transition-colors"
                >
                  Glass Partitions
                </Link>
              </li>
              <li>
                <Link
                  to="/solar"
                  className="hover:text-primary transition-colors"
                >
                  Solar Energy
                </Link>
              </li>
              <li>
                <Link
                  to="/quote"
                  className="hover:text-primary transition-colors"
                >
                  Request Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />{" "}
                {CONTACT.address}
              </li>
              <li className="flex gap-2">
                <Phone size={16} className="text-primary mt-0.5 shrink-0" />
                <a
                  href={telHref(CONTACT.primaryPhone)}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT.primaryPhone}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="text-primary mt-0.5 shrink-0" />
                <a
                  href={mailtoHref(CONTACT.primaryEmail)}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT.primaryEmail}
                </a>
              </li>
            </ul>
            {subscribed ? (
              <p
                className="mt-5 flex items-center gap-2 text-sm text-primary"
                role="status"
              >
                <CheckCircle2 size={16} /> Thanks! Your mail app should open —
                just hit send.
              </p>
            ) : (
              <form className="mt-5 flex" onSubmit={subscribe} noValidate>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email for updates
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email for updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!emailError}
                  className="flex-1 bg-white/5 border border-border rounded-l-full px-4 py-2 text-sm outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  aria-label="Subscribe for updates"
                  className="rounded-r-full bg-primary text-primary-foreground px-4"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            {emailError && (
              <p className="mt-2 text-xs text-destructive" role="alert">
                {emailError}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} SLY Elevators. Engineering the future.
          </p>
          <p>Built with precision in Port Harcourt, Nigeria.</p>
        </div>
      </div>
    </footer>
  );
}
