// Single source of truth for company/site constants.
// Update here — Navbar, Footer, contact, quote, WhatsApp FAB, SEO and sitemap all follow.

export const SITE_URL = "https://slyelevators.com";
export const SITE_NAME = "SLY Elevators";

export const CONTACT = {
  address: "No. 9 Emekuku Street, D-Line, Port Harcourt, Nigeria",
  emails: [
    "slyelevator@gmail.com",
    "info@slyelevators.com",
    "slypeeniglyd@yahoo.co.uk",
  ],
  primaryEmail: "slyelevator@gmail.com",
  phones: ["+234 803 404 6591", "+234 803 339 6799", "+234 814 688 8616"],
  primaryPhone: "+234 803 404 6591",
  whatsapp: "2348034046591",
} as const;

/** tel: link target from a display phone (+234 803 404 6591 -> tel:+2348034046591) */
export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

export const mailtoHref = (email: string, subject?: string) =>
  `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const whatsappHref = (text?: string) =>
  `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
