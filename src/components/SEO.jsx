import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { projectsData } from "../data/projectsData";

import { BASE_URL, PAGE_META } from "../data/pageMeta";

export function SEO() {
  const { pathname: rawPathname } = useLocation();
  const pathname = rawPathname.replace(/\/+$/, "") || "/";

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

    const canonicalPath = project ? '/installations/' + project.slug : PAGE_META[pathname] ? pathname : null;
    const canonicalUrl = BASE_URL + (canonicalPath || pathname);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;
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
    setMetaTag("robots", canonicalPath ? "index, follow, max-image-preview:large" : "noindex, follow");
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
        image: project.images && project.images[0] ? new URL(project.images[0], BASE_URL + "/").href : undefined,
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
