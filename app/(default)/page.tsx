import {
  getProjects,
  getProjectsCount,
  getProjectsWithKeyword,
} from "@/models/project";

import LandingPage from "@/templates/tailspark/landing/pages/index";
import { Project } from "@/types/project";

export const runtime = "edge";

export default async function ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q } = await searchParams;
  let projects: Project[] = [];

  if (q) {
    projects = await getProjectsWithKeyword(q as string, 1, 100);
  } else {
    projects = await getProjects(1, 100);
  }

  const projectsCount = await getProjectsCount();

  return (
    <LandingPage
      projects={projects}
      projectsCount={projectsCount}
    />
  );
}
