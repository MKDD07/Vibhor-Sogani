import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AmbientFlareCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Glowing flare sparkle particles (matching image)
    const flaresCount = 22;
    const flares = Array.from({ length: flaresCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1.2,
      maxGlow: Math.random() * 12 + 6,
      opacity: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      flares.forEach((flare) => {
        // Slow gentle floating motion
        flare.x += flare.vx;
        flare.y += flare.vy;

        if (flare.x < 0) flare.x = width;
        if (flare.x > width) flare.x = 0;
        if (flare.y < 0) flare.y = height;
        if (flare.y > height) flare.y = 0;

        flare.phase += flare.pulseSpeed;
        const currentOpacity = (Math.sin(flare.phase) * 0.35 + 0.65) * flare.opacity;
        const currentGlow = (Math.sin(flare.phase) * 0.5 + 0.5) * flare.maxGlow + 4;

        // Radial glow flare (bronze/copper warm light)
        const radGrad = ctx.createRadialGradient(
          flare.x,
          flare.y,
          0,
          flare.x,
          flare.y,
          currentGlow
        );

        radGrad.addColorStop(0, `rgba(255, 230, 210, ${currentOpacity})`);
        radGrad.addColorStop(0.2, `rgba(206, 70, 21, ${currentOpacity * 0.8})`);
        radGrad.addColorStop(0.6, `rgba(206, 70, 21, ${currentOpacity * 0.2})`);
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(flare.x, flare.y, currentGlow, 0, Math.PI * 2);
        ctx.fill();

        // Bright central sparkle core
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.95})`;
        ctx.beginPath();
        ctx.arc(flare.x, flare.y, flare.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-60 will-change-transform"
    />
  );
}
