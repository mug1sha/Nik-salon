"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, ArrowUpRight, Instagram } from "lucide-react";

/* ── data ───────────────────────────────────────────────────── */
const items = [
  /* KIDS */
  {
    id: "k1", type: "KIDS", label: "Little Royals",
    caption: "Braid magic & smooth transitions",
    src: "/Nik%20salon/Kids/A%20little%20braid%20magic%20and%20a%20smooth%20transition%21%20%E2%9C%A8%20The%20NIK%20way%21%20%F0%9F%92%9A%23niksalonkids%20%23littleroyals%20%23kiga.mp4",
  },
  {
    id: "k2", type: "KIDS", label: "Every Style, Every Royal",
    caption: "Different royals, endless cuteness",
    src: "/Nik%20salon/Kids/Different%20royals%2C%20different%20styles%2C%20endless%20cuteness%21%20%F0%9F%91%91%F0%9F%92%9A%20Which%20style%20is%20your%20favourite%23niksalo.mp4",
  },
  {
    id: "k3", type: "KIDS", label: "Fresh Cuts, Big Confidence",
    caption: "Fresh cuts for our little kings",
    src: "/Nik%20salon/Kids/Fresh%20cuts%20for%20our%20Little%20Kings%21%20%F0%9F%91%91%20Big%20style%2C%20bigger%20confidence%21%20%F0%9F%A4%97%23niksalonkids%20%23littlekings%20%23.mp4",
  },
  {
    id: "k4", type: "KIDS", label: "Happy Smiles, Beautiful Braids",
    caption: "Home is where the happy smiles are",
    src: "/Nik%20salon/Kids/Home%20is%20where%20the%20happy%20smiles%2C%20beautiful%20braids%20and%20royal%20treatment%20happen%21%20%E2%9D%A4%EF%B8%8F%23niksalonkids%20%23li.mp4",
  },
  {
    id: "k5", type: "KIDS", label: "The NIK Transformation",
    caption: "From braiding process to final look",
    src: "/Nik%20salon/Kids/The%20magic%20is%20in%20the%20transformation%21%20%E2%9C%A8%20From%20the%20braiding%20process%20to%20the%20final%20look%2C%20our%20little%20ro.mp4",
  },
  /* ADULTS */
  {
    id: "a1", type: "ADULTS", label: "Book Your Appointment",
    caption: "Don't miss your next NIK moment",
    src: "/Nik%20salon/adults/Don%E2%80%99t%20forget%20to%20book%20your%20appointment%20with%20us%21%23hairgoals%20%23loveyourhair%20%23newlooknewyou%20%23niksalon%20.mp4",
  },
  {
    id: "a2", type: "ADULTS", label: "Contacts & Locations",
    caption: "Four NIK branches across Kigali",
    src: "/Nik%20salon/adults/ITS%20TIME%20TO%20BOOK%20YOUR%20APPOINTMENT%20%E2%9D%A4%EF%B8%8F%20CONTACTS%20%26%20LOCATIONS%20__________________________%F0%9F%93%8D%20NIK%20SALON.mp4",
  },
  {
    id: "a3", type: "ADULTS", label: "Fresh Slay at NIK",
    caption: "Out with the old, in with the new",
    src: "/Nik%20salon/adults/Out%20with%20the%20old%2C%20in%20with%20the%20new%21%20%F0%9F%98%8D%20From%20take-down%20to%20a%20fresh%20slay%20at%20NIK%20Salon%21%F0%9F%A5%B0%23niksalonadu.mp4",
  },
  {
    id: "a4", type: "ADULTS", label: "Smooth Transition",
    caption: "Silky styles, stunning results",
    src: "/Nik%20salon/adults/Smooth%20transition%20%F0%9F%A5%B0%20%40vivian_marie_france%20%23loveyourhair%20%23salonvibes%20%23newlooknewyou.mp4",
  },
  {
    id: "a5", type: "ADULTS", label: "Show Up Looking Like This",
    caption: "Every great look starts at NIK",
    src: "/Nik%20salon/adults/Who%E2%80%99s%20going%20to%20the%20King%20James%20concert%20%F0%9F%91%80%F0%9F%8E%A4%E2%9C%A8POV-%20You%20show%20up%20looking%20like%20this%20%F0%9F%98%8DEvery%20great%20hair.mp4",
  },
];

/* ── VideoTile ──────────────────────────────────────────────── */
function VideoTile({
  item, featured, onBook,
}: {
  item: (typeof items)[0];
  featured: boolean;
  onBook: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  /* autoplay on hover */
  const handleEnter = useCallback(() => {
    setHovered(true);
    ref.current?.play().catch(() => {});
    setPlaying(true);
  }, []);
  const handleLeave = useCallback(() => {
    setHovered(false);
    ref.current?.pause();
    ref.current && (ref.current.currentTime = 0);
    setPlaying(false);
    setMuted(true);
  }, []);

  /* sync muted state to video element */
  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((m) => !m);
  };

  return (
    <div
      className={`vt-tile${featured ? " vt-featured" : ""}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
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

      {/* play hint when idle */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            className="vt-play-hint"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Play size={featured ? 28 : 20} fill="currentColor" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* overlay — always present, fades out while playing */}
      <motion.div
        className="vt-overlay"
        animate={{ opacity: playing ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="vt-tag">{item.type}</span>
        <div className="vt-text">
          <h3 className="vt-title">{item.label}</h3>
          <p className="vt-caption">{item.caption}</p>
          {featured && (
            <button className="vt-book" onClick={onBook}>
              Book a visit <ArrowUpRight size={14} />
            </button>
          )}
        </div>
      </motion.div>

      {/* mute toggle — visible while playing */}
      <AnimatePresence>
        {playing && (
          <motion.button
            className="vt-mute"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── GalleryReel ────────────────────────────────────────────── */
export default function GalleryReel({ onBook }: { onBook: () => void }) {
  const [filter, setFilter] = useState<"ALL" | "KIDS" | "ADULTS">("ALL");

  const shown = filter === "ALL" ? items : items.filter((i) => i.type === filter);

  return (
    <section className="reel-section section-pad" id="gallery">
      {/* heading */}
      <div className="reel-head">
        <div className="reel-head-left">
          <div className="eyebrow reel-eyebrow">
            <span className="eyebrow-line eyebrow-line-light" /> A LITTLE INSPIRATION
          </div>
          <h2 className="reel-h2">
            Looks worth<br /><em>loving.</em>
          </h2>
        </div>
        <div className="reel-head-right">
          <p>Real NIK moments — hover any clip to watch it come alive.</p>
          <a
            className="reel-ig"
            href="https://www.instagram.com/niksalon_kids/"
            target="_blank"
            rel="noreferrer"
          >
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
            onClick={() => setFilter(f)}
          >
            {f === "ALL" ? "All reels" : f === "KIDS" ? "👶 Kids" : "🧑 Adults"}
          </button>
        ))}
      </div>

      {/* grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          className="reel-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {shown.map((item, i) => (
            <VideoTile
              key={item.id}
              item={item}
              featured={i === 0}
              onBook={onBook}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
