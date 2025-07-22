"use client";

import { useEffect, useState } from "react";

import { FaGithub } from "react-icons/fa";
import StarIcon from "../../assets/imgs/star.svg";

export default function ({
  owner,
  repo,
  interval = 6000,
}: {
  owner: string;
  repo: string;
  interval: number;
}) {
  const [stars, setStars] = useState(0);

  const fetchStars = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'mcp-directory-app'
          }
        }
      );
      
      if (!response.ok) {
        console.warn(`GitHub API error: ${response.status} ${response.statusText}`);
        return;
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('GitHub API returned non-JSON response');
        return;
      }
      
      const data = await response.json();
      if (data && typeof data.stargazers_count === 'number') {
        setStars(data.stargazers_count);
      } else {
        console.warn('Invalid GitHub API response format');
      }
    } catch (error) {
      console.error("Error fetching star count:", error);
    }
  };

  useEffect(() => {
    fetchStars();
    const intervalId = setInterval(fetchStars, interval);
    return () => clearInterval(intervalId);
  }, [owner, repo, interval]);

  return (
    <a
      href="https://github.com/stvlynn/1stlab-mcp"
      target="_blank"
      className="hidden md:flex w-64 mx-auto items-center border border-white/30 bg-white/20 backdrop-blur-xl rounded-32 px-6 py-1.5 ml-4 cursor-pointer shadow-lg hover:bg-white/30 hover:border-white/40 transition-all duration-300"
    >
      <FaGithub className="text-white/80 w-8 h-8" />
      <div className="flex flex-col items-start ml-2">
        <div className="text-sm text-white/80 font-bold">
          Open-Source(
          <img
            src={StarIcon.src}
            alt="star"
            className="inline-block w-4 flex-none -mt-1"
          />
          {stars})
        </div>
        <div className="text-xs text-white/60 font-medium">
          stvlynn/1stlab-mcp
        </div>
      </div>
    </a>
  );
}
