import React from "react";

const TEAM_MEMBERS = [
  {
    name: "Vibhor Sogani",
    role: "Artist and Designer",
    image: "/images/about/about_0002.jpg",
    bio: "Pioneering monumental public art sculptures and spatial light installations across India and the globe. An alumnus of NID Ahmedabad, sculpting narratives through steel and light.",
  },
  {
    name: "Navdeep Sogani",
    role: "Founder / Director",
    image: "/images/about/about_0003.png",
    bio: "Directing the studio's strategic vision, international commissions, institutional liaisons, and architectural design practice expansion worldwide.",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-ink relative select-none">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[11px] uppercase tracking-[0.3em] text-bronze font-semibold block mb-3">
            Our Team
          </span>
          <h2 className="about-title-lift font-display text-3xl sm:text-5xl font-light text-parchment leading-tight">
            Meet the creative minds behind our vision.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-mute font-light leading-relaxed">
            Crafting experiences that inspire and transform.
          </p>
        </div>

        {/* 2-Column Team Cards Grid - No borders, Large top image, Bottom text layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="group relative flex flex-col rounded-3xl bg-surface-2/30 hover:bg-surface-2/50 transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Large Top Member Portrait (No Border, Rounded) */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-2xl bg-surface">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
              </div>

              {/* Bottom Member Text Content */}
              <div className="space-y-3">
                <h3 className="font-display text-2xl sm:text-3xl text-parchment font-medium group-hover:text-bronze-light transition-colors">
                  {member.name}
                </h3>
                
                <p className="text-xs uppercase tracking-widest text-bronze font-medium">
                  {member.role}
                </p>
                
                <p className="text-sm text-neutral-300 leading-relaxed font-light pt-2">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
