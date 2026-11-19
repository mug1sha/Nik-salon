"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2, VolumeX, Play, ArrowUpRight, Instagram,
  Scissors, User, X, ChevronLeft, ChevronRight,
} from "lucide-react";

/* ── data ───────────────────────────────────────────────────── */
const items = [
  /* KIDS */
  {
    id: "k1", type: "KIDS", label: "Little Royals",
    caption: "Braid magic & smooth transitions",
    src: "/videos/kids/kids-braid-transition.mp4",
  },
  {
    id: "k2", type: "KIDS", label: "Every Style, Every Royal",
    caption: "Different royals, endless cuteness",
    src: "/videos/kids/kids-different-styles.mp4",
  },
  {
    id: "k3", type: "KIDS", label: "Fresh Cuts, Big Confidence",
    caption: "Fresh cuts for our little kings",
    src: "/videos/kids/kids-fresh-cuts.mp4",
  },
  {
    id: "k4", type: "KIDS", label: "Happy Smiles, Beautiful Braids",
    caption: "Home is where the happy smiles are",
    src: "/videos/kids/kids-happy-smiles.mp4",
  },
  {
    id: "k5", type: "KIDS", label: "The NIK Transformation",
    caption: "From braiding process to final look",
    src: "/videos/kids/kids-transformation.mp4",
  },
  /* ADULTS */
  {
    id: "a1", type: "ADULTS", label: "Book Your Appointment",
    caption: "Don't miss your next NIK moment",
    src: "/videos/adults/adults-book-appointment.mp4",
  },
  {
    id: "a2", type: "ADULTS", label: "Contacts & Locations",
    caption: "Four NIK branches across Kigali",
    src: "/videos/adults/adults-contacts-locations.mp4",
  },
  {
    id: "a3", type: "ADULTS", label: "Fresh Slay at NIK",
    caption: "Out with the old, in with the new",
    src: "/videos/adults/adults-fresh-slay.mp4",
  },
  {
    id: "a4", type: "ADULTS", label: "Smooth Transition",
    caption: "Silky styles, stunning results",
    src: "/videos/adults/adults-smooth-transition.mp4",
  },
  {
    id: "a5", type: "ADULTS", label: "Show Up Looking Like This",
    caption: "Every great look starts at NIK",
    src: "/videos/adults/adults-show-up.mp4",
  },
];

/* ── VideoTile ──────────────────────────────────────────────── */
function VideoTile({
  item, featured, onClick,
}: {
  item: (typeof items)[0];
  featured: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleEnter = useCallback(() => {
    ref.current?.play().catch(() => {});
    setPlaying(true);
  }, []);

  const handleLeave = useCallback(() => {
    ref.current?.pause();
    if (ref.current) ref.current.currentTime = 0;
    setPlaying(false);
  }, []);

  return (
    <div
      className={`vt-tile${featured ? " vt-featured" : ""}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Play ${item.label}`}
    >
      <video
        ref={ref}
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="vt-video"
      />

      {/* play hint */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            className="vt-play-hint"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
          >
            <Play size={featured ? 26 : 18} fill="currentColor" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* info overlay — fades while playing */}
      <motion.div
        className="vt-overlay"
        animate={{ opacity: playing ? 0 : 1 }}
        transition={{ duration: 0.28 }}
      >
        <span className="vt-tag">{item.type}</span>
        <div className="vt-text">
          <h3 className="vt-title">{item.label}</h3>
          <p className="vt-caption">{item.caption}</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Lightbox ───────────────────────────────────────────────── */
function Lightbox({
  items: list,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: (typeof items);
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const item = list[index];

  /* keyboard nav */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* autoplay on item change */
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = muted;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  /* sync muted */
  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  return (
    <motion.div
      className="lb-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      {/* video card — stop propagation so clicks inside don't close */}
      <motion.div
        className="lb-card"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={ref}
          key={item.src}
          src={item.src}
          autoPlay
          loop
          playsInline
          muted={muted}
          className="lb-video"
        />

        {/* top bar */}
        <div className="lb-top">
          <span className="lb-counter">{index + 1} / {list.length}</span>
          <button className="lb-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* bottom info + mute */}
        <div className="lb-bottom">
          <div>
            <span className="lb-tag">{item.type}</span>
            <p className="lb-title">{item.label}</p>
            <p className="lb-caption">{item.caption}</p>
          </div>
          <button
            className="lb-mute"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </motion.div>

      {/* prev / next */}
      <button
        className="lb-arrow lb-prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="lb-arrow lb-next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>
    </motion.div>
  );
}

/* ── GalleryReel ────────────────────────────────────────────── */
export default function GalleryReel({ onBook }: { onBook: () => void }) {
  const [filter, setFilter] = useState<"ALL" | "KIDS" | "ADULTS">("ALL");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shown = filter === "ALL" ? items : items.filter((i) => i.type === filter);

  const openAt = (idx: number) => setLightbox(idx);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i === null ? 0 : (i - 1 + shown.length) % shown.length));
  const next = () => setLightbox((i) => (i === null ? 0 : (i + 1) % shown.length));

  /* close lightbox when filter changes */
  const handleFilter = (f: "ALL" | "KIDS" | "ADULTS") => {
    setLightbox(null);
    setFilter(f);
  };

  return (
    <section className="reel-section section-pad" id="gallery">

      {/* heading */}
      <div className="reel-head">
        <div className="reel-head-left">
          <div className="eyebrow reel-eyebrow">
            <span className="eyebrow-line eyebrow-line-light" /> A LITTLE INSPIRATION
          </div>
          <h2 className="reel-h2">Looks worth<br /><em>loving.</em></h2>
        </div>
        <div className="reel-head-right">
          <p>Real NIK moments — hover to preview, click to watch full screen.</p>
          <a className="reel-ig" href="https://www.instagram.com/niksalon_kids/" target="_blank" rel="noreferrer">
            <Instagram size={15} /> Follow NIK on Instagram <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* filters */}
      <div className="reel-filters">
        {(["ALL", "KIDS", "ADULTS"] as const).map((f) => (
          <button
            key={f}
            className={`reel-filter-btn${filter === f ? " active" : ""}`}
            onClick={() => handleFilter(f)}
          >
            {f === "KIDS" && <Scissors size={13} />}
            {f === "ADULTS" && <User size={13} />}
            {f === "ALL" ? "All reels" : f === "KIDS" ? "Kids" : "Adults"}
          </button>
        ))}
      </div>

      {/* fixed-height scrollable navy container */}
      <div className="reel-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="reel-grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {shown.map((item, i) => (
              <VideoTile
                key={item.id}
                item={item}
                featured={i === 0}
                onClick={() => openAt(i)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            items={shown}
            index={lightbox}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
