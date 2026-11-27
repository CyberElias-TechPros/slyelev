import { describe, expect, it } from "vitest";
import { absoluteUrl, DEFAULT_OG_IMAGE, organizationJsonLd, seo } from "./seo";

describe("absoluteUrl", () => {
  it("keeps the home page at the bare domain", () => {
    expect(absoluteUrl("/")).toBe("https://slyelevators.com");
  });

  it("prefixes deep pages", () => {
    expect(absoluteUrl("/about")).toBe("https://slyelevators.com/about");
  });
});

describe("seo", () => {
  const base = {
    title: "About — SLY Elevators",
    description: "About page",
    path: "/about",
  };

  it("includes title, description and a canonical link entry", () => {
    const { meta, links } = seo(base);
    expect(meta).toContainEqual({ title: base.title });
    expect(meta).toContainEqual({
      name: "description",
      content: base.description,
    });
    expect(links).toContainEqual({
      rel: "canonical",
      href: "https://slyelevators.com/about",
    });
  });

  it("always emits complete Open Graph and Twitter card tags", () => {
    const { meta } = seo(base);
    const get = (k: string, v: string) =>
      meta.find((m) => (m as unknown as Record<string, string>)[k] === v);
    expect(get("property", "og:title")).toBeTruthy();
    expect(get("property", "og:url")).toBeTruthy();
    expect(get("property", "og:image")).toBeTruthy();
    expect(get("name", "twitter:card")).toBeTruthy();
    expect(get("name", "twitter:image")).toBeTruthy();
  });

  it("defaults the social image to the site OG image", () => {
    const { meta } = seo(base);
    expect(meta).toContainEqual({
      property: "og:image",
      content: DEFAULT_OG_IMAGE,
    });
  });

  it("allows ogTitle to differ from title", () => {
    const { meta } = seo({ ...base, ogTitle: "Custom OG" });
    expect(meta).toContainEqual({ property: "og:title", content: "Custom OG" });
    expect(meta).toContainEqual({ title: base.title });
  });
});

describe("organizationJsonLd", () => {
  it("emits valid schema.org Organization data", () => {
    const ld = organizationJsonLd("https://slyelevators.com/og-image.png");
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("Organization");
    expect(ld.url).toBe("https://slyelevators.com");
    expect(ld.address.addressCountry).toBe("NG");
    expect(ld.contactPoint.telephone).toMatch(/^\+234\d+$/);
  });
});
