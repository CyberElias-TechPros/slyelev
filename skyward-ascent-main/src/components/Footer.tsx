import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import logo from "@/assets/sly-logo.png";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="absolute inset-0 radial-glow opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <img src={logo} alt="SLY" className="h-12 w-auto mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Engineering vertical intelligence, architectural transparency, and sustainable energy across Nigeria.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[["About","/about"],["Services","/services"],["Projects","/projects"],["FAQ","/faq"],["Contact","/contact"]].map(([l,t]) => (
                <li key={t}><Link to={t} className="hover:text-primary transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/elevators" className="hover:text-primary transition-colors">Elevator Systems</Link></li>
              <li><Link to="/glass" className="hover:text-primary transition-colors">Glass Partitions</Link></li>
              <li><Link to="/solar" className="hover:text-primary transition-colors">Solar Energy</Link></li>
              <li><Link to="/quote" className="hover:text-primary transition-colors">Request Quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><MapPin size={16} className="text-primary mt-0.5 shrink-0" /> No. 9 Emekuku Street, D-Line, Port Harcourt</li>
              <li className="flex gap-2"><Phone size={16} className="text-primary mt-0.5 shrink-0" /> +234 803 404 6591</li>
              <li className="flex gap-2"><Mail size={16} className="text-primary mt-0.5 shrink-0" /> slyelevator@gmail.com</li>
            </ul>
            <form className="mt-5 flex">
              <input
                type="email"
                placeholder="Email for updates"
                className="flex-1 bg-white/5 border border-border rounded-l-full px-4 py-2 text-sm outline-none focus:border-primary"
              />
              <button className="rounded-r-full bg-primary text-primary-foreground px-4">
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SLY Elevators. Engineering the future.</p>
          <p>Built with precision in Port Harcourt, Nigeria.</p>
        </div>
      </div>
    </footer>
  );
}
