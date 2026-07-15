"use client";

import * as React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { WhatsAppFloat } from "./whatsapp-float";
import { NavProvider, useNav } from "./nav-provider";
import { HomePage } from "./pages/home";
import { ProductsPage } from "./pages/products";
import { QualityPage } from "./pages/quality";
import { GccPage } from "./pages/gcc";
import { ProcessPage } from "./pages/process";
import { PrivateLabelPage } from "./pages/private-label";
import { GalleryPage } from "./pages/gallery";

function CurrentPage() {
  const { page } = useNav();
  switch (page) {
    case "home": return <HomePage />;
    case "products": return <ProductsPage />;
    case "quality": return <QualityPage />;
    case "gcc": return <GccPage />;
    case "process": return <ProcessPage />;
    case "private-label": return <PrivateLabelPage />;
    case "gallery": return <GalleryPage />;
    default: return <HomePage />;
  }
}

export function SiteShell({ children }: { children?: React.ReactNode }) {
  return (
    <NavProvider
      floating={
        <WhatsAppFloat />
      }
    >
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <CurrentPage />
        </main>
        <Footer />
      </div>
    </NavProvider>
  );
}
