import { useMemo, useState } from "react";
import {
  buildMailto,
  buildWhatsAppLink,
  formatInquiryText,
  validateInquiry,
  type InquiryField,
} from "./inquiry";
import { CONTACT } from "./site";

export type InquiryHandoff = {
  errors: Record<string, string>;
  sent: boolean;
  /** Attempt the handoff: validates, opens the visitor's mail client, records success. */
  submit: (
    fields: Record<string, string>,
    subject: string,
    mailtoFields: InquiryField[],
  ) => void;
  /** Pre-filled WhatsApp chat with the same inquiry. */
  whatsappUrl: string;
  /** Plain text of the inquiry for copy-to-clipboard fallback. */
  copyText: string;
  copy: () => void;
  copied: boolean;
  dismiss: () => void;
};

/**
 * Client-side handoff for the mailto/WhatsApp inquiry flow: validates input,
 * opens the mail client, and always leaves the visitor with working fallbacks
 * (WhatsApp deep link + copy-to-clipboard) in case no mail app is configured.
 */
export function useInquiryHandoff(): InquiryHandoff {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [payload, setPayload] = useState<{
    fields: InquiryField[];
    subject: string;
  } | null>(null);

  const whatsappUrl = useMemo(
    () =>
      payload
        ? buildWhatsAppLink(
            CONTACT.whatsapp,
            formatInquiryText(
              `Hello ${"SLY Elevators"} — new inquiry:`,
              payload.fields,
            ),
          )
        : "",
    [payload],
  );
  const copyText = useMemo(
    () =>
      payload
        ? formatInquiryText(
            `Inquiry for SLY Elevators (${payload.subject}):`,
            payload.fields,
          )
        : "",
    [payload],
  );

  return {
    errors,
    sent,
    whatsappUrl,
    copyText,
    copied,
    submit(fields, subject, mailtoFields) {
      const errs = validateInquiry(fields);
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
      setPayload({ fields: mailtoFields, subject });
      setCopied(false);
      setSent(true);
      // Hand off to the visitor's mail client.
      window.location.href = buildMailto(
        CONTACT.primaryEmail,
        subject,
        mailtoFields,
      );
    },
    copy() {
      const text = copyText;
      if (!text) return;
      const done = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      };
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        // Older browsers: legacy execCommand path.
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch {
          /* noop */
        }
        document.body.removeChild(ta);
        done();
      }
    },
    dismiss() {
      setSent(false);
    },
  };
}
