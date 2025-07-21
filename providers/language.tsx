"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Page } from "@/types/landing";

interface LanguageContextType {
  currentLanguage: string;
  availableLanguages: { code: string; name: string; flag: string }[];
  setLanguage: (lang: string) => void;
  t: (key: string) => any;
  tGeneral: (key: string) => any;
  pageData: Page | null;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [pageData, setPageData] = useState<Page | null>(null);
  const [generalData, setGeneralData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadLanguageData = async (lang: string) => {
    console.log(`Loading language data for: ${lang}`);
    // Don't show loading state for initial load
    try {
      // Add cache busting to ensure fresh data
      const timestamp = new Date().getTime();
      // Load page data
      const pageResponse = await fetch(`/pagejson/${lang}.json?t=${timestamp}`);
      if (!pageResponse.ok) {
        throw new Error(`Failed to load page data for ${lang}: ${pageResponse.status} ${pageResponse.statusText}`);
      }
      
      // Check content type to ensure we're getting JSON
      const contentType = pageResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON but got ${contentType}`);
      }
      
      const pageData = await pageResponse.json();
      console.log(`Loaded page data for ${lang}:`, pageData.header?.brand?.title);
      setPageData(pageData);

      // Load general translations
      try {
        const generalResponse = await fetch(`/locales/${lang}.json?t=${timestamp}`);
        if (!generalResponse.ok) {
          console.log(`No general translations found for ${lang}: ${generalResponse.status}`);
          setGeneralData({});
          return;
        }
        
        // Check content type for general translations
        const generalContentType = generalResponse.headers.get('content-type');
        if (!generalContentType || !generalContentType.includes('application/json')) {
          console.warn(`General translations not JSON for ${lang}, using empty object`);
          setGeneralData({});
          return;
        }
        
        const generalData = await generalResponse.json();
        console.log(`Loaded general data for ${lang}:`, generalData);
        setGeneralData(generalData);
      } catch (generalError) {
        console.warn(`General translations not found for ${lang}, using fallback`);
        setGeneralData({});
      }
      // Don't set loading to false for initial load
    } catch (error) {
      console.error(`Failed to load language ${lang}:`, error);
      // Fallback to English if language fails to load
      if (lang !== "en") {
        try {
          const pageResponse = await fetch("/pagejson/en.json");
          if (!pageResponse.ok) {
            throw new Error(`Failed to load English fallback: ${pageResponse.status}`);
          }
          
          const contentType = pageResponse.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Expected JSON but got ${contentType}`);
          }
          
          const pageData = await pageResponse.json();
          setPageData(pageData);
          
          try {
            const generalResponse = await fetch("/locales/en.json");
            if (generalResponse.ok) {
              const generalContentType = generalResponse.headers.get('content-type');
              if (!generalContentType || !generalContentType.includes('application/json')) {
                setGeneralData({});
              } else {
                const generalData = await generalResponse.json();
                setGeneralData(generalData);
              }
            } else {
              setGeneralData({});
            }
          } catch {
            setGeneralData({});
          }
        } catch (fallbackError) {
          console.error("Failed to load fallback English translations:", fallbackError);
          // Set minimal fallback data
          setPageData({
            header: { 
              brand: { title: "MCP Servers", url: "/", avatar: { src: "/logo.png" } }, 
              nav: { 
                items: [
                  { title: "Categories", url: "/categories", target: "_self" },
                  { title: "Submit", url: "https://github.com/stvlynn/1stlab-mcp/issues/1", target: "_blank" },
                  { title: "Telegram", url: "https://t.me/+N0gv4O9SXio2YWU1", target: "_blank" },
                  { title: "Discord", url: "https://discord.gg/RsYPRrnyqg", target: "_blank" }
                ]
              }
            },
            hero: { title: "Find Awesome MCP Servers", description: " MCP Servers Stored" },
            footer: { 
              brand: { title: "MCP Servers", description: "The largest collection of MCP Servers" },
              nav: { items: [] },
              copyright: { owner: "1stlab.org", text: "All rights reserved" }
            }
          });
          setGeneralData({});
        }
        // Don't set loading to false for fallback
      } else {
        // If English also fails, use hardcoded fallback
        setPageData({
          header: { 
            brand: { title: "MCP Servers", url: "/", avatar: { src: "/logo.png" } }, 
            nav: { 
              items: [
                { title: "Categories", url: "/categories", target: "_self" },
                { title: "Submit", url: "https://github.com/stvlynn/1stlab-mcp/issues/1", target: "_blank" },
                { title: "Telegram", url: "https://t.me/+N0gv4O9SXio2YWU1", target: "_blank" },
                { title: "Discord", url: "https://discord.gg/RsYPRrnyqg", target: "_blank" }
              ]
            }
          },
          hero: { title: "Find Awesome MCP Servers", description: " MCP Servers Stored" },
          footer: { 
            brand: { title: "MCP Servers", description: "The largest collection of MCP Servers" },
            nav: { items: [] },
            copyright: { owner: "1stlab.org", text: "All rights reserved" }
          }
        });
        setGeneralData({});
        // Don't set loading to false for hardcoded fallback
      }
    }
  };

  useEffect(() => {
    // Load language from localStorage or use browser language preference
    const savedLanguage = localStorage.getItem("preferred-language");
    const browserLanguage = navigator.language.split("-")[0];
    
    const defaultLanguage = savedLanguage || 
      (languages.find(lang => lang.code === browserLanguage)?.code) || 
      "en";
    
    setCurrentLanguage(defaultLanguage);
    loadLanguageData(defaultLanguage);
  }, []);

  const setLanguage = (lang: string) => {
    console.log(`Switching to language: ${lang}`);
    setCurrentLanguage(lang);
    setIsLoading(true); // Show loading when switching languages
    localStorage.setItem("preferred-language", lang);
    loadLanguageData(lang).finally(() => setIsLoading(false));
  };

  const t = (keyPath: string) => {
    if (!pageData) return keyPath;
    
    const keys = keyPath.split(".");
    let result: any = pageData;
    
    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = result[key];
      } else {
        return keyPath; // Return key if not found
      }
    }
    
    return result;
  };

  const tGeneral = (keyPath: string) => {
    if (!generalData || Object.keys(generalData).length === 0) {
      // Provide hardcoded fallbacks for common keys
      const fallbacks: { [key: string]: string } = {
        'search.placeholder': 'keyword to search',
      };
      return fallbacks[keyPath] || keyPath;
    }
    
    const keys = keyPath.split(".");
    let result: any = generalData;
    
    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = result[key];
      } else {
        // Provide fallback for missing keys
        const fallbacks: { [key: string]: string } = {
          'search.placeholder': 'keyword to search',
        };
        return fallbacks[keyPath] || keyPath;
      }
    }
    
    return result;
  };

  const value = {
    currentLanguage,
    availableLanguages: languages,
    setLanguage,
    t,
    tGeneral,
    pageData,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}