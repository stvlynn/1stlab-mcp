"use client";

export default function ProjectSkeleton() {
  return (
    <div className="mb-4 break-inside-avoid rounded-xl bg-white p-6 shadow-sm border border-gray-100 animate-pulse">
      <div className="flex items-start space-x-4">
        {/* Avatar skeleton */}
        <div className="h-12 w-12 rounded-lg bg-gray-200"></div>
        
        {/* Content skeleton */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-5 w-32 rounded bg-gray-200"></div>
              <div className="h-4 w-24 rounded bg-gray-200"></div>
            </div>
            <div className="h-5 w-16 rounded bg-gray-200"></div>
          </div>
          
          {/* Description skeleton */}
          <div className="mt-3 space-y-2">
            <div className="h-4 w-full rounded bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
          </div>
          
          {/* Tags skeleton */}
          <div className="mt-4 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-gray-200"></div>
            <div className="h-6 w-20 rounded-full bg-gray-200"></div>
            <div className="h-6 w-12 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}