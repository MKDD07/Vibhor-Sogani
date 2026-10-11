import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { projectsData } from "../data/projectsData";

const BASE_URL = "https://vibhorsogani.com";

const PAGE_META = {
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

export function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Identify current project if slug route
    let currentMeta = PAGE_META[pathname];
    let project = null;

    if (!currentMeta && pathname.startsWith("/installations/")) {
      const slug = pathname.replace("/installations/", "");
      project = projectsData.find((p) => p.slug === slug || p.id === slug);
      if (project) {
        currentMeta = {
          title: `${project.title} — Public Installation by Vibhor Sogani`,
          description: project.description || `Explore ${project.title} by Vibhor Sogani located at ${project.location}.`,
          schemaType: "VisualArtwork",
        };
      }
    }

    if (!currentMeta) {
      currentMeta = PAGE_META["/"];
    }

    // 2. Set document title
    document.title = currentMeta.title;

    // 3. Set meta tags
    const setMetaTag = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMetaTag("description", currentMeta.description);
    setMetaTag("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setMetaTag("og:title", currentMeta.title, "property");
    setMetaTag("og:description", currentMeta.description, "property");
    setMetaTag("og:url", `${BASE_URL}${pathname}`, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", currentMeta.title);
    setMetaTag("twitter:description", currentMeta.description);

    // 4. Inject JSON-LD Schema (Schema.org / JSON-LD for rich snippets)
    let jsonLdData = {};

    if (project) {
      jsonLdData = {
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        name: project.title,
        creator: {
          "@type": "Person",
          name: "Vibhor Sogani",
          url: "https://vibhorsogani.com",
        },
        description: project.description,
        artMedium: "Stainless Steel / Light Sculpture",
        locationCreated: project.location,
        url: `${BASE_URL}${pathname}`,
        image: project.images && project.images[0] ? `${BASE_URL}${project.images[0]}` : undefined,
      };
    } else {
      jsonLdData = {
        "@context": "https://schema.org",
        "@type": currentMeta.schemaType,
        name: "Studio Vibhor Sogani",
        url: `${BASE_URL}${pathname}`,
        description: currentMeta.description,
        founder: {
          "@type": "Person",
          name: "Vibhor Sogani",
          jobTitle: "Sculptor & Installation Artist",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "National Capital Region",
          addressCountry: "India",
        },
      };
    }

    let script = document.getElementById("structured-data-json-ld");
    if (!script) {
      script = document.createElement("script");
      script.id = "structured-data-json-ld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLdData);

  }, [pathname]);

  return null;
}
export default SEO;
