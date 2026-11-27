// Per-route SEO metadata. Every route's head() builds its meta through this
// helper so titles, canonical URLs, Open Graph and Twitter tags stay complete
// and consistent across the site.
import { SITE_NAME, SITE_URL } from "./site";

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path === "/" ? "" : path}`;

type SeoInput = {
  /** <title> text, e.g. "About — SLY Elevators" */
  title: string;
  description: string;
  /** Route path, e.g. "/about" or "/" */
  path: string;
  /** Absolute image URL for social cards */
  image?: string;
  /** Optional override for the og:title (defaults to title) */
  ogTitle?: string;
};

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Build the complete head() payload for a route. Canonical links live in
 * `links` (TanStack Start ignores `link` entries inside `meta`).
 * Spread the result: head: () => ({ ...seo({ ... }) })
 */
export function seo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  ogTitle,
}: SeoInput) {
  const url = absoluteUrl(path);
  return {
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title },
      { name: "description", content: description },

      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: ogTitle ?? title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle ?? title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
  };
}

/** Organization JSON-LD structured data for rich search results. */
export function organizationJsonLd(logoUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: logoUrl,
    description:
      "Premium elevator systems, architectural glass solutions, and sustainable solar energy across Nigeria.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 9 Emekuku Street, D-Line",
      addressLocality: "Port Harcourt",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+2348034046591",
      contactType: "customer service",
      availableLanguage: ["en"],
    },
  };
}
