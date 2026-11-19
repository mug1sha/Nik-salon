"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ArrowUpRight, MapPin, User, CalendarDays,
  MessageSquare, ChevronDown, Scissors, Star,
} from "lucide-react";
import { useReviews } from "./ReviewsContext";

const BRANCHES = [
  { label: "Kicukiro – Silverback Mall",      tel: "250791675841" },
  { label: "Nyarutarama – Hotel Villa Portofino", tel: "250788692042" },
  { label: "Giporoso – Kabeza / KABCO",        tel: "250793768541" },
  { label: "Kibagabaga",                       tel: "250795020070" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Screen = "form" | "sent" | "review" | "thanks";

export default function BookingModal({ isOpen, onClose }: Props) {
  const { addReview } = useReviews();

  /* booking fields */
  const [name,   setName]   = useState("");
  const [branch, setBranch] = useState(0);
  const [type,   setType]   = useState<"Kids" | "Adults">("Adults");
  const [date,   setDate]   = useState("");
  const [notes,  setNotes]  = useState("");

  /* review fields */
  const [rstars,   setRstars]   = useState(5);
  const [rmessage, setRmessage] = useState("");
  const [hovered,  setHovered]  = useState(0);

  const [screen, setScreen] = useState<Screen>("form");
  const overlayRef = useRef<HTMLDivElement>(null);

  /* scroll lock */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setName(""); setBranch(0); setType("Adults");
        setDate(""); setNotes(""); setRstars(5); setRmessage("");
        setScreen("form");
      }, 350);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Escape key */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  /* send WhatsApp */
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const b = BRANCHES[branch];
    const lines = [
      `Hello NIK Salon (${b.label})! 👋`,
      ``,
      `I'd like to book a *${type}* appointment.`,
      ``,
      `*Name:* ${name.trim() || "—"}`,
      `*Branch:* ${b.label}`,
      `*Service type:* ${type}`,
      date ? `*Preferred date:* ${date}` : null,
      notes.trim() ? `*Notes:* ${notes.trim()}` : null,
      ``,
      `Please let me know your available times. Thank you! 🙏`,
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.open(`https://wa.me/${b.tel}?text=${encodeURIComponent(lines)}`, "_blank", "noreferrer");
    setScreen("sent");
  };

  /* submit review */
  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rmessage.trim()) return;
    addReview({ name: name.trim() || "A NIK guest", stars: rstars, text: rmessage.trim() });
    setScreen("thanks");
  };

  const today = new Date().toISOString().split("T")[0];

  /* title per screen */
  const titles: Record<Screen, string> = {
    form:   "Book a visit",
    sent:   "You're all set!",
    review: "Leave a review",
    thanks: "Thank you!",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="bm-overlay"
          ref={overlayRef}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="bm-sheet"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={titles[screen]}
          >
            {/* Header */}
            <div className="bm-header">
              <div>
                <p className="bm-eyebrow">YOUR NEXT NIK MOMENT</p>
                <h2 className="bm-title">{titles[screen]}</h2>
              </div>
              <button className="bm-close" onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <AnimatePresence mode="wait">

              {/* ── Booking form ── */}
              {screen === "form" && (
                <motion.form
                  key="form"
                  className="bm-form"
                  onSubmit={handleSend}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="bm-field">
                    <label className="bm-label"><User size={13}/> Appointment type</label>
                    <div className="bm-toggle">
                      <button type="button" className={`bm-toggle-btn${type === "Kids" ? " active kids" : ""}`} onClick={() => setType("Kids")}>
                        <Scissors size={14} /> Kids
                      </button>
                      <button type="button" className={`bm-toggle-btn${type === "Adults" ? " active adults" : ""}`} onClick={() => setType("Adults")}>
                        <User size={14} /> Adults
                      </button>
                    </div>
                  </div>
                  <div className="bm-field">
                    <label className="bm-label" htmlFor="bm-name"><User size={13}/> Your name</label>
                    <input id="bm-name" className="bm-input" type="text" placeholder="e.g. Amina" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
                  </div>
                  <div className="bm-field">
                    <label className="bm-label" htmlFor="bm-branch"><MapPin size={13}/> Branch</label>
                    <div className="bm-select-wrap">
                      <select id="bm-branch" className="bm-select" value={branch} onChange={(e) => setBranch(Number(e.target.value))}>
                        {BRANCHES.map((b, i) => <option key={b.tel} value={i}>{b.label}</option>)}
                      </select>
                      <ChevronDown size={15} className="bm-select-icon" />
                    </div>
                  </div>
                  <div className="bm-field">
                    <label className="bm-label" htmlFor="bm-date"><CalendarDays size={13}/> Preferred date <span className="bm-optional">(optional)</span></label>
                    <input id="bm-date" className="bm-input" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <div className="bm-field">
                    <label className="bm-label" htmlFor="bm-notes"><MessageSquare size={13}/> Notes <span className="bm-optional">(optional)</span></label>
                    <textarea id="bm-notes" className="bm-textarea" rows={3} placeholder="e.g. braids for my daughter, she has long hair…" value={notes} onChange={(e) => setNotes(e.target.value)} />
                  </div>
                  <div className="bm-footer">
                    <p className="bm-note">This opens WhatsApp with a pre-filled message to the branch you chose. NIK will reply with available times.</p>
                    <button type="submit" className="bm-btn-green">Send on WhatsApp <ArrowUpRight size={16}/></button>
                  </div>
                </motion.form>
              )}

              {/* ── Sent / success ── */}
              {screen === "sent" && (
                <motion.div
                  key="sent"
                  className="bm-success"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="bm-success-icon">✳</div>
                  <h3>WhatsApp is opening!</h3>
                  <p>Your booking request is ready to send. NIK will reply with available times as soon as possible.</p>
                  <div className="bm-success-actions">
                    <button className="bm-btn-green" onClick={onClose}>Done</button>
                    <button className="bm-btn-review" onClick={() => setScreen("review")}>
                      <Star size={14} /> Leave a review
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Review form ── */}
              {screen === "review" && (
                <motion.form
                  key="review"
                  className="bm-form"
                  onSubmit={handleReview}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.22 }}
                >
                  {/* name read-only pre-fill */}
                  <div className="bm-field">
                    <label className="bm-label"><User size={13}/> Your name</label>
                    <input
                      className="bm-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  {/* star picker */}
                  <div className="bm-field">
                    <label className="bm-label"><Star size={13}/> Rating</label>
                    <div className="bm-stars">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`bm-star-btn${s <= (hovered || rstars) ? " lit" : ""}`}
                          onMouseEnter={() => setHovered(s)}
                          onMouseLeave={() => setHovered(0)}
                          onClick={() => setRstars(s)}
                          aria-label={`${s} star${s > 1 ? "s" : ""}`}
                        >
                          <Star size={22} fill={s <= (hovered || rstars) ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* message */}
                  <div className="bm-field">
                    <label className="bm-label" htmlFor="bm-review-msg"><MessageSquare size={13}/> Your message</label>
                    <textarea
                      id="bm-review-msg"
                      className="bm-textarea"
                      rows={4}
                      placeholder="Tell us about your NIK experience…"
                      value={rmessage}
                      onChange={(e) => setRmessage(e.target.value)}
                      required
                    />
                  </div>

                  <div className="bm-footer">
                    <p className="bm-note">Your review will appear in the Kind Words section on the homepage.</p>
                    <button type="submit" className="bm-btn-green">Post review <ArrowUpRight size={16}/></button>
                  </div>
                </motion.form>
              )}

              {/* ── Thanks ── */}
              {screen === "thanks" && (
                <motion.div
                  key="thanks"
                  className="bm-success"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="bm-success-icon">✳</div>
                  <h3>Thank you, {name.trim() || "friend"}!</h3>
                  <p>Your review is now live in the Kind Words section. We really appreciate you taking the time.</p>
                  <div className="bm-success-actions">
                    <button className="bm-btn-green" onClick={onClose}>Close</button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
