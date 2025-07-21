"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/language";
import { RiSendPlaneFill } from "react-icons/ri";

interface Props {
  query?: string;
}

export default ({ query }: Props) => {
  const router = useRouter();
  const { tGeneral } = useLanguage();
  const [inputDisabled, setInputDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [content, setContent] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        handleSubmit("", content);
      }
    }
  };

  const handleSubmit = async (keyword: string, question: string) => {
    try {
      const url = `?q=${encodeURIComponent(question)}`;
      console.log("query url", url);
      await router.push(url);
      setInputDisabled(true); // Disable input after navigation
    } catch (e) {
      console.log("search failed: ", e);
      setInputDisabled(false);
    }
  };

  useEffect(() => {
    if (query) {
      setContent(query);
      setInputDisabled(false);
    }
  }, [query]);

  return (
    <section className="relative mt-4 md:mt-8">
      <div className="mx-auto w-full max-w-2xl px-6 text-center">
        <form
          method="POST"
          action="/gpts/search"
          className="flex items-center relative"
        >
          <input
            type="text"
            className="text-sm md:text-md flex-1 px-4 py-3 rounded-32 bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg text-black/80 placeholder-black/50 disabled:border-gray-300/50 disabled:text-gray-400 focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-300"
            placeholder={tGeneral('search.placeholder')}
            ref={inputRef}
            value={content}
            disabled={inputDisabled}
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
          />
          <RiSendPlaneFill
            className="absolute right-4 cursor-pointer text-black/70 hover:text-orange-400 transition-colors duration-300 w-4 h-4"
            onClick={() => {
              if (content) {
                handleSubmit("", content);
              }
            }}
          />
        </form>
      </div>
    </section>
  );
};
