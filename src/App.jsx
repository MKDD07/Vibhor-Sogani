import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./components/Loader";
import BarbaTransition from "./components/BarbaTransition";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import AboutPage from "./components/AboutPage";
import Installations from "./components/Installations";
import InstallationsPage from "./components/InstallationsPage";
import Timeline from "./components/Timeline";
import FAQPage from "./components/FAQPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import TermsPage from "./components/TermsPage";
import PressPage from "./components/PressPage";
import ContactPage from "./components/ContactPage";
import Newsletter from "./components/Newsletter";
import Contact from "./components/Contact";
import TeamSection from "./components/TeamSection";
import StudioBanner from "./components/StudioBanner";
import Footer from "./components/Footer";
import ScrollProgressButton from "./components/ScrollProgressButton";
import SEO from "./components/SEO";
import { initUniversalTextAnimations } from "./utils/textAnimations";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

// Main Full Landing Page View
function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <Installations />
      <Timeline />
      <TeamSection />
      <Newsletter />
      <Contact />
      <StudioBanner />
    </main>
  );
}

// Standalone Section Pages

function StandaloneInstallationsPage() {
  return (
    <main className="pt-24 min-h-screen">
      <Installations />
    </main>
  );
}

export default function App() {
  const [loading, setLoading] = useState(() => {
    // Only run main loader once per session
    return !sessionStorage.getItem("hasLoadedApp");
  });
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstLoad = useRef(true);

  const handleFinishLoading = () => {
    sessionStorage.setItem("hasLoadedApp", "true");
    setLoading(false);
  };

  // Barba page change transition: Curtain enters -> Page switches while covered -> Curtain exits (1s total)
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (loading) return;

    // 1. Trigger transition curtain
    setIsTransitioning(true);

    // 2. Switch route & reset scroll while fully covered by curtain (at 450ms)
    const switchTimer = setTimeout(() => {
      setDisplayLocation(location);
      window.scrollTo(0, 0);
      setTimeout(() => {
        ScrollTrigger.refresh();
        initUniversalTextAnimations();
      }, 100);
    }, 450);

    // 3. Complete 1s transition and sweep curtain out (at 1000ms)
    const finishTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);

    return () => {
      clearTimeout(switchTimer);
      clearTimeout(finishTimer);
    };
  }, [location.pathname]);

  useEffect(() => {
    // Disable smooth scroll on touch devices or screens smaller than 768px (tablets / mobile)
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isMobileWidth = window.innerWidth < 768;

    if (isTouchDevice || isMobileWidth) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.6,
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      smoothWheel: true,
      smoothTouch: false,
    });

    let stopTimeout = null;

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();

      // Dynamic scale reduction based on scroll velocity (down to 98%), excluding #home
      const velocity = Math.abs(e.velocity || 0);
      const targetScale = Math.max(0.98, 1 - Math.min(velocity * 0.0015, 0.02));

      gsap.to("main > section:not(#home)", {
        scale: targetScale,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Clear existing timeout when user is scrolling
      if (stopTimeout) clearTimeout(stopTimeout);

      // Return smoothly and slowly to 100% scale (scale: 1) when scroll stops
      stopTimeout = setTimeout(() => {
        gsap.to("main > section:not(#home)", {
          scale: 1,
          duration: 0.95,
          ease: "power2.out",
          overwrite: "auto",
        });
      }, 120);
    });

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (stopTimeout) clearTimeout(stopTimeout);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div data-barba="wrapper" className="bg-ink min-h-screen relative">
      <SEO />
      <BarbaTransition active={isTransitioning} />
      {loading && <Loader onFinish={handleFinishLoading} />}
      <div className="relative z-10">
        <Header show={!loading} />
        
        <div data-barba="container" data-barba-namespace={displayLocation.pathname} key={displayLocation.pathname}>
          <Routes location={displayLocation}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/installations" element={<InstallationsPage />} />
            <Route path="/installations/:slug" element={<InstallationsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </div>

        <Footer />
        <ScrollProgressButton />
      </div>
    </div>
  );
}
