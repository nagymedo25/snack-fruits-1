import { SiteShell } from "@/components/site-shell";
import {
  OrganizationSchema,
  ProductSchema,
  FAQSchema,
} from "@/components/schema";

export default async function Home() {
  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <OrganizationSchema />
      <ProductSchema />
      <FAQSchema />
      <SiteShell />
    </>
  );
}
