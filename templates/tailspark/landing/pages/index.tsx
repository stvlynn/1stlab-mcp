"use client";

import Faq from "../components/faq";
import Hero from "../components/hero";
import { Page } from "@/types/landing";
import { Project } from "@/types/project";
import Projects from "../components/projects";
import Search from "../components/search";
import { useLanguage } from "@/providers/language";

export default function ({
  projects,
  projectsCount,
}: {
  projects: Project[];
  projectsCount: number;
}) {
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
      <div>
        {pageData.hero && <Hero hero={pageData.hero} count={projectsCount} />}
        <Search />
        <Projects projects={projects} loading={true} />
        {pageData.faq && <Faq section={pageData.faq} />}
      </div>
    );
  }

  return (
    <div>
      {pageData.hero && <Hero hero={pageData.hero} count={projectsCount} />}
      <Search />
      <Projects projects={projects} />
      {pageData.faq && <Faq section={pageData.faq} />}
    </div>
  );
}
