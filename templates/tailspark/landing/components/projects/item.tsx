import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import { Project } from "@/types/project";
import StarIcon from "../../assets/imgs/star.svg";
import Stars from "../stars";
import moment from "moment";

export default ({ project }: { project: Project }) => {
  return (
    <Link
      href={
        project.target === "_blank"
          ? project.url || ""
          : `/server/${project.name}`
      }
      target={project.target || "_self"}
    >
      <div className="mb-6 gap-6 overflow-hidden rounded-32 border border-white/30 bg-white/20 backdrop-blur-xl p-8 text-left shadow-lg hover:shadow-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1 relative group">
        {/* Highlight border effect */}
        <div className="absolute inset-0 rounded-32 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-32 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="absolute inset-0 border border-white/20 rounded-32 group-hover:border-white/30 transition-colors duration-300"></div>
        </div>
        
        <div className="relative z-10">
          <div className="mb-4 flex flex-row">
            {project.avatar_url && (
              <LazyLoadImage
                src={project.avatar_url}
                placeholderSrc={`/logo.png`}
                alt={project.title}
                className="mr-4 inline-block h-16 w-16 object-cover rounded-full border-2 border-orange-500/50 group-hover:border-orange-500/70 transition-colors duration-300"
              />
            )}
            <div className="flex flex-col">
              <p className="text-base font-semibold text-orange-400 group-hover:text-orange-300 drop-shadow-lg">
                {project.title}
              </p>
              <p className="text-sm text-black/70 group-hover:text-black/90 transition-colors duration-300">
                {project.author_name}
              </p>
            </div>
          </div>
          <p className="mb-4 text-sm text-black/80 group-hover:text-black/90 transition-colors duration-300 line-clamp-3 drop-shadow-sm">
            {project.description}
          </p>

          <div className="flex items-center">
            {true && <Stars />}
            <div className="flex-1"></div>

            <p className="text-black/60 text-sm group-hover:text-black/80 transition-colors duration-300 drop-shadow-sm">
              {moment(project.created_at).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
