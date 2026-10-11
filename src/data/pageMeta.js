export const BASE_URL = (import.meta.env?.VITE_SITE_URL || "https://vibhorsogani.com").replace(/\/$/, "");

export const PAGE_META = {
  "/": {
    title: "Studio Vibhor Sogani — Monumental Public Art & Contemporary Installations",
    description: "Explore monumental public art, spatial lighting installations, and contemporary sculptures by Indian artist Vibhor Sogani.",
    schemaType: "Organization",
  },
  "/about": {
    title: "About Vibhor Sogani — Philosophy, Mastery & Monumental Practice",
    description: "Learn about artist Vibhor Sogani's trajectory, materials mastery in stainless steel and light, studio ethos, and global landmarks.",
    schemaType: "Person",
  },
  "/installations": {
    title: "Sculptural Works & Public Installations — Studio Vibhor Sogani",
    description: "Curated collection of 38+ site-specific public monuments, light sculptures, and architectural installations worldwide.",
    schemaType: "CollectionPage",
  },
  "/press": {
    title: "Press, Editorials & Media Coverage — Studio Vibhor Sogani",
    description: "Archival record of publications, global design editorials, architectural magazines, and broadsheet features covering Vibhor Sogani.",
    schemaType: "CollectionPage",
  },
  "/contact": {
    title: "Contact & Commissions — Studio Vibhor Sogani",
    description: "Direct inquiries for site-specific public commissions, bespoke architectural lighting, and monumental masterplanning.",
    schemaType: "ContactPage",
  },
  "/privacy-policy": {
    title: "Privacy Policy — Studio Vibhor Sogani",
    description: "Studio Vibhor Sogani privacy policies, communication data protection, and terms.",
    schemaType: "WebPage",
  },
  "/terms": {
    title: "Terms & Conditions — Studio Vibhor Sogani",
    description: "Studio Vibhor Sogani terms of service and commission agreements.",
    schemaType: "WebPage",
  },
};

