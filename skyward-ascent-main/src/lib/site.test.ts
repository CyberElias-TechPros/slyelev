import { describe, expect, it } from "vitest";
import { CONTACT, mailtoHref, telHref, whatsappHref } from "./site";

describe("contact helpers", () => {
  it("normalizes display phones into tel: links", () => {
    expect(telHref("+234 803 404 6591")).toBe("tel:+2348034046591");
    expect(telHref("+234 (0) 803-339-6799")).toBe("tel:+23408033396799");
  });

  it("builds plain mailto links with encoded subjects", () => {
    expect(mailtoHref("slyelevator@gmail.com")).toBe(
      "mailto:slyelevator@gmail.com",
    );
    const url = mailtoHref("slyelevator@gmail.com", "Quote & visit");
    expect(url).toBe(
      `mailto:slyelevator@gmail.com?subject=${encodeURIComponent("Quote & visit")}`,
    );
  });

  it("builds WhatsApp deep links against the configured number", () => {
    expect(whatsappHref()).toMatch(/^https:\/\/wa\.me\/\d+$/);
    expect(whatsappHref("Hello there")).toMatch(
      new RegExp(
        `^https://wa\\.me/${CONTACT.whatsapp}\\?text=${encodeURIComponent("Hello there")}$`,
      ),
    );
  });
});
