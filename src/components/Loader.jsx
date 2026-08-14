import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onFinish }) {
  const wrapRef = useRef(null);
  const blobRef = useRef(null);
  const wordRef = useRef(null);
  const subRef = useRef(null);
  const odometerRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => onFinish?.(),
    });

    gsap.set(blobRef.current, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(wordRef.current, { opacity: 0, y: 15 });
    gsap.set(subRef.current, { opacity: 0, y: 10 });
    gsap.set(odometerRef.current, { opacity: 0, y: 10 });

    const counterObj = { val: 0 };

    tl.to(blobRef.current, { scaleY: 1, duration: 0.7, ease: "power2.in" })
      .to(blobRef.current, {
        borderRadius: "0% 0% 50% 50% / 0% 0% 20% 20%",
        scaleX: 1.3,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(wordRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to(odometerRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
      .to(
        counterObj,
        {
          val: 100,
          duration: 1.4,
          ease: "power2.inOut",
          onUpdate: () => {
            setPercent(Math.floor(counterObj.val));
          },
        },
        "-=0.2"
      )
      .to({}, { duration: 0.25 }) // hold at 100 briefly
      .to([subRef.current, blobRef.current, odometerRef.current], {
        opacity: 0,
        y: -15,
        duration: 0.35,
        ease: "power2.in",
      })
      .add(() => {
        if (!wordRef.current) return;
        const targetHeaderLogo = document.querySelector("#header-logo") || document.querySelector("header img");
        const loaderRect = wordRef.current.getBoundingClientRect();
        
        let targetX = 0;
        let targetY = 0;
        let targetScale = 0.8;

        if (targetHeaderLogo) {
          const headerRect = targetHeaderLogo.getBoundingClientRect();
          const loaderCenterX = loaderRect.left + loaderRect.width / 2;
          const loaderCenterY = loaderRect.top + loaderRect.height / 2;
          const headerCenterX = headerRect.left + headerRect.width / 2;
          const headerCenterY = headerRect.top + headerRect.height / 2;

          targetX = headerCenterX - loaderCenterX;
          targetY = headerCenterY - loaderCenterY;
          if (loaderRect.height > 0) {
            targetScale = headerRect.height / loaderRect.height;
          }
        } else {
          targetX = -(window.innerWidth / 2 - 80);
          targetY = -(window.innerHeight / 2 - 40);
          targetScale = 0.8;
        }

        gsap.to(wordRef.current, {
          x: targetX,
          y: targetY,
          scale: targetScale,
          duration: 0.8,
          ease: "power3.inOut",
        });
      })
      .to(
        wrapRef.current,
        {
          backgroundColor: "rgba(11, 10, 8, 0)",
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "+=0.05"
      );

    return () => tl.kill();
  }, [onFinish]);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0a08] select-none pointer-events-none"
    >
      <div
        ref={blobRef}
        className="absolute top-0 h-32 w-20 rounded-b-full bg-gradient-to-b from-bronze-light via-bronze to-ember"
        style={{
          background: "linear-gradient(to bottom, #d9c8a8, #CE4615, #8a3b2b)",
          filter: "blur(0.3px)"
        }}
      />
      <div className="relative flex flex-col items-center px-4 text-center">
        {/* Logo scaled down to 50% (h-8 sm:h-10) */}
        <img
          ref={wordRef}
          src="/logo.svg"
          alt="Vibhor Sogani"
          className="h-8 sm:h-10 w-auto max-w-[60vw] object-contain brightness-0 invert will-change-transform"
        />
        <p
          ref={subRef}
          className="mt-3 text-[11px] uppercase tracking-wide-x text-bronze-light font-medium"
        >
          Studio Vibhor Sogani &mdash; Sculpture &amp; Installation Art
        </p>
      </div>

      {/* Bottom Right 48px Regular Google Sans Counter */}
      <div
        ref={odometerRef}
        className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 font-body font-normal text-[48px] leading-none text-parchment tracking-tight tabular-nums opacity-90 select-none"
      >
        <span>{String(percent).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

