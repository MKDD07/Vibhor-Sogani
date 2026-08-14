import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ScrollProgressButton() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark") || 
      (!document.documentElement.classList.contains("light"));
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
        setScrollProgress(progress);
      }

      setIsVisible(currentScroll > 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG Circle calculations (radius 18, circumference = 2 * PI * 18 ≈ 113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-16 sm:bottom-8 right-5 sm:right-8 z-50 flex flex-col items-center gap-2.5 transition-all duration-500 select-none ${
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Theme Toggle Button next to / right on top of Back to Top on Mobile (< 768px) */}
      <button
        onClick={toggleTheme}
        className="flex md:hidden h-9 w-9 items-center justify-center rounded-full transition-all cursor-pointer border border-white/15 bg-ink/90 backdrop-blur-md text-parchment hover:bg-bronze hover:border-bronze hover:text-ink shadow-lg active:scale-90"
        aria-label="Toggle theme mode"
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <FontAwesomeIcon
          icon={isDark ? faSun : faMoon}
          className="text-xs transition-transform duration-300"
        />
      </button>

      {/* Back to Top Button with Circular Scroll Progress */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="relative flex items-center justify-center w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-[#15130e]/85 backdrop-blur-md border border-white/10 hover:border-bronze shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
        title={`Scroll to top (${Math.round(scrollProgress)}%)`}
      >
        {/* SVG Circular Scroll Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 p-1" viewBox="0 0 44 44">
          {/* Subtle Background Track */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-white/10 fill-none"
            strokeWidth="2"
          />
          {/* Dynamic Fill Progress Ring */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-bronze fill-none transition-all duration-150 ease-out"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Minimal Up Arrow & Hover Tooltip */}
        <svg
          className="w-4 h-4 text-parchment/80 group-hover:text-bronze transition-transform duration-300 group-hover:-translate-y-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}
