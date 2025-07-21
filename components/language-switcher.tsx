"use client";

import { useLanguage } from "@/providers/language";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, LanguageIcon } from "@heroicons/react/24/outline";

export default function LanguageSwitcher() {
  const { currentLanguage, availableLanguages, setLanguage } = useLanguage();
  
  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-32 bg-white/20 backdrop-blur-xl border border-white/30 px-3 py-2 text-sm font-semibold text-black/80 shadow-lg hover:bg-white/30 transition-all duration-300">
          <LanguageIcon className="h-5 w-5 text-orange-400" aria-hidden="true" />
          <span className="hidden sm:inline">
            {currentLang?.flag} {currentLang?.name}
          </span>
          <span className="sm:hidden">
            {currentLang?.flag}
          </span>
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-black/60" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-32 bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg focus:outline-none">
          <div className="py-1">
            {availableLanguages.map((language) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    onClick={() => setLanguage(language.code)}
                    className={`${
                      active
                        ? "bg-white/30 text-black/90"
                        : "text-black/70"
                    } ${
                      currentLanguage === language.code
                        ? "bg-orange-400/20 text-orange-400"
                        : ""
                    } group flex w-full items-center px-4 py-2 text-sm hover:bg-white/30 transition-all duration-300`}
                  >
                    <span className="mr-3">{language.flag}</span>
                    {language.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}