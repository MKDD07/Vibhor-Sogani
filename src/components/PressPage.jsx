import React, { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilePdf,
  faImage,
  faXmark,
  faExpand,
  faDownload,
  faArrowUpRightFromSquare,
  faFilter,
  faChevronLeft,
  faChevronRight,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import pressArticles from "../data/pressData.json";
import Newsletter from "./Newsletter";
import Contact from "./Contact";
import StudioBanner from "./StudioBanner";

const CATEGORIES = [
  "All Coverage",
  "Design & Architecture",
  "National News & Broadsheets",
  "Magazines & Features",
  "Art & Exhibitions",
  "International & Digital",
];

const ITEMS_PER_PAGE = 25; // 5 columns x 5 rows

export default function PressPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Coverage");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(true);

  const containerRef = useRef(null);
  const modalRef = useRef(null);

  // Filter items dynamically based on search and category dropdown
  const filteredArticles = useMemo(() => {
    return pressArticles.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Coverage" || item.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  // Animate grid cards when page or filter changes
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        ".press-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    }
  }, [currentPage, selectedCategory, searchQuery]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (containerRef.current) {
      const yOffset = -100;
      const y = containerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Open modal with keyboard esc listener & body scroll lock
  const openModal = (item) => {
    setActiveModalItem(item);
    setPdfLoading(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModalItem(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="bg-ink min-h-screen text-parchment">
      {/* Hero Header */}
      <section className="pt-36 pb-14 px-6 lg:px-12 max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-wide-x text-bronze-light font-semibold block mb-3">
              Archives &amp; Publications
            </span>
            <h1 className="about-title font-display text-4xl sm:text-6xl lg:text-7xl font-light text-parchment">
              Press &amp; Media
            </h1>
            <p className="text-mute text-base sm:text-lg font-light mt-4 max-w-2xl">
              Over two decades of curated global editorials, architectural critiques, magazine monographs, and broadsheet press coverage.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-6 self-start md:self-auto py-2.5 px-6 rounded-xl bg-surface-2/60 border border-mute/25 shadow-sm">
            <div>
              <span className="block text-2xl font-display text-bronze font-light">
                {pressArticles.length}+
              </span>
              <span className="text-[11px] uppercase tracking-wider text-mute">
                Archived Features
              </span>
            </div>
            <div className="h-8 w-px bg-mute/25" />
            <div>
              <span className="block text-2xl font-display text-bronze font-light">
                {pressArticles.filter((a) => a.type === "pdf").length}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-mute">
                Digital Portfolios (PDF)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Press Interactive Block (Search + Grid) */}
      <div id="press-container" className="relative">
        {/* Interactive Controls Bar with Search and Category Dropdown */}
        <section className="sticky top-0 z-30 bg-ink/95 backdrop-blur-md  py-4 px-6 lg:px-12 max-w-[1800px] mx-auto transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative flex-1 max-w-lg">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-mute text-xs"
              />
              <input
                type="text"
                placeholder="Search publication, magazine or newspaper..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-2/60 border border-mute/25 hover:border-mute/40 focus:border-bronze text-sm text-parchment placeholder-mute/60 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-parchment text-xs px-1.5 py-0.5 rounded-full"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative w-full sm:w-72">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 pr-10 rounded-full bg-surface-2 border border-mute/25 hover:border-mute/40 focus:border-bronze text-sm text-parchment outline-none cursor-pointer transition-colors"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category} className="bg-surface-2 text-parchment py-1.5">
                    {category}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-mute text-xs"
              />
            </div>

          </div>
        </section>

        {/* Press Articles Grid (5 columns on large screens) */}
        <section ref={containerRef} className="py-12 px-6 lg:px-12 max-w-[1800px] mx-auto min-h-[500px]">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/15 rounded-3xl bg-white/[0.01]">
            <FontAwesomeIcon icon={faFilter} className="text-3xl text-mute/50 mb-4" />
            <h3 className="text-lg font-display text-parchment">No publications found</h3>
            <p className="text-mute text-sm mt-2">
              Try adjusting your search terms or filter selection.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Coverage");
              }}
              className="mt-6 px-5 py-2 rounded-full text-xs uppercase tracking-wider bg-bronze text-white hover:bg-bronze/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {paginatedArticles.map((article, idx) => (
                <div
                  key={article.id + "-" + idx}
                  onClick={() => openModal(article)}
                  className="press-card group relative cursor-pointer flex flex-col rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-bronze/50 hover:bg-white/[0.05] transition-all duration-400 hover:-translate-y-1.5 shadow-lg shadow-black/20"
                >
                  {/* Media Thumbnail Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                    <img
                      src={article.image || "/images/about/about_0001.webp"}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                      onError={(e) => {
                        e.target.src = "/images/about/about_0001.webp";
                      }}
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                    {/* Coverage Category Badge */}
                    <div className="press-category-badge absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] opacity-100 font-bold tracking-wider uppercase shadow-md transition-colors duration-300">
                      <span>{article.category}</span>
                    </div>

                    {/* Hover Quick Action Badge */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                      <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-bronze text-white shadow-xl shadow-bronze/30">
                        <FontAwesomeIcon icon={faExpand} /> Read &amp; View
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="font-display text-sm sm:text-base font-normal text-parchment group-hover:text-bronze transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-mute">
                      <span>Press Feature</span>
                      <span className="group-hover:text-parchment transition-colors flex items-center gap-1">
                        Open <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[9px]" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-mute uppercase tracking-wider">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} &ndash;{" "}
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredArticles.length)} of{" "}
                  {filteredArticles.length} publications
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="h-10 px-4 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        return (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        );
                      })
                      .map((page, idx, arr) => {
                        const showEllipsisBefore = idx > 0 && page - arr[idx - 1] > 1;
                        return (
                          <React.Fragment key={page}>
                            {showEllipsisBefore && (
                              <span className="px-2 text-mute text-xs select-none">&hellip;</span>
                            )}
                            <button
                              onClick={() => handlePageChange(page)}
                              className={
                                "h-10 w-10 rounded-full text-xs font-semibold transition-all " +
                                (currentPage === page
                                  ? "bg-bronze text-white shadow-lg shadow-bronze/25"
                                  : "bg-white/[0.03] text-mute hover:text-parchment hover:bg-white/10 border border-white/10")
                              }
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        );
                      })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className="h-10 px-4 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                  >
                    <span>Next</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        </section>
      </div>

      {/* Interactive Reader Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 lg:p-10 animate-fadeIn">
          {/* Modal Background Backdrop click */}
          <div className="absolute inset-0" onClick={closeModal} />

          {/* Modal Container */}
          <div
            ref={modalRef}
            className="relative z-10 w-full max-w-6xl h-[90vh] bg-surface rounded-2xl border border-white/15 shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-surface-2/80">
              <div className="flex items-center gap-3 pr-4 truncate">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white/10 text-parchment">
                  <FontAwesomeIcon
                    icon={activeModalItem.type === "pdf" ? faFilePdf : faImage}
                    className={activeModalItem.type === "pdf" ? "text-red-400" : "text-amber-400"}
                  />
                </div>
                <div className="truncate">
                  <h3 className="text-base sm:text-lg font-display text-parchment truncate">
                    {activeModalItem.title}
                  </h3>
                  <span className="text-[11px] uppercase tracking-wider text-mute">
                    {activeModalItem.category} &bull; {activeModalItem.type === "pdf" ? "Document View" : "High-Resolution Scan"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {activeModalItem.pdf ? (
                  <a
                    href={activeModalItem.pdf}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider bg-white/10 hover:bg-white/20 text-parchment transition-colors"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    <span className="hidden sm:inline">Download PDF</span>
                  </a>
                ) : activeModalItem.image ? (
                  <a
                    href={activeModalItem.image}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider bg-white/10 hover:bg-white/20 text-parchment transition-colors"
                  >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    <span className="hidden sm:inline">Full Image</span>
                  </a>
                ) : null}

                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-bronze text-parchment flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-base" />
                </button>
              </div>
            </div>

            {/* Modal Body / Viewer */}
            <div className="relative flex-1 w-full bg-black/80 flex items-center justify-center overflow-auto p-2">
              {activeModalItem.type === "pdf" && activeModalItem.pdf ? (
                <div className="w-full h-full relative">
                  {pdfLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-parchment gap-3 z-10">
                      <div className="h-8 w-8 border-2 border-bronze border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs uppercase tracking-wider text-mute">
                        Loading Document...
                      </p>
                    </div>
                  )}
                  <iframe
                    src={`${activeModalItem.pdf}#toolbar=1&navpanes=0&scrollbar=1`}
                    title={activeModalItem.title}
                    className="w-full h-full rounded-lg border-0"
                    onLoad={() => setPdfLoading(false)}
                  />
                </div>
              ) : (
                <div className="max-h-full max-w-full flex items-center justify-center p-4">
                  <img
                    src={activeModalItem.image}
                    alt={activeModalItem.title}
                    className="max-h-[78vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer Info */}
            <div className="px-6 py-3 bg-surface-2/90 border-t border-white/10 flex items-center justify-between text-xs text-mute">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.svg"
                  alt="Studio Vibhor Sogani"
                  className="h-4 w-auto object-contain brightness-0 invert opacity-75"
                />
                <span className="text-[11px] uppercase tracking-wider text-mute">
                  Press Archives
                </span>
              </div>
              <span className="text-[11px]">Press ESC or click outside to close</span>
            </div>
          </div>
        </div>
      )}

      {/* Global Newsletter, Contact & Studio Banner */}
      <Contact />
    </div>
  );
}
