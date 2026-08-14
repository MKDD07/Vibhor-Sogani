import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "./Buttons";

const NAV = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Installations", path: "/installations" },
  { label: "FAQ", path: "/faq" },
  { label: "Press", path: "/press" },
  { label: "Contact", path: "/contact" },
];

export default function Header({ show }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved !== "light";
  });
  const logoRef = useRef(null);
  const location = useLocation();

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const [hideOnScroll, setHideOnScroll] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const isPressPage = location.pathname === "/press";
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      if (isPressPage) {
        const pressContainer = document.getElementById("press-container");
        if (pressContainer) {
          const rect = pressContainer.getBoundingClientRect();
          // When the bottom of the press grid section is reached / passed, show the header again
          if (rect.bottom <= 80) {
            setHideOnScroll(false);
            lastScrollY.current = currentScrollY;
            return;
          }
        }

        if (currentScrollY > 120 && currentScrollY > lastScrollY.current) {
          // Scrolling down inside press section -> hide header
          setHideOnScroll(true);
        } else {
          // Scrolling up or at top -> show header
          setHideOnScroll(false);
        }
      } else {
        setHideOnScroll(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (show && logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [show]);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 transform " +
        (hideOnScroll ? "-translate-y-full " : "translate-y-0 ") +
        (isDark
          ? scrolled
            ? "bg-ink/90 backdrop-blur-md py-4 sm:py-3"
            : "bg-ink/40 backdrop-blur-md py-5 sm:py-6"
          : scrolled
            ? "bg-white backdrop-blur-none py-4 sm:py-3 border-none shadow-none text-black"
            : "bg-white/95 backdrop-blur-none py-5 sm:py-6 border-none shadow-none text-black")
      }
    >
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 lg:px-10">
        <Link
          ref={logoRef}
          id="header-logo"
          to="/"
          className="flex items-center"
        >
          <img
            src="/logo.svg"
            alt="Vibhor Sogani"
            className={"h-8 w-auto object-contain transition-all duration-300 " + (isDark ? "brightness-0 invert" : "brightness-0")}
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={
                  "group relative text-[12px] uppercase tracking-wide-x transition-colors duration-300 " +
                  (isActive
                    ? "text-bronze font-semibold"
                    : isDark
                      ? "text-mute hover:text-parchment"
                      : "text-neutral-700 hover:text-black font-medium")
                }
              >
                {item.label}
                <span
                  className={
                    "absolute -bottom-1.5 left-0 h-px bg-bronze transition-all duration-300 " +
                    (isActive ? "w-full" : "w-0 group-hover:w-full")
                  }
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className={"flex items-center justify-center text-lg cursor-pointer " + (isDark ? "text-parchment" : "text-black")}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} />
          </button>
        </div>
      </div>

      <div
        className={
          "overflow-hidden transition-[max-height] duration-500 ease-in-out lg:hidden " +
          (open ? "max-h-96" : "max-h-0")
        }
      >
        <nav className={"flex flex-col gap-1 px-6 pb-6 pt-2 " + (isDark ? "bg-ink" : "bg-white")}>
          {NAV.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setOpen(false)}
                className={
                  "group relative w-fit py-3 text-sm uppercase tracking-wide-x transition-colors duration-300 " +
                  (isActive
                    ? "text-bronze font-semibold"
                    : isDark
                      ? "text-mute hover:text-parchment"
                      : "text-neutral-800 hover:text-black font-medium")
                }
              >
                {item.label}
                <span
                  className={
                    "absolute bottom-1.5 left-0 h-px bg-bronze transition-all duration-300 ease-out " +
                    (isActive ? "w-full" : "w-0 group-hover:w-full")
                  }
                />
              </Link>
            );
          })}

          {/* Social Links & Contact Button below Nav */}
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-mute/15 text-mute">
            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/vibhor_sogani"
                target="_blank"
                rel="noreferrer"
                className={isDark ? "text-mute hover:text-parchment transition-all duration-300 hover:scale-110" : "text-neutral-600 hover:text-black transition-all duration-300 hover:scale-110"}
                aria-label="Instagram"
                title="Follow on Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/vibhor-sogani"
                target="_blank"
                rel="noreferrer"
                className={isDark ? "text-mute hover:text-parchment transition-all duration-300 hover:scale-110" : "text-neutral-600 hover:text-black transition-all duration-300 hover:scale-110"}
                aria-label="LinkedIn"
                title="Connect on LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/vibhorsoganistudio"
                target="_blank"
                rel="noreferrer"
                className={isDark ? "text-mute hover:text-parchment transition-all duration-300 hover:scale-110" : "text-neutral-600 hover:text-black transition-all duration-300 hover:scale-110"}
                aria-label="Facebook"
                title="Follow on Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>

            {/* Contact Button */}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
            >
              <PrimaryButton className="!px-5 !py-2 !text-xs">
                Contact
              </PrimaryButton>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
