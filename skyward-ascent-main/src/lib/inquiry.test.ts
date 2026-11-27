import { describe, expect, it } from "vitest";
import {
  buildMailto,
  buildWhatsAppLink,
  formatInquiryText,
  validateInquiry,
} from "./inquiry";

describe("buildMailto", () => {
  it("produces a well-formed mailto with subject and body", () => {
    const url = buildMailto("hi@example.com", "Quote request", [
      { label: "Name", value: "Ada" },
      { label: "Service", value: "Elevators" },
    ]);
    expect(url).toMatch(/^mailto:hi@example\.com\?subject=/);
    expect(decodeURIComponent(url)).toContain("subject=Quote request");
    expect(decodeURIComponent(url)).toContain("Name: Ada");
    expect(decodeURIComponent(url)).toContain("Service: Elevators");
  });

  it("safely encodes special characters (&, ?, %, newline, +)", () => {
    const url = buildMailto("hi@example.com", "S&?% Test", [
      { label: "Details", value: "Floors 3&4\n10% discount + VAT" },
    ]);
    // No raw & ? or % outside of encoding — must survive mail clients intact.
    expect(url).not.toMatch(/body=[^&]*&/);
    expect(decodeURIComponent(url)).toContain("Floors 3&4");
    expect(decodeURIComponent(url)).toContain("10% discount + VAT");
    expect(decodeURIComponent(url)).toContain("S&?% Test");
  });

  it("omits empty fields from the body", () => {
    const url = buildMailto("hi@example.com", "Subject", [
      { label: "Name", value: "Ada" },
      { label: "Budget", value: "   " },
    ]);
    expect(decodeURIComponent(url)).toContain("Name: Ada");
    expect(decodeURIComponent(url)).not.toContain("Budget");
  });
});

describe("buildWhatsAppLink", () => {
  it("encodes arbitrary message text", () => {
    const url = buildWhatsAppLink(
      "2348034046591",
      "Hello 👋 Quote for 3&4 floors",
    );
    expect(url).toMatch(/^https:\/\/wa\.me\/2348034046591\?text=/);
    expect(decodeURIComponent(url)).toContain("Hello 👋 Quote for 3&4 floors");
  });
});

describe("formatInquiryText", () => {
  it("joins non-empty fields under the intro", () => {
    const text = formatInquiryText("New inquiry:", [
      { label: "Name", value: " Ada " },
      { label: "Email", value: "" },
    ]);
    expect(text).toBe("New inquiry:\n\nName: Ada");
  });
});

describe("validateInquiry", () => {
  it("accepts a fully valid inquiry", () => {
    const errors = validateInquiry({
      name: "Ada Lovelace",
      email: "ada@example.com",
      phone: "+234 803 404 6591",
      message: "I need a panoramic elevator for a 6-floor hotel.",
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("rejects a too-short name", () => {
    expect(validateInquiry({ name: "A" }).name).toBeDefined();
    expect(validateInquiry({ name: "  " }).name).toBeDefined();
  });

  it("rejects malformed emails", () => {
    for (const bad of ["nope", "a@b", "a b@c.com", "@x.com"]) {
      expect(validateInquiry({ email: bad }).email).toBeDefined();
    }
    expect(validateInquiry({ email: "ada@example.co" }).email).toBeUndefined();
  });

  it("rejects impossible phone numbers but allows empty (optional)", () => {
    expect(validateInquiry({ phone: "" }).phone).toBeUndefined();
    expect(validateInquiry({ phone: "123" }).phone).toBeDefined();
    expect(validateInquiry({ phone: "1".repeat(20) }).phone).toBeDefined();
    expect(validateInquiry({ phone: "+2348034046591" }).phone).toBeUndefined();
  });

  it("requires at least 10 characters of message/details", () => {
    expect(validateInquiry({ message: "hi" }).message).toBeDefined();
    expect(
      validateInquiry({ message: "I would like a full quotation please." })
        .message,
    ).toBeUndefined();
    expect(validateInquiry({ details: "short" }).details).toBeDefined();
  });
});
