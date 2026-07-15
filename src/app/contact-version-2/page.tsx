import type { Metadata } from "next";
import { ContactVersion2Client } from "./contact-version-2-client";

export const metadata: Metadata = {
  title: "Contact Version 2",
  description: "Experimental standalone contact experience for mobile-safe UI testing.",
};

export default function ContactVersion2Page() {
  return <ContactVersion2Client />;
}
