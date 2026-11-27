// Inquiry flow helpers. The site has no backend — quote/contact submissions
// are handed to the visitor's mail or WhatsApp client with a fully-encoded,
// pre-filled message. These builders keep that encoding correct for ANY user
// input (&, ?, %, +, newlines, emoji) and are unit-tested.

export type InquiryField = { label: string; value: string };

/** Build a mailto: URL with subject and a labelled, fully-encoded body. */
export function buildMailto(
  to: string,
  subject: string,
  fields: InquiryField[],
): string {
  const body = fields
    .filter((f) => f.value.trim() !== "")
    .map((f) => `${f.label}: ${f.value.trim()}`)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Build a wa.me deep link with a pre-filled message. */
export function buildWhatsAppLink(number: string, text: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Plain-text rendering of an inquiry (used for WhatsApp and copy-to-clipboard). */
export function formatInquiryText(
  intro: string,
  fields: InquiryField[],
): string {
  const body = fields
    .filter((f) => f.value.trim() !== "")
    .map((f) => `${f.label}: ${f.value.trim()}`)
    .join("\n");
  return `${intro}\n\n${body}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validate an inquiry before handing it off. Returns field-level errors. */
export function validateInquiry(
  fields: Record<string, string>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (fields.name !== undefined && fields.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }
  if (fields.email !== undefined && !EMAIL_RE.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (fields.phone !== undefined && fields.phone.trim() !== "") {
    const digits = fields.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) {
      errors.phone = "Please enter a valid phone number.";
    }
  }
  if (fields.message !== undefined && fields.message.trim().length < 10) {
    errors.message = "Please tell us a little more (at least 10 characters).";
  }
  if (fields.details !== undefined && fields.details.trim().length < 10) {
    errors.details = "Please tell us a little more (at least 10 characters).";
  }
  return errors;
}
