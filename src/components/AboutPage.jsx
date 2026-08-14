import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "./About";
import TeamSection from "./TeamSection";
import StudioBanner from "./StudioBanner";
import Newsletter from "./Newsletter";

gsap.registerPlugin(ScrollTrigger);

const EXHIBITION_COUNTRIES = [
  { country: "Netherlands", city: "Amsterdam & The Hague" },
  { country: "Australia", city: "Sydney & Melbourne" },
  { country: "Zimbabwe", city: "Harare" },
  { country: "Tanzania", city: "Dar es Salaam" },
  { country: "South Africa", city: "Johannesburg & Cape Town" },
  { country: "Germany", city: "Frankfurt & Berlin" },
  { country: "Denmark", city: "Copenhagen" },
  { country: "India & Gulf", city: "Delhi, Mumbai, Dubai" },
];

const HONORS_LIST = [
  {
    year: "2025",
    title: "Lifetime Design Excellence Award",
    organization: "Distinguished Juried Council",
    description: "Honored for remarkable contributions to contemporary public art and spatial design leadership.",
  },
  {
    year: "2014",
    title: "Indian Art Icon of the Year",
    organization: "Singapore Arts Forum",
    description: "Celebrated in Singapore for monumental light & steel architectural landmarks globally.",
  },
  {
    year: "Govt. Nominee",
    title: "Governing Body Nominee",
    organization: "Indian Design Council (Govt. of India)",
    description: "Nominated by the Government of India as a member of the governing body to steer national design initiatives.",
  },
  {
    year: "Keynote",
    title: "Key Speaker & Juror",
    organization: "Global Architectural & Art Summits",
    description: "Invited speaker and panelist at prominent institutes, design weeks, and international juries.",
  },
];

export default function AboutPage() {
  const bioRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient flare parallax scrub (only for > 768px)
      if (window.innerWidth >= 768) {
        gsap.to(".about-ambient-flare", {
          y: -120,
          scale: 1.25,
          ease: "none",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Bio Cards - Dynamic Stacking Cards Animation
      const bioCards = gsap.utils.toArray(".bio-block");
      bioCards.forEach((card, index) => {
        if (index < bioCards.length - 1) {
          gsap.to(card, {
            scale: 0.93,
            opacity: 0.35,
            filter: "blur(3px)",
            ease: "none",
            scrollTrigger: {
              trigger: bioCards[index + 1],
              start: "top 60%",
              end: "top 25%",
              scrub: true,
            },
          });
        }

        gsap.fromTo(
          card,
          { opacity: index === 0 ? 1 : 0.4, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.5,
            },
          }
        );
      });

      // Honors Cards Reveal
      gsap.fromTo(
        ".honor-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-ink min-h-screen text-parchment select-none">
      
      {/* Hero Header Section */}
      <section className="relative pt-36 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-4xl space-y-6">
          <span className="text-[11px] uppercase tracking-[0.3em] text-bronze-light font-semibold block">
            Profile &amp; Vision
          </span>
          <h1 className="about-title-words font-display text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.1] text-parchment">
            Art is not just to be seen; it transforms the spaces we inhabit.
          </h1>
          <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl border-l-2 border-bronze pl-6 my-6">
            It crafts narratives through light, steel, and space, inviting viewers to connect with their surroundings in meaningful ways.
          </p>
        </div>
      </section>

      {/* Main Core About Numbers & Ethos */}
      <About />

      {/* Structured Editorial Chapters Section with Large Quote Icon & Borderless Stacking Cards */}
      <section ref={bioRef} className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-ink via-surface/40 to-ink">
        {/* Subtle Ambient Background Light Flares */}
        <div className="about-ambient-flare absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />
        <div className="about-ambient-flare absolute bottom-10 right-10 w-80 h-80 bg-ember/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          
          {/* Top Large Quote Banner - Clean luxury presentation with large quote icon */}
          <div className="mb-24 py-8 relative">
            <div className="flex items-start gap-6 sm:gap-8">
              {/* Large Bronze Quote Icon */}
              <div className="text-bronze/40 select-none flex-shrink-0 -mt-2">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 fill-current" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="space-y-4 max-w-4xl">
                <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-bronze-light font-semibold block">
                  Core Philosophy &amp; Vision
                </span>
                <blockquote className="about-title-lift font-display text-2xl sm:text-3xl lg:text-4xl text-parchment font-light leading-snug">
                  Art is not just to be seen; it transforms the spaces we inhabit. It crafts narratives through light, steel, and space, inviting viewers to connect with their surroundings in meaningful ways.
                </blockquote>
                <p className="text-xs uppercase tracking-[0.25em] text-bronze font-medium pt-2">
                  &mdash; Vibhor Sogani &middot; Artist &amp; Designer
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Full-width Header Column: Chapter Index */}
            <div className="lg:col-span-12 space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-bronze-light font-semibold">
                  Artistic Biography
                </span>
              </div>
              
              <h2 className="about-title-lift font-display text-3xl sm:text-5xl text-parchment font-light leading-tight">
                Sculpting Light, Steel &amp; Public Space
              </h2>
              
              <p className="text-sm sm:text-base text-mute font-light leading-relaxed">
                From intimate studio models to monumental civic landmarks spread over acres of urban landscape.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-widest text-mute font-mono">
                  1998 &mdash; Present
                </span>
              </div>
            </div>

            {/* Full-width Cards Column: Stacking Editorial Bio Cards with Real Assets */}
            <div className="lg:col-span-12 space-y-16 relative">
              
              {/* Section 01: Overview */}
              <div className="bio-block sticky top-28 group relative p-6 sm:p-10 rounded-3xl bg-[#15130e] backdrop-blur-xl transition-all duration-500 shadow-2xl origin-top">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface">
                    <img
                      src="/images/about/about_0002.jpg"
                      alt="Vibhor Sogani - Overview"
                      className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
                  </div>

                  <div className="md:col-span-7 space-y-4 text-neutral-300 text-sm sm:text-[15px] leading-relaxed font-light">
                    <h3 className="font-display text-2xl sm:text-3xl text-parchment font-normal">
                      Overview
                    </h3>
                    <p>
                      <strong className="text-parchment font-medium">Vibhor Sogani</strong> is an internationally acclaimed Indian artist and designer, known for his large-scale public art installations that explore the interplay of light, space, and culture. Born in Jaipur, he has been living and working in New Delhi for over 25 years, crafting narratives through light and steel sculptures.
                    </p>
                    <p>
                      Educated at the premier <span className="text-bronze-light font-medium">National Institute of Design (NID), India</span>, Sogani’s works aim to transform urban environments, inviting viewers to connect with their surroundings in meaningful ways.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 02: Vision & Artistic Philosophy */}
              <div className="bio-block sticky top-28 group relative p-6 sm:p-10 rounded-3xl bg-[#15130e] backdrop-blur-xl transition-all duration-500 shadow-2xl origin-top">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface md:order-2">
                    <img
                      src="/images/about/about_0003.jpg"
                      alt="Vibhor Sogani - Vision & Artistic Philosophy"
                      className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
                  </div>

                  <div className="md:col-span-7 space-y-4 text-neutral-300 text-sm sm:text-[15px] leading-relaxed font-light md:order-1">
                    <h3 className="font-display text-2xl sm:text-3xl text-parchment font-normal">
                      Vision &amp; Artistic Philosophy
                    </h3>
                    <p>
                      Sogani’s art engages with space, environment, and community. His creations often use stainless steel and reflective surfaces to interact with light and surroundings, transforming public spaces into dynamic, contemplative experiences.
                    </p>
                    <p>
                      His philosophy emphasizes accessibility, site-specific expression, and a connection between tradition and contemporary aesthetics, making urban environments more vibrant and meaningful.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 03: Global Recognition & Exhibitions */}
              <div className="bio-block sticky top-28 group relative p-6 sm:p-10 rounded-3xl bg-[#15130e] backdrop-blur-xl transition-all duration-500 shadow-2xl origin-top">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface">
                    <img
                      src="/images/about/about_0004.jpg"
                      alt="Vibhor Sogani - Global Recognition & Exhibitions"
                      className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
                  </div>

                  <div className="md:col-span-7 space-y-4 text-neutral-300 text-sm sm:text-[15px] leading-relaxed font-light">
                    <h3 className="font-display text-2xl sm:text-3xl text-parchment font-normal">
                      Global Recognition &amp; Exhibitions
                    </h3>
                    <p>
                      Vibhor’s works have been exhibited internationally in countries such as <span className="text-bronze-light font-medium">Netherlands, Australia, Zimbabwe, Tanzania, South Africa, Germany, and Denmark</span>. His public art installations resonate with both local communities and global audiences.
                    </p>
                    <p>
                      He has been invited as a keynote speaker and juror for prestigious design forums and conferences, sharing his insights on art, design, and public engagement.
                    </p>
                  </div>
                </div>

                {/* Country badges list */}
                <div className="mt-6 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {EXHIBITION_COUNTRIES.map((c, i) => (
                    <div key={i} className="p-3 rounded-lg bg-surface/50 text-center">
                      <p className="text-xs text-parchment font-medium">{c.country}</p>
                      <p className="text-[10px] text-mute">{c.city}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 04: Awards & Leadership */}
              <div className="bio-block sticky top-28 group relative p-6 sm:p-10 rounded-3xl bg-[#15130e] backdrop-blur-xl transition-all duration-500 shadow-2xl origin-top">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface md:order-2">
                    <img
                      src="/images/about/about_0005.jpg"
                      alt="Vibhor Sogani - Awards & Leadership"
                      className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
                  </div>

                  <div className="md:col-span-7 space-y-4 text-neutral-300 text-sm sm:text-[15px] leading-relaxed font-light md:order-1">
                    <h3 className="font-display text-2xl sm:text-3xl text-parchment font-normal">
                      Awards &amp; Leadership
                    </h3>
                    <p>
                      Vibhor Sogani has received several accolades, including the <span className="text-bronze-light font-medium">Lifetime Design Excellence Award (2025)</span> and <span className="text-bronze-light font-medium">Indian Art Icon of the Year 2014</span>. He serves as a member of the governing body of the Indian Design Council.
                    </p>
                    <p>
                      His works continue to inspire and shape public art practice globally, blending creativity, culture, and community engagement.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Honors & Government Nominations Grid - Clean Borderless Typography Cards */}
      <section ref={cardsRef} className="py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-bronze font-semibold block mb-3">
              Recognition &amp; Leadership
            </span>
            <h2 className="about-title-lift font-display text-3xl sm:text-5xl font-light text-parchment">
              Honors, Awards &amp; Appointments
            </h2>
            <p className="text-mute text-sm sm:text-base mt-4 font-light leading-relaxed">
              Recipient of distinguished honors, juror for international summits, and nominated member of the governing body of the Indian Design Council by the Government of India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HONORS_LIST.map((h, i) => (
              <div
                key={i}
                className="honor-card relative p-8 rounded-2xl bg-surface-2/30 hover:bg-surface-2/50 transition-all duration-500 overflow-hidden group shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono font-medium text-bronze-light">
                      {h.year}
                    </span>
                    <span className="text-mute/30">&middot;</span>
                    <span className="text-xs text-mute uppercase tracking-widest font-mono">
                      {h.organization}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display text-parchment font-normal group-hover:text-bronze-light transition-colors">
                    {h.title}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {h.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <TeamSection />

      {/* Sister Studio Banner (sogani.design) & Newsletter */}
      <StudioBanner />

    </div>
  );
}
