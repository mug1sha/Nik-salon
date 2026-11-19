"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, MapPin, User, CalendarDays, MessageSquare, ChevronDown, Scissors, Star } from "lucide-react";

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

export default function BookingModal({ isOpen, onClose }: Props) {
  const [name, setName]         = useState("");
  const [branch, setBranch]     = useState(0);
  const [type, setType]         = useState<"Kids" | "Adults">("Adults");
  const [date, setDate]         = useState("");
  const [notes, setNotes]       = useState("");
  const [sent, setSent]         = useState(false);
  const overlayRef              = useRef<HTMLDivElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset form when closed
      setTimeout(() => {
        setName(""); setBranch(0); setType("Adults");
        setDate(""); setNotes(""); setSent(false);
      }, 350);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

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

    const url = `https://wa.me/${b.tel}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank", "noreferrer");
    setSent(true);
  };

  // Minimum date = today
  const today = new Date().toISOString().split("T")[0];

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
            aria-label="Book a visit"
          >
            {/* Header */}
            <div className="bm-header">
              <div>
                <p className="bm-eyebrow">YOUR NEXT NIK MOMENT</p>
                <h2 className="bm-title">Book a visit</h2>
              </div>
              <button className="bm-close" onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            {/* Success state */}
            {sent ? (
              <div className="bm-success">
                <div className="bm-success-icon">✳</div>
                <h3>WhatsApp is opening!</h3>
                <p>Your booking request is ready to send. NIK will reply with available times as soon as possible.</p>
                <div className="bm-success-actions">
                  <button className="bm-btn-green" onClick={onClose}>Done</button>
                  <a
                    className="bm-btn-review"
                    href="https://www.google.com/maps/search/?api=1&query=NIK+Salon+Kigali+Rwanda"
                    target="_blank"
                    rel="noreferrer"
                    onClick={onClose}
                  >
                    <Star size={14} /> Leave a review
                  </a>
                </div>
              </div>
            ) : (
              <form className="bm-form" onSubmit={handleSend}>

                {/* Kids / Adults toggle */}
                <div className="bm-field">
                  <label className="bm-label"><User size={13}/> Appointment type</label>
                  <div className="bm-toggle">
                    <button
                      type="button"
                      className={`bm-toggle-btn${type === "Kids" ? " active kids" : ""}`}
                      onClick={() => setType("Kids")}
                    >
                      <Scissors size={14} /> Kids
                    </button>
                    <button
                      type="button"
                      className={`bm-toggle-btn${type === "Adults" ? " active adults" : ""}`}
                      onClick={() => setType("Adults")}
                    >
                      <User size={14} /> Adults
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div className="bm-field">
                  <label className="bm-label" htmlFor="bm-name"><User size={13}/> Your name</label>
                  <input
                    id="bm-name"
                    className="bm-input"
                    type="text"
                    placeholder="e.g. Amina"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>

                {/* Branch */}
                <div className="bm-field">
                  <label className="bm-label" htmlFor="bm-branch"><MapPin size={13}/> Branch</label>
                  <div className="bm-select-wrap">
                    <select
                      id="bm-branch"
                      className="bm-select"
                      value={branch}
                      onChange={(e) => setBranch(Number(e.target.value))}
                    >
                      {BRANCHES.map((b, i) => (
                        <option key={b.tel} value={i}>{b.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={15} className="bm-select-icon" />
                  </div>
                </div>

                {/* Preferred date */}
                <div className="bm-field">
                  <label className="bm-label" htmlFor="bm-date"><CalendarDays size={13}/> Preferred date <span className="bm-optional">(optional)</span></label>
                  <input
                    id="bm-date"
                    className="bm-input"
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                {/* Notes */}
                <div className="bm-field">
                  <label className="bm-label" htmlFor="bm-notes"><MessageSquare size={13}/> Notes <span className="bm-optional">(optional)</span></label>
                  <textarea
                    id="bm-notes"
                    className="bm-textarea"
                    rows={3}
                    placeholder="e.g. braids for my daughter, she has long hair…"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="bm-footer">
                  <p className="bm-note">
                    This opens WhatsApp with a pre-filled message to the branch you chose. NIK will reply with available times.
                  </p>
                  <button type="submit" className="bm-btn-green">
                    Send on WhatsApp <ArrowUpRight size={16}/>
                  </button>
                </div>

              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
