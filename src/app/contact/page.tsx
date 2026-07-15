import type { Metadata } from "next";
import { ContactPageClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us | Snack Fruits",
  description:
    "Get in touch with Snack Fruits — Egypt's leading IQF frozen fruit exporter. Request a quotation, ask about products, or reach our export team.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
