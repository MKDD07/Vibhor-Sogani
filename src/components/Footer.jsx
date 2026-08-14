import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const location = useLocation();
  const isInstallationPage = location.pathname.startsWith("/installations");
  const isHomePage = location.pathname === "/";
  // Exclude Index / Home page and Installations page (they render their own standalone sections)
  const showCompactNewsletter = !isHomePage && !isInstallationPage;
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved !== "light";
    return !window.matchMedia("(prefers-color-scheme: light)").matches;
  });

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    // Keep in sync if theme is changed from header or system preference changes
    const observer = new MutationObserver(() => {
      const isLightMode = document.documentElement.classList.contains("light-mode");
      setIsDark(!isLightMode);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleSystemChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setIsDark(!e.matches);
        if (e.matches) {
          document.documentElement.classList.add("light-mode");
        } else {
          document.documentElement.classList.remove("light-mode");
        }
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, []);

  useEffect(() => {
    const footerEl = footerRef.current;
    const contentEl = contentRef.current;
    if (!footerEl || !contentEl) return;

    // Disable parallax on mobile screens (< 768px)
    if (window.innerWidth < 768) {
      gsap.set(contentEl, { yPercent: 0, opacity: 1 });
      return;
    }

    // Direct parallax scrub on footer content as previous section scrolls away with 100% solid opacity (> 768px)
    const anim = gsap.fromTo(
      contentEl,
      { yPercent: -35, opacity: 1 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: footerEl,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full text-parchment select-none transition-colors relative z-30 overflow-hidden m-0 p-0 -mt-8 sm:-mt-12 pointer-events-auto bg-ink"
    >
      <div
        ref={contentRef}
        className="w-full will-change-transform rounded-t-3xl sm:rounded-t-[2.5rem] bg-surface-2 opacity-100 shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.8)] border-t border-x border-white/15 px-6 sm:px-12 lg:px-16 pt-16 sm:pt-20 pb-4 relative z-30 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[360px] relative z-10 space-y-16">
        
        {/* Upper Section: Studio Wordmark & Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Brand & Ethos + Left Studio Info */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/logo.svg"
                alt="Studio Vibhor Sogani"
                className="footer-logo h-8 w-auto object-contain brightness-0 invert opacity-95 hover:opacity-100 transition-all duration-300"
              />
            </Link>
            <p className="text-xs sm:text-[13px] font-light text-mute max-w-sm leading-relaxed tracking-wide">
              Sculpting monumental public landmarks, reflective stainless steel spatial works, and bespoke architectural art installations globally.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5 pt-1 text-mute">
              <a
                href="https://www.instagram.com/vibhor_sogani"
                target="_blank"
                rel="noreferrer"
                className="text-mute hover:text-parchment transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
                title="Follow on Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/vibhor-sogani"
                target="_blank"
                rel="noreferrer"
                className="text-mute hover:text-parchment transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
                title="Connect on LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/vibhorsoganistudio"
                target="_blank"
                rel="noreferrer"
                className="text-mute hover:text-parchment transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
                title="Follow on Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>

            {/* Studio Direct Contact & Location below social icons */}
            <div className="pt-4 space-y-2 text-xs font-light text-mute border-t border-white/10 max-w-xs">
              <p className="text-[10px] uppercase tracking-[0.25em] text-bronze-light font-medium">
                Studio &amp; Atelier
              </p>
              <p className="text-parchment/80">Gurugram, National Capital Region, India</p>
              <p>
                <a
                  href="mailto:info@vibhorsogani.com"
                  className="text-parchment/80 hover:text-bronze-light hover-underline transition-colors font-mono text-[11px]"
                >
                  info@vibhorsogani.com
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Newsletter Card + Navigation Below */}
          <div className={`${showCompactNewsletter ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-5 lg:col-start-8"} space-y-10`}>
            {/* Newsletter Card - Render on pages that don't have standalone newsletter */}
            {showCompactNewsletter && (
              <div className="w-full space-y-4 p-7 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/20">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-bronze-light font-medium">
                    Stay in the Loop
                  </span>
                  <span className="w-2 h-2 rounded-full bg-bronze/70 animate-pulse" />
                </div>
                <p className="text-xs text-mute font-light leading-relaxed">
                  Occasional notes on new monumental installations and international exhibitions.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you for subscribing to Studio Vibhor Sogani.");
                  }}
                  className="pt-2 relative flex items-center"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full bg-black/40 border border-white/15 rounded-full py-3 pl-5 pr-14 text-xs text-parchment placeholder:text-mute/60 focus:border-bronze-light focus:bg-black/60 focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-2 w-9 h-9 rounded-full bg-bronze/90 hover:bg-bronze text-ink flex items-center justify-center transition-all duration-300 hover:scale-105 group cursor-pointer shadow-md"
                  >
                    <svg
                      className="w-4 h-4 fill-current transform group-hover:translate-x-0.5 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </button>
                </form>
              </div>
            )}

            {/* Navigation Links - Positioned below with generous spacing */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-2 text-[11px] uppercase tracking-[0.25em] text-mute">
              <div className="space-y-3.5">
                <div><Link to="/about" className="hover:text-parchment hover-underline transition-colors">About</Link></div>
                <div><Link to="/installations" className="hover:text-parchment hover-underline transition-colors">Installations</Link></div>
              </div>
              <div className="space-y-3.5">
                <div><Link to="/press" className="hover:text-parchment hover-underline transition-colors">Press</Link></div>
                <div><Link to="/faq" className="hover:text-parchment hover-underline transition-colors">FAQ</Link></div>
              </div>
              <div className="space-y-3.5">
                <div><Link to="/contact" className="hover:text-parchment hover-underline transition-colors">Contact</Link></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Legal & Copyright */}
        <div className="border-t border-mute/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] uppercase tracking-[0.2em] text-mute/70">
          {/* Copyright & Legal Links */}
          <div className="flex flex-wrap items-center gap-4">
            <span>&copy; {new Date().getFullYear()} Vibhor Sogani</span>
            <span className="text-mute/30">&middot;</span>
            <Link to="/terms" className="hover:text-parchment hover-underline transition-colors">
              Terms
            </Link>
            <span className="text-mute/30">&middot;</span>
            <Link to="/privacy-policy" className="hover:text-parchment hover-underline transition-colors">
              Privacy
            </Link>
          </div>

          {/* Theme Mode Toggle Button (Hidden on < 768px, visible on md+) */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-[10px] tracking-[0.25em] lowercase text-mute/60 hidden sm:inline-block">
              {isDark ? "dark mode" : "light mode"}
            </span>
            <button
              onClick={toggleTheme}
              className={
                "flex h-9 w-9 items-center justify-center rounded-full transition-all cursor-pointer " +
                (isDark
                  ? "border border-white/15 bg-white/5 text-parchment hover:bg-bronze hover:border-bronze hover:text-ink"
                  : "border border-black/15 bg-black/5 text-black hover:bg-black hover:text-white")
              }
              aria-label="Toggle theme mode"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <FontAwesomeIcon
                icon={isDark ? faSun : faMoon}
                className="text-xs transition-transform duration-300 active:scale-90"
              />
            </button>
          </div>
        </div>
        </div>
    </div>
  </footer>
  );
}
