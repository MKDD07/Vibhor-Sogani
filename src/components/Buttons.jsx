import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function PrimaryButton({ children, className = "", showIcon = true, ...props }) {
  return (
    <button
      className={
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-bronze border-2 border-transparent hover:border-bronze px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-500 text-white hover:text-white cursor-pointer " +
        className
      }
      {...props}
    >
      <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] group-hover:translate-x-0" />
      <span className="relative z-10 text-white transition-colors duration-500 group-hover:text-parchment inline-flex items-center gap-2">
        {children}
      </span>
      {showIcon && (
        <FontAwesomeIcon
          icon={faArrowRight}
          className="relative z-10 text-xs text-white transition-all duration-500 group-hover:translate-x-1 group-hover:text-parchment ml-0.5"
        />
      )}
    </button>
  );
}

export function GhostButton({ children, className = "", ...props }) {
  return (
    <button
      className={
        "group relative hidden sm:inline-flex items-center gap-3 overflow-hidden rounded-full border-[2px] border-bronze/50 px-7 py-3.5 text-sm font-medium tracking-wide text-parchment transition-colors duration-500 hover:border-bronze cursor-pointer " +
        className
      }
      {...props}
    >
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-bronze transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] group-hover:scale-y-100" />
      <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
        {children}
      </span>
    </button>
  );
}

