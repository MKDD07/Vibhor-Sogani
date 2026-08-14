import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Newsletter from "./Newsletter";

const FAQS = [
  {
    category: "Commissions & Monumental Sculptures",
    items: [
      {
        q: "What types of sculptures and public art does Studio Vibhor Sogani create?",
        a: "The studio specializes in monumental public art installations, site-specific stainless steel sculptures, dynamic architectural light installations, and bespoke spatial art commissions for municipal bodies, corporate headquarters, airports, luxury hospitality, and private collections globally."
      },
      {
        q: "How does the commission and concept design process work?",
        a: "Every project commences with deep contextual study, architectural dialogue, and site evaluation. Vibhor Sogani develops original exploratory sketches, parametric 3D visual models, and scale prototypes. Once approved, comprehensive engineering blueprints, structural calculations, and wind/seismic load simulations are developed for flawless execution."
      },
      {
        q: "What materials and fabrication techniques are utilized?",
        a: "We predominantly work with high-grade marine and architectural stainless steel (SS 304, SS 316), precision laser-cut metals, custom electro-polished finishes, specialized patinas, structural brass, and integrated precision architectural lighting systems engineered to endure harsh climatic environments."
      },
      {
        q: "Can the studio handle turnkey international installations?",
        a: "Yes. The studio manages turnkey installations worldwide — overseeing conceptual design, structural engineering, fabrication in our specialized state-of-the-art facility, global logistics/crating, on-site foundation anchoring, and final assembly with specialized installation crews."
      }
    ]
  },
  {
    category: "Exhibitions & Studio Inquiries",
    items: [
      {
        q: "Can studio artworks and gallery-scale sculptures be acquired for private collections?",
        a: "Yes. In addition to monumental public infrastructure sculptures, Vibhor Sogani creates limited-edition freestanding sculptures, wall installations, and luminous art objects for select private collectors, art consultants, and interior architects."
      },
      {
        q: "How can galleries, museums, or biennales collaborate for exhibitions?",
        a: "Institutions and curators interested in exhibiting monumental pieces, solo retrospectives, or site-responsive installations may connect with our curatorial liaison directly through our Contact page or via email at studio@sogani.design."
      },
      {
        q: "Where is the studio based and can visits be scheduled?",
        a: "Studio Vibhor Sogani is based in Gurugram (National Capital Region), India. Private studio viewings and client consultations can be scheduled by prior appointment."
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState("0-0");

  const toggleFAQ = (id) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-ink text-parchment pt-28 sm:pt-36 pb-24 px-6 lg:px-12 select-none">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-16 sm:mb-20 text-center sm:text-left">
        <span className="text-[11px] uppercase tracking-[0.3em] text-bronze font-semibold block mb-3">
          Studio Knowledge &amp; Inquiries
        </span>
        <h1 className="about-title font-display text-4xl sm:text-6xl font-light text-parchment leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-mute text-sm sm:text-base font-light leading-relaxed max-w-2xl">
          Everything you need to know about our commissioning process, structural engineering, monumental public sculptures, and gallery collaborations.
        </p>
      </div>

      {/* Accordion Categories */}
      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
        {FAQS.map((group, gIdx) => (
          <div key={group.category} className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.25em] text-bronze font-semibold border-b border-mute/20 pb-3">
              {group.category}
            </h2>

            <div className="space-y-4">
              {group.items.map((item, iIdx) => {
                const id = `${gIdx}-${iIdx}`;
                const isOpen = openIndex === id;

                return (
                  <div
                    key={item.q}
                    className="border-b border-mute/15 transition-colors duration-300"
                  >
                    <button
                      onClick={() => toggleFAQ(id)}
                      className="w-full py-5 flex items-center justify-between text-left gap-4 group cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className={`text-base sm:text-lg font-light transition-colors duration-300 ${isOpen ? "text-bronze-light font-normal" : "text-parchment group-hover:text-bronze-light"}`}>
                        {item.q}
                      </span>
                      <span className={`flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full border border-mute/25 text-xs transition-all duration-500 ease-out ${isOpen ? "bg-bronze border-bronze text-ink rotate-180 scale-110" : "text-mute group-hover:border-bronze"}`}>
                        <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
                      </span>
                    </button>

                    {/* Smooth Grid-Height Expand & Collapse Container */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mb-6"
                          : "grid-rows-[0fr] opacity-0 mb-0 pointer-events-none"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pr-4 sm:pr-8 text-sm sm:text-[15px] font-light leading-relaxed text-mute/90 pt-1">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
    </main>
  );
}
