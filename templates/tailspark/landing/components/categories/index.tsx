import { Category } from "@/types/category";
import Crumb from "./crumb";
import Link from "next/link";
import { Project } from "@/types/project";
import Projects from "../projects";

export default function ({
  categories,
  projects,
}: {
  categories: Category[];
  projects: Project[];
}) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
      <Crumb />
      <div className="mt-16 text-center">
        <h1 className="text-4xl text-primary font-bold mb-2">
          MCP Server Categories
        </h1>

        <h2 className="mx-auto font-bold text-3xl mt-16 mb-4">
          All Categories
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {categories &&
          categories.map((category: Category) => {
            return (
              <Link
                key={category.name}
                href={`/category/${category.name}`}
                className="mb-6 gap-6 overflow-hidden rounded-32 border border-white/30 bg-white/20 backdrop-blur-xl p-8 text-left shadow-lg hover:shadow-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1 relative group"
              >
                {/* Highlight border effect */}
                <div className="absolute inset-0 rounded-32 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-32 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="absolute inset-0 border border-white/20 rounded-32 group-hover:border-white/30 transition-colors duration-300"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-orange-400 group-hover:text-orange-300 drop-shadow-lg">{category.title}</span>
                    <span className="text-white/80 text-sm bg-white/20 px-3 py-1 rounded-full">
                      {category.projects_count}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/70">
                    {category.name} category with {category.projects_count} MCP servers
                  </p>
                </div>
              </Link>
            );
          })}
      </div>

      <div className="w-full text-center">
        <h2 className="mx-auto font-bold text-3xl mt-16 mb-4">
          Featured MCP Servers
        </h2>
        {projects && <Projects projects={projects} />}
      </div>
    </div>
  );
}
