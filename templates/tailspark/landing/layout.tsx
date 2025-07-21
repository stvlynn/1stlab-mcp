"use client";

import "./assets/style.css";

import Footer from "./components/footer";
import Header from "./components/header";
import { Page } from "@/types/landing";
import { useLanguage } from "@/providers/language";

export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { pageData, isLoading } = useLanguage();
  
  if (!pageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading...
          </p>
        </div>
      </div>
    );
  }
  
  // Show content immediately even if loading (for language switching)
  if (isLoading && pageData) {
    return (
      <main>
        {pageData.header && <Header header={pageData.header} />}
        {children}
        {pageData.footer && <Footer footer={pageData.footer} />}
      </main>
    );
  }

  return (
    <main>
      {pageData.header && <Header header={pageData.header} />}
      {children}
      {pageData.footer && <Footer footer={pageData.footer} />}
    </main>
  );
}
