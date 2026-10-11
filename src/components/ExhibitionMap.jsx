import React, { useState, useRef, useId } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature, merge } from "topojson-client";
import indiaOutline from "../data/india-outline.json";
import world from "world-atlas/countries-110m.json";

const EXHIBITIONS = [
  { name: "Netherlands", id: "528", coordinates: [5.3, 52.1] },
  { name: "Australia", id: "036", coordinates: [134, -25] },
  { name: "Zimbabwe", id: "716", coordinates: [29.9, -19] },
  { name: "Tanzania", id: "834", coordinates: [35, -6] },
  { name: "South Africa", id: "710", coordinates: [25, -29] },
  { name: "Germany", id: "276", coordinates: [10.4, 51.2] },
  { name: "Denmark", id: "208", coordinates: [9.5, 56] },
];
const EXHIBITION_TEXT = {
  Netherlands: 'Pool of Dreams was presented at the Amsterdam Light Festival and joined the city’s permanent Light Art Collection.',
  Australia: 'Australian exhibitions form part of Sogani’s international presentation of art and design.',
  Zimbabwe: 'Exhibited in Zimbabwe, extending the practice’s presence across international art audiences.',
  Tanzania: 'Tanzania is among the countries in which Sogani’s work has been exhibited.',
  'South Africa': 'South African exhibitions are part of the artist’s ongoing international practice.',
  Germany: 'Germany has hosted presentations of Sogani’s work across art and design.',
  Denmark: 'Exhibited in Denmark as part of a practice that connects Indian design with international audiences.',
};
const countries = feature(world, world.objects.countries).features;
const land = merge(world, world.objects.countries.geometries.filter((item) => item.id !== '010'));
const projection = geoNaturalEarth1().scale(145).translate([400, 215]);
const path = geoPath(projection);
const landPath = path(land);
const indiaPath = path(indiaOutline);
const countryPaths = new Map(countries.map((country) => [country.id, path(country)]));

export default function ExhibitionMap() {
  const [selected, setSelected] = useState(EXHIBITIONS[0]);
  const selectCountry = (country) => {
    setSelected(country);
  };
  const [tooltip, setTooltip] = useState(null);
  const mapRef = useRef(null);
  const tooltipId = useId();
  const maskId = "india-" + useId().replace(/:/g, "");
  const showTooltip = (event, country) => {
    if (!mapRef.current) return;
    const bounds = mapRef.current.getBoundingClientRect();
    const pin = event.currentTarget.getBoundingClientRect();
    const x = Math.max(130, Math.min(bounds.width - 130, pin.left + pin.width / 2 - bounds.left));
    const y = pin.top - bounds.top;
    setTooltip({ country, x: x / bounds.width * 100, y: y / bounds.height * 100, below: y < 160 });
  };
  return (
    <div className="mt-8 lg:mt-12">
      <div ref={mapRef} className="relative w-full" onKeyDown={(event) => { if (event.key === "Escape") setTooltip(null); }}>
        <svg viewBox="0 0 800 440" role="group" aria-label="World map of exhibition countries" className="h-auto w-full">
          <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="440"><rect width="800" height="440" fill="white" /><path d={indiaPath} fill="black" stroke="black" strokeWidth={0.5} /></mask></defs>
          <path d={landPath} fill="var(--color-mute)" fillOpacity={0.1} stroke="var(--color-mute)" strokeOpacity={0.3} strokeWidth={0.6} mask={`url(#${maskId})`} />
          <path d={indiaPath} fill="var(--color-mute)" fillOpacity={0.1} stroke="var(--color-parchment)" strokeOpacity={0.45} strokeWidth={0.3} />
          <g mask={`url(#${maskId})`} fill="none" stroke="var(--color-mute)" strokeOpacity={0.25} strokeWidth={0.45} pointerEvents="none">
            {countries.filter((country) => country.id !== '010' && country.id !== '356').map((country) => <path key={country.id} d={countryPaths.get(country.id)} />)}
          </g>
          {EXHIBITIONS.map((country) => <path key={country.id} d={country.id === '356' ? indiaPath : countryPaths.get(country.id)}
            fill={selected.id === country.id ? 'var(--color-bronze)' : 'var(--color-bronze-light)'} fillOpacity={selected.id === country.id ? 0.32 : 0.16}
            stroke={selected.id === country.id ? 'var(--color-mute)' : 'none'} strokeOpacity={0.4} strokeWidth={0.3}
            className="cursor-pointer transition-colors duration-300" onClick={() => selectCountry(country)} />)}
          {EXHIBITIONS.map((country) => <g key={country.id} transform={`translate(${projection(country.coordinates).join(",")})`} role="button" tabIndex={0} aria-label={`Select ${country.name}`} aria-pressed={selected.id === country.id}
            onClick={(event) => { selectCountry(country); showTooltip(event, country); }}
            onMouseEnter={(event) => showTooltip(event, country)}
            onMouseLeave={() => setTooltip(null)}
            onFocus={(event) => showTooltip(event, country)}
            onBlur={() => setTooltip(null)}
            aria-describedby={tooltip?.country.id === country.id ? tooltipId : undefined}
            onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectCountry(country); } }}
            className="exhibition-pin cursor-pointer focus:outline-none [&:focus-visible>path]:stroke-parchment">
            <title>{country.name}</title>
            <circle r={11} cy={-8} fill="transparent" />
            <path transform="scale(0.65)" d="M0 0C-2-3-6-7-6-11a6 6 0 0 1 12 0C6-7 2-3 0 0Z" fill="var(--color-ink)" stroke="var(--color-bronze)" strokeWidth={1.4} />
            <circle cx={0} cy={-7.15} r={1.17} fill="var(--color-bronze)" />
          </g>)}
        </svg>
        {tooltip && <div id={tooltipId} role="tooltip" className="pointer-events-none absolute z-20 w-[250px] max-w-[85vw]" style={{ left: tooltip.x + '%', top: tooltip.y + '%', transform: tooltip.below ? 'translate(-50%, 20px)' : 'translate(-50%, calc(-100% - 16px))' }}>
          <div key={tooltip.country.id} className="exhibition-tooltip bg-surface-2 px-5 py-4 text-parchment shadow-xl">
          <span className="font-display text-2xl">{tooltip.country.name}</span>
          <div className="mt-2 text-xs leading-relaxed text-mute">{EXHIBITION_TEXT[tooltip.country.name]}</div>
          </div>
        </div>}
      </div>
      <div className="site-container ">
      <div className="mt-5 flex flex-wrap items-baseline justify-center gap-3" aria-live="polite">
        <span className="font-display text-2xl text-parchment">{selected.name}</span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-mute">Exhibition country</span>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3" aria-label="Choose an exhibition country">
        {EXHIBITIONS.map((country) => <button key={country.id} type="button" onClick={() => selectCountry(country)} aria-pressed={selected.id === country.id}
          className={`py-1 text-xs transition-colors focus-visible:outline focus-visible:outline-bronze ${selected.id === country.id ? 'text-bronze' : 'text-mute hover:text-parchment'}`}>{country.name}</button>)}
      </div>
      <p className="site-prose mt-5 text-center text-[11px] leading-relaxed text-mute">Pins indicate exhibition countries, rather than individual venues.</p>
      </div>
    </div>
  );
}
