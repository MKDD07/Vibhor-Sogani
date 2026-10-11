import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "./Buttons";

export default function Contact() {
  const [state, handleSubmit] = useForm("xjybolld");

  return (
    <section id="contact" className="py-24 lg:py-32 relative select-none">
      <div className="site-container ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Minimal Editorial Typography */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-wide-x text-bronze font-semibold block">
              Inquiries &amp; Commissions
            </span>
            <h2 className="about-title-lift font-display text-3xl sm:text-5xl font-light text-parchment leading-tight">
              Let’s create something extraordinary.
            </h2>
            <p className="text-mute text-sm sm:text-base font-light leading-relaxed max-w-md">
              For monumental public sculptures, bespoke architectural lighting, or exhibition inquiries, contact the studio directly.
            </p>

            <div className="pt-6 space-y-3 text-sm text-neutral-400 font-light border-t border-white/10 max-w-xs">
              <p>
                <span className="text-white font-medium block">Studio Vibhor Sogani</span>
                Gurugram, National Capital Region, India
              </p>
              <p>
                <a
                  href="mailto:studio@sogani.design"
                  className="text-bronze-light hover:text-white transition-colors"
                >
                  studio@sogani.design
                </a>
              </p>
            </div>
          </div>

          {/* Right: Clean Minimal Border-Bottom Form with Formspree */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-transparent border-0 border-b border-mute/30 pb-3 text-sm text-parchment placeholder:text-mute/50 focus:border-bronze focus:outline-none transition-colors"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs text-rose-400 mt-1 block" />
                </div>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full bg-transparent border-0 border-b border-mute/30 pb-3 text-sm text-parchment placeholder:text-mute/50 focus:border-bronze focus:outline-none transition-colors"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-rose-400 mt-1 block" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder="Organization / City"
                    className="w-full bg-transparent border-0 border-b border-mute/30 pb-3 text-sm text-parchment placeholder:text-mute/50 focus:border-bronze focus:outline-none transition-colors"
                  />
                  <ValidationError prefix="Organization" field="organization" errors={state.errors} className="text-xs text-rose-400 mt-1 block" />
                </div>
                <div className="relative">
                  <input
                    id="projectType"
                    name="projectType"
                    type="text"
                    placeholder="Project Type (e.g. Public Sculpture)"
                    className="w-full bg-transparent border-0 border-b border-mute/30 pb-3 text-sm text-parchment placeholder:text-mute/50 focus:border-bronze focus:outline-none transition-colors"
                  />
                  <ValidationError prefix="Project Type" field="projectType" errors={state.errors} className="text-xs text-rose-400 mt-1 block" />
                </div>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  required
                  placeholder="Tell us about the project scope or timeline..."
                  className="w-full bg-transparent border-0 border-b border-mute/30 pb-3 text-sm text-parchment placeholder:text-mute/50 focus:border-bronze focus:outline-none transition-colors resize-none"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-rose-400 mt-1 block" />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <PrimaryButton type="submit" disabled={state.submitting} showIcon={!state.succeeded} className={state.submitting ? "opacity-70 cursor-not-allowed" : ""}>
                  {state.succeeded ? (
                    <span className="flex items-center gap-2 text-emerald-300">
                      <FontAwesomeIcon icon={faCheck} />
                      Inquiry Transmitted
                    </span>
                  ) : state.submitting ? (
                    "Transmitting..."
                  ) : (
                    "Send Inquiry"
                  )}
                </PrimaryButton>

                <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5 border border-white/10 text-bronze-light text-[9px]">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <span>Response within 24h</span>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
