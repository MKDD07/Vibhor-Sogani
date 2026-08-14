import React, { useState, useEffect, useRef } from "react";
import { PrimaryButton } from "./Buttons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INTEREST_TOPICS = [
  "Public Monuments",
  "Spatial Lighting",
  "Exhibitions",
  "Studio Updates",
];

export default function Newsletter({
  showImage = true,
  withFlares = true,
  withTopics = false,
  layout = "side-by-side",
  variant = "default",
  overlayOpacity = 0.75,
}) {
  const [email, setEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState(["Public Monuments"]);
  const [sent, setSent] = useState(false);
  const sectionRef = useRef(null);
  const bgImgRef = useRef(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const bg = bgImgRef.current;
    if (!sec || !bg || !showImage) return;

    // Disable parallax on mobile screens (< 768px)
    if (window.innerWidth < 768) {
      gsap.set(bg, { yPercent: 0, scale: 1 });
      return;
    }

    // Parallax movement for background image (> 768px)
    const anim = gsap.fromTo(
      bg,
      { yPercent: -15, scale: 1.15 },
      {
        yPercent: 15,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [showImage]);

  const toggleInterest = (topic) => {
    setSelectedInterests((prev) =>
      prev.includes(topic)
        ? prev.length > 1
          ? prev.filter((t) => t !== topic)
          : prev
        : [...prev, topic]
    );
  };

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  if (variant === "card") {
    return (
      <section
        id="newsletter"
        ref={sectionRef}
        className="relative my-16 select-none"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-2/90 via-surface to-ink border border-white/10 p-8 sm:p-14 backdrop-blur-2xl shadow-2xl">
          {/* Subtle Accent Ambient Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-bronze/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-ember/15 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bronze/10 border border-bronze/30">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
                <span className="text-[11px] uppercase tracking-wide-x text-bronze-light font-semibold">
                  Studio Dispatch
                </span>
              </div>
              <h2 className="about-title-lift font-display text-2xl sm:text-4xl text-parchment font-light leading-snug">
                Stay updated with monumental works &amp; international exhibitions.
              </h2>
              <p className="text-sm text-neutral-300 font-light leading-relaxed max-w-lg">
                Receive curated monthly journal dispatches and private view invitations directly from Studio Vibhor Sogani.
              </p>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-5">
              {sent ? (
                <div className="p-6 rounded-2xl bg-ink/70 border border-bronze/40 text-center">
                  <p className="font-display text-lg text-bronze-light">
                    You&rsquo;re on the list &mdash; welcome.
                  </p>
                  <p className="text-xs text-mute mt-1">Check your inbox soon for the next studio dispatch.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full flex-1 rounded-full border border-white/20 bg-ink/90 px-6 py-3.5 text-sm text-parchment placeholder:text-neutral-500 focus:border-bronze focus:outline-none transition-colors"
                  />
                  <PrimaryButton type="submit" className="justify-center whitespace-nowrap">
                    Subscribe
                  </PrimaryButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className={`relative bg-ink py-24 lg:py-32 overflow-hidden select-none ${showImage ? "rounded-2xl" : ""}`}
    >
      {/* Background Banner Image Layer with Configurable Overlay */}
      {showImage && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl">
          <img
            src="/images/banner/newsletter-banner.png"
            alt="Studio Background Banner"
            className="w-full h-full object-cover object-center"
          />
          {/* Configurable Dark Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{ backgroundColor: `rgba(11, 10, 8, ${overlayOpacity})` }}
          />
        </div>
      )}

      {/* Subtle Glow Flares */}
      {withFlares && (
        <>
          <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-bronze/15 blur-3xl z-0" />
          <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-ember/10 blur-3xl z-0" />
        </>
      )}

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {layout === "center" ? (
          /* Center Layout */
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase tracking-wide-x text-bronze-light font-semibold block">
              Stay in the Loop
            </span>
            <h2 className="about-title-lift font-display text-3xl sm:text-5xl leading-tight text-parchment font-light">
              New work, first &mdash; straight from the studio.
            </h2>
            <p className="mx-auto max-w-md text-sm sm:text-base leading-relaxed text-neutral-300 font-light">
              Occasional notes on new installations, exhibitions and press. No noise, unsubscribe anytime.
            </p>

            {sent ? (
              <p className="mt-8 font-display text-xl text-bronze-light">
                You&rsquo;re on the list &mdash; welcome.
              </p>
            ) : (
              <form
                onSubmit={submit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full flex-1 rounded-full border border-white/20 bg-surface-2/80 backdrop-blur-md px-6 py-3.5 text-sm text-parchment placeholder:text-neutral-400 focus:border-bronze focus:outline-none transition-colors"
                />
                <PrimaryButton type="submit" className="justify-center whitespace-nowrap">
                  Subscribe
                </PrimaryButton>
              </form>
            )}
          </div>
        ) : (
          /* Side-by-Side Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <h2 className="about-title-lift font-display text-3xl sm:text-5xl leading-tight text-parchment font-light">
                New work, first &mdash; straight from the studio.
              </h2>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6">
              {sent ? (
                <div className="p-8 rounded-2xl bg-surface-2/80 border border-bronze/30 backdrop-blur-md">
                  <p className="font-display text-2xl text-bronze-light">
                    You&rsquo;re on the list &mdash; welcome.
                  </p>
                  {withTopics && (
                    <p className="text-xs text-mute mt-3 leading-relaxed">
                      We&rsquo;ll tailor studio updates for: <span className="text-parchment font-medium">{selectedInterests.join(", ")}</span>.
                    </p>
                  )}
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  className="p-8 rounded-3xl bg-surface-2/60 backdrop-blur-xl shadow-2xl space-y-5"
                >
                  <span className="text-xs uppercase tracking-wide-x text-bronze-light font-semibold block">
                    Stay in the Loop
                  </span>
                  {withTopics && (
                    <div>
                      <label className="text-[11px] uppercase font-mono tracking-widest text-mute block mb-3">
                        Select Your Interests
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {INTEREST_TOPICS.map((topic) => {
                          const active = selectedInterests.includes(topic);
                          return (
                            <button
                              key={topic}
                              type="button"
                              onClick={() => toggleInterest(topic)}
                              className={`text-[11px] uppercase tracking-wider font-mono px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                active
                                  ? "bg-bronze text-ink font-medium shadow-md shadow-bronze/20 scale-105"
                                  : "bg-ink/60 text-mute border border-white/10 hover:border-bronze/40 hover:text-parchment"
                              }`}
                            >
                              {active ? `✓ ${topic}` : `+ ${topic}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full flex-1 rounded-full border border-white/20 bg-ink/80 px-6 py-3.5 text-sm text-parchment placeholder:text-neutral-500 focus:border-bronze focus:outline-none transition-colors"
                    />
                    <PrimaryButton type="submit" className="justify-center whitespace-nowrap">
                      Subscribe
                    </PrimaryButton>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-neutral-300 font-light max-w-lg">
                    Occasional notes on new public monumental installations, gallery exhibitions, and press editorials. No noise, unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
