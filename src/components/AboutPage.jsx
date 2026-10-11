import React, { useEffect, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const ExhibitionMap = lazy(() => import("./ExhibitionMap"));

const PRACTICE = [
  { title: "Material", text: "Stainless steel becomes a surface for reflection. Light, landscape, and the viewer become part of the work, changing its appearance throughout the day." },
  { title: "Scale", text: "The practice moves from intimate sculptural objects to monumental installations, bringing an industrial design sensibility to the possibilities of public art." },
  { title: "Place", text: "Each installation responds to its surroundings. Organic forms and cultural references create a connection between the work, its setting, and the people who encounter it." },
];
const RECOGNITION = [
  { label: "2025", title: "Lifetime Design Excellence Award", detail: "Recognition of a sustained contribution to art and design." },
  { label: "2014", title: "Indian Art Icon of the Year", detail: "Singapore" },
  { label: "Appointment", title: "Indian Design Council", detail: "Nominated by the Government of India to the governing body." },
];

export default function AboutPage() {
  const pageRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.artist-reveal').forEach((element) => {
          gsap.from(element, {
            y: 22, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 92%', once: true },
          });
        });
        gsap.fromTo(imageRef.current, { yPercent: -4 }, {
          yPercent: 4, ease: 'none',
          scrollTrigger: { trigger: imageRef.current.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }, pageRef);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <main ref={pageRef} className="artist-profile bg-ink text-parchment">
      <section className="site-container pb-20 pt-32 lg:pb-28 lg:pt-40">
        <div className="artist-reveal mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-parchment/15 pb-5">
          <span className="text-[11px] uppercase tracking-[0.22em] text-bronze">The artist</span>
          <span className="text-[11px] uppercase tracking-[0.16em] text-mute">New Delhi, India</span>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div className="artist-reveal lg:pt-10">
            <h1 className="page-heading font-display tracking-tight">Vibhor<br />Sogani</h1>
            <span className="mt-7 block text-xs uppercase tracking-[0.2em] text-bronze">Artist | Designer</span>
            <p className="mt-10 max-w-lg font-display text-2xl leading-snug text-parchment/90 sm:text-3xl">A practice shaped by light, reflection, and the life of public space.</p>
            <p className="site-prose artist-body mt-7 max-w-lg">Born in Jaipur and based in New Delhi, Vibhor Sogani works across sculpture, light art, and large-scale public installations. His work explores the relationship between material, nature, and the spaces we share.</p>
            <Link to="/installations" className="group mt-9 inline-flex items-center gap-6 border-b border-parchment/30 pb-3 text-xs uppercase tracking-[0.16em] transition-colors hover:border-bronze hover:text-bronze">
              Explore the works <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <figure className="artist-reveal">
            <div className="aspect-[3/4] overflow-hidden bg-surface">
              <img src="/images/about/about_0002.webp" alt="Vibhor Sogani beside a reflective steel artwork" className="h-full w-full object-cover" fetchPriority="high" />
            </div>
            <figcaption className="mt-4 text-[10px] uppercase tracking-[0.15em] text-mute">Vibhor Sogani | Portrait</figcaption>
          </figure>
        </div>
      </section>

      <section className="site-container pb-20 lg:pb-28" aria-labelledby="biography-heading">
        <div className="artist-reveal grid gap-8 border-t border-parchment/15 pt-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <h2 id="biography-heading" className="text-[11px] uppercase tracking-[0.22em] text-bronze">Background &amp; practice</h2>
          <div className="grid gap-7 md:grid-cols-2 md:gap-12">
            <p className="site-prose artist-body">Educated in Industrial Design at the National Institute of Design, Sogani brings an understanding of structure and fabrication to a practice grounded in instinct and organic form. Over more than two decades, his work has moved between the scale of an object and the scale of a city.</p>
            <p className="site-prose artist-body">His public installations include Sprouts in New Delhi and Joy at Dubai Creek Harbour. Reflective surfaces invite people to see themselves and their surroundings within the work, making each encounter a part of its expression.</p>
          </div>
        </div>
      </section>

      <section className="site-container " aria-label="Studio and light art">
        <figure className="artist-reveal">
          <div className="relative aspect-[4/3] overflow-hidden bg-surface sm:aspect-[16/9] lg:aspect-[2/1]">
            <img ref={imageRef} src="/images/about/about_0003.jpg" alt="Vibhor Sogani surrounded by sculptural lighting and metal artworks" loading="lazy" className="absolute -top-[6%] h-[112%] w-full object-cover" />
          </div>
          <figcaption className="mt-4 flex flex-wrap justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-mute"><span>Light, material &amp; the studio</span><span>Studio Vibhor Sogani</span></figcaption>
        </figure>
      </section>

      <section className="site-container py-20 lg:py-28" aria-labelledby="approach-heading">
        <div className="artist-reveal grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-16">
          <span className="text-[11px] uppercase tracking-[0.22em] text-bronze">The approach</span>
          <h2 id="approach-heading" className="section-heading max-w-2xl font-display text-4xl leading-tight sm:text-5xl">The work begins with a dialogue between form and place.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12 lg:mt-16">
          {PRACTICE.map((item) => <div key={item.title} className="artist-reveal border-t border-parchment/20 pt-6"><h3 className="font-display text-3xl">{item.title}</h3><p className="site-prose artist-body mt-5">{item.text}</p></div>)}
        </div>
      </section>

      <section className="site-container pb-20 lg:pb-28" aria-labelledby="recognition-heading">
        <div className="grid gap-10 border-t border-parchment/15 pt-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <div className="artist-reveal"><span className="text-[11px] uppercase tracking-[0.22em] text-bronze">Recognition</span><h2 id="recognition-heading" className="section-heading mt-4 font-display text-3xl">An international practice</h2></div>
          <div>
            {RECOGNITION.map((item) => <div key={item.title} className="artist-reveal grid gap-3 border-b border-parchment/15 py-6 first:pt-0 sm:grid-cols-[100px_1fr] sm:gap-6"><span className="pt-1 text-xs text-mute">{item.label}</span><div><h3 className="font-display text-2xl sm:text-3xl">{item.title}</h3><p className="site-prose artist-body mt-2">{item.detail}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="w-full pb-20 lg:pb-28" aria-labelledby="exhibitions-heading">
        <header className="site-container artist-reveal text-center">
          <span className="text-[11px] uppercase tracking-[0.22em] text-bronze">Across borders</span>
          <h2 id="exhibitions-heading" className="section-heading mt-4 font-display text-4xl sm:text-5xl">International exhibitions</h2>
        </header>
        <Suspense fallback={<div className="aspect-[800/440]" aria-label="Loading exhibition map" />}><ExhibitionMap /></Suspense>
      </section>
    </main>
  );
}
