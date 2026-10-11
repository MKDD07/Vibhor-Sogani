import React, { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilePdf,
  faImage,
  faXmark,
  faDownload,
  faArrowUpRightFromSquare,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import pressArticles from "../data/pressData.json";

const CATEGORIES = [
  "All Coverage",
  "Design & Architecture",
  "National News & Broadsheets",
  "Magazines & Features",
  "Art & Exhibitions",
  "International & Digital",
];

const ITEMS_PER_PAGE = 12;

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
    if (containerRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const ctx = gsap.context(() => { gsap.fromTo(
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
      ); }, containerRef);
      return () => ctx.revert();
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
  };

  const closeModal = () => {
    setActiveModalItem(null);
  };

  useEffect(() => {
    if (!activeModalItem) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveModalItem(null);
      if (event.key !== 'Tab') return;
      const controls = modalRef.current?.querySelectorAll('a[href], button, iframe');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === modalRef.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === modalRef.current)) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [activeModalItem]);

  return (
    <div className="bg-ink min-h-screen text-parchment">
      <main className="site-container pb-24 pt-32 lg:pt-40">
        <header className="grid gap-8 border-b border-parchment/15 pb-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:pb-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-bronze">The press archive</span>
            <h1 className="page-heading mt-5 font-display">In print.<br />In conversation.</h1>
          </div>
          <div className="flex flex-col justify-end">
            <p className="site-prose max-w-md text-sm leading-relaxed text-mute">A collection of editorials, interviews, and features on Vibhor Sogani?s work across public art, sculpture, and design.</p>
            <span className="mt-8 text-[11px] uppercase tracking-[0.18em] text-mute">{pressArticles.length} archived publications</span>
          </div>
        </header>

        <section className="py-8 lg:py-10" aria-label="Filter press archive">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <h2 className="section-heading font-display text-3xl">Publications &amp; features</h2>
            <div className="relative w-full sm:max-w-xs">
              <FontAwesomeIcon icon={faSearch} className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-mute" />
              <input aria-label="Search publications" type="search" placeholder="Search the archive" value={searchQuery}
                onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1); }}
                className="w-full border-b border-parchment/25 bg-transparent py-3 pl-7 pr-4 text-sm text-parchment outline-none transition-colors placeholder:text-mute focus:border-bronze" />
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {CATEGORIES.map((category) => <button key={category} type="button" aria-pressed={selectedCategory === category}
              onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
              className={`border-b py-2 text-xs transition-colors focus-visible:outline focus-visible:outline-bronze ${selectedCategory === category ? 'border-bronze text-bronze' : 'border-transparent text-mute hover:text-parchment'}`}>{category}</button>)}
          </div>
        </section>

        <section ref={containerRef} className="scroll-mt-28" aria-label="Publications">
          {filteredArticles.length === 0 ? <div className="py-20 text-center"><h3 className="font-display text-3xl">No publications found</h3><p className="mt-3 text-sm text-mute">Try another publication name or category.</p><button onClick={() => { setSearchQuery(''); setSelectedCategory('All Coverage'); }} className="mt-6 text-xs text-bronze">Clear filters</button></div> : <>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
              {paginatedArticles.map((article) => <button key={article.id} type="button" onClick={() => openModal(article)} className="press-card group min-w-0 text-left focus-visible:outline focus-visible:outline-bronze" aria-label={`Read ${article.title}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <img src={article.image || '/images/about/about_0001.webp'} alt={article.title} loading="lazy" className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.025]" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/images/about/about_0001.webp'; }} />
                  <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center bg-ink text-parchment transition-colors group-hover:text-bronze"><FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" /></span>
                </div>
                <div className="mt-5 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.14em] text-mute"><span>{article.category}</span><span className="shrink-0">{article.type === 'pdf' ? 'PDF' : 'Scan'}</span></div>
                <h3 className="mt-3 font-display text-2xl leading-snug text-parchment transition-colors group-hover:text-bronze">{article.title}</h3>
                <p className="mt-2 text-xs text-mute">{article.date}</p>
              </button>)}
            </div>
            {totalPages > 1 && <nav aria-label="Archive pages" className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-parchment/15 pt-6">
              <span className="text-xs text-mute">Page {currentPage} of {totalPages}</span>
              <div className="flex items-center gap-6">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page" className="flex h-10 items-center gap-3 border-b border-parchment/25 text-xs text-parchment transition-colors hover:border-bronze hover:text-bronze disabled:cursor-not-allowed disabled:opacity-25"><FontAwesomeIcon icon={faChevronLeft} />Previous</button>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page" className="flex h-10 items-center gap-3 border-b border-parchment/25 text-xs text-parchment transition-colors hover:border-bronze hover:text-bronze disabled:cursor-not-allowed disabled:opacity-25">Next<FontAwesomeIcon icon={faChevronRight} /></button>
              </div>
            </nav>}
          </>}
        </section>
      </main>

      {/* Interactive Reader Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 lg:p-10 animate-fadeIn">
          {/* Modal Background Backdrop click */}
          <div className="absolute inset-0" onClick={closeModal} />

          {/* Modal Container */}
          <div
            ref={modalRef}
            role="dialog" aria-modal="true" aria-label={activeModalItem.title} tabIndex={-1}
            data-lenis-prevent
            className="relative z-10 w-full max-w-6xl h-[90vh] bg-surface border border-parchment/15 shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
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
                    href={activeModalItem.scan || activeModalItem.image}
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
                    src={activeModalItem.scan || activeModalItem.image}
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

    </div>
  );
}
