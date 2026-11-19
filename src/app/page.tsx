"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownRight, ArrowUpRight, Menu, X,
  MapPin, Phone, Star, Instagram, Clock,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import BookingModal from "@/components/BookingModal";
import GalleryReel from "@/components/GalleryReel";

const branches = [
  { kicker: "KICUKIRO",    name: "Silverback Mall",         area: "Gisimenti / Kicukiro, Kigali",  phone: "+250 791 675 841", tel: "+250791675841", maps: "Silverback+Mall+Kigali+Rwanda" },
  { kicker: "NYARUTARAMA", name: "Hotel Villa Portofino",   area: "Nyarutarama, Kigali",            phone: "+250 788 692 042", tel: "+250788692042", maps: "Hotel+Villa+Portofino+Nyarutarama+Kigali" },
  { kicker: "GIPOROSO",    name: "Kabeza / KABCO Area",     area: "Giporoso, Kigali",               phone: "+250 793 768 541", tel: "+250793768541", maps: "Kabeza+Giporoso+Kigali+Rwanda" },
  { kicker: "KIBAGABAGA",  name: "Kibagabaga",              area: "Kibagabaga, Kigali",             phone: "+250 795 020 070", tel: "+250795020070", maps: "Kibagabaga+Kigali+Rwanda" },
];

export default function Home() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const openBook  = () => setBookingOpen(true);

  return (
    <main>
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      <div className="announcement">
        <span className="rainbow-dot" /> A little more joy in every visit <span className="announcement-star">✳</span>
      </div>

      {/* ── Header ── */}
      <header className="site-header">
        <a href="#" className="brand" aria-label="NIK Salon home">
          <Image src="/images/nik-logo.png" alt="NIK Salon logo" width={112} height={74} priority />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#experience">Our experiences</a>
          <a href="#gallery">Style gallery</a>
          <a href="#about">Our story</a>
          <a href="#locations">Find us</a>
        </nav>
        <button className="header-cta" onClick={openBook}>Book a visit <ArrowUpRight size={16}/></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X/> : <Menu/>}
        </button>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav className="mobile-menu"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            {["Our experiences", "Style gallery", "Our story", "Find us"].map((item, i) => (
              <a key={item}
                href={["#experience", "#gallery", "#about", "#locations"][i]}
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  const id = ["experience", "gallery", "about", "locations"][i];
                  setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 320);
                }}
              >{item}<ArrowUpRight size={16}/></a>
            ))}
            <button className="mobile-book" onClick={() => { closeMenu(); setTimeout(openBook, 350); }}>
              Book a visit <ArrowUpRight size={16}/>
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-shape hero-shape-one"/>
        <div className="hero-shape hero-shape-two"/>
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> THE NIK EXPERIENCE</div>
          <h1>Good hair days.<br/><span>Great little</span><br/>moments.</h1>
          <p className="hero-lede">A place for little royals and grown-ups to feel seen, celebrated and beautifully themselves.</p>
          <div className="hero-actions">
            <a className="button button-green" href="#experience">Explore NIK <ArrowUpRight size={17}/></a>
            <button className="text-link" onClick={openBook}>Book an appointment <ArrowDownRight size={17}/></button>
          </div>
          <div className="hero-proof">
            <div className="proof-stars"><Star/><Star/><Star/><Star/><Star/></div>
            <div><strong>4.9 out of 5</strong><span>174 Google reviews*</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-main">
            <Image
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=95&crop=faces,center"
              alt="Confident woman with beautiful styled hair"
              fill sizes="(max-width:650px) 76vw, 40vw"
              style={{objectFit:"cover", objectPosition:"center top"}} priority
            />
          </div>
          <div className="hero-image-small">
            <Image
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=90&crop=faces,center"
              alt="Child getting a joyful haircut at the salon"
              fill sizes="(max-width:650px) 36vw, 20vw"
              style={{objectFit:"cover", objectPosition:"center top"}}
            />
          </div>
          <div className="hero-sticker"><span>STYLE</span><strong>with<br/>a smile</strong><i>✳</i></div>
          <div className="hero-caption"><span className="caption-dot"/> LITTLE ROYALS. BIG CONFIDENCE.</div>
        </div>
        <div className="hero-bottom-note"><span>SCROLL TO DISCOVER</span><div/></div>
      </section>

      {/* ── Intro strip ── */}
      <section className="intro-strip">
        <p>ONE NIK FAMILY</p><span className="strip-star">✳</span>
        <p>TWO BEAUTIFUL EXPERIENCES</p><span className="strip-star">✳</span>
        <p>ENDLESS WAYS TO SHINE</p>
      </section>

      {/* ── Experience ── */}
      <section className="experience section-pad" id="experience">
        <Reveal>
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line"/> FIND YOUR NIK</div>
              <h2>Two worlds.<br/><em>One NIK.</em></h2>
            </div>
            <p>From their very first style to your signature look, there&apos;s a NIK experience made for every generation.</p>
          </div>
        </Reveal>
        <div className="experience-grid">
          <Reveal className="experience-card kids-card">
            <div className="experience-photo">
              <Image src="https://images.unsplash.com/photo-1519238263530-99d8f4d6c7a4?auto=format&fit=crop&w=1100&q=90"
                alt="Happy child smiling" fill sizes="(max-width:650px) 88vw, 44vw" style={{objectFit:"cover"}} />
              <span className="photo-tag">FOR OUR LITTLE ROYALS</span>
            </div>
            <div className="experience-info">
              <div>
                <span className="card-kicker">PLAYFUL · GENTLE · JOYFUL</span>
                <h3>NIK <span>Kids</span></h3>
                <p>Big smiles, lovely styles and a little extra magic in every visit.</p>
              </div>
              <button className="round-arrow" onClick={openBook} aria-label="Book NIK Kids"><ArrowUpRight/></button>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="experience-card adults-card">
            <div className="experience-photo">
              <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1100&q=90"
                alt="Confident adult portrait" fill sizes="(max-width:650px) 88vw, 44vw" style={{objectFit:"cover"}} />
              <span className="photo-tag">FOR THE GROWN-UPS</span>
            </div>
            <div className="experience-info">
              <div>
                <span className="card-kicker">CONFIDENT · REFINED · YOU</span>
                <h3>NIK <span>Adults</span></h3>
                <p>Your style, your expression, your moment to feel amazing.</p>
              </div>
              <button className="round-arrow navy-arrow" onClick={openBook} aria-label="Book NIK Adults"><ArrowUpRight/></button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Manifesto ── */}
      <section className="manifesto" id="about">
        <div className="manifesto-pattern"/>
        <div className="manifesto-inner">
          <div className="manifesto-mark">N<span>✳</span>K</div>
          <div className="eyebrow light-eyebrow"><span className="eyebrow-line"/> MORE THAN A HAIR APPOINTMENT</div>
          <h2>Every visit should<br/>leave you <em>glowing.</em></h2>
          <p>At NIK, it&apos;s about more than the final look. It&apos;s the warm welcome, the care in every detail and the confidence that comes with feeling your best.</p>
          <button className="button button-yellow" onClick={openBook}>Come say hello <ArrowUpRight size={17}/></button>
        </div>
        <div className="manifesto-orbit orbit-one"/><div className="manifesto-orbit orbit-two"/>
      </section>

      {/* ── Gallery ── */}
      <GalleryReel onBook={openBook} />

      {/* ── Reviews ── */}
      <section className="review-section">
        <div className="review-spark">✳</div>
        <div className="eyebrow"><span className="eyebrow-line"/> KIND WORDS, BIG SMILES</div>
        <h2>Love looks good<br/>on <em>everyone.</em></h2>
        <div className="review-number">4.9<span>★</span></div>
        <p>Rated by the people who make NIK what it is.</p>
        <div className="review-foot">
          <span>174 GOOGLE REVIEWS*</span>
          <span>*Rating and review count supplied for this demo; verify before publishing.</span>
        </div>
      </section>

      {/* ── Locations ── */}
      <section className="location-section section-pad" id="locations">
        <Reveal>
          <div className="location-header">
            <div className="eyebrow"><span className="eyebrow-line"/> COME ON IN</div>
            <h2>Your next<br/><em>happy place.</em></h2>
            <p>Four NIK locations across Kigali. Find your nearest branch and let&apos;s make your next visit a lovely one.</p>
            <div className="location-hours">
              <Clock size={15}/>
              <div>
                <span><strong>Mon – Thu</strong>&nbsp; 09:00 – 19:00</span>
                <span><strong>Fri – Sun</strong>&nbsp; 08:00 – 20:00</span>
              </div>
            </div>
            <p className="location-disclaimer">Hours and contacts sourced from NIK&apos;s social profile. Confirm with the salon before publishing.</p>
          </div>
        </Reveal>
        <div className="branch-grid">
          {branches.map((b) => (
            <Reveal key={b.kicker} className="branch-card">
              <div className="branch-icon"><MapPin size={18}/></div>
              <span className="card-kicker">NIK {b.kicker}</span>
              <h3>{b.name}</h3>
              <p>{b.area}</p>
              <div className="branch-contact">
                <a href={`tel:${b.tel}`}><Phone size={13}/>{b.phone}</a>
                <a href={`https://wa.me/${b.tel.replace("+","")}`} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={12}/></a>
              </div>
              <a className="branch-directions" href={`https://www.google.com/maps/search/?api=1&query=${b.maps}`} target="_blank" rel="noreferrer">
                Get directions <ArrowUpRight size={13}/>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Booking banner ── */}
      <section className="booking-banner">
        <div className="booking-deco">✳</div>
        <div><span>READY WHEN YOU ARE</span><h2>Let&apos;s make it<br/><em>a NIK day.</em></h2></div>
        <button className="button button-navy" onClick={openBook}>Book your visit <ArrowUpRight size={18}/></button>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Image src="/images/nik-logo.png" alt="NIK Salon logo" width={112} height={74}/>
            <p>Beautiful hair experiences<br/>for every generation.</p>
          </div>
          <div className="footer-col">
            <span>EXPLORE</span>
            <a href="#experience">NIK Kids</a>
            <a href="#experience">NIK Adults</a>
            <a href="#gallery">Style gallery</a>
            <a href="#about">Our story</a>
          </div>
          <div className="footer-col">
            <span>VISIT & CONNECT</span>
            <a href="#locations">Kicukiro · Silverback Mall</a>
            <a href="#locations">Nyarutarama · Villa Portofino</a>
            <a href="#locations">Giporoso · Kabeza / KABCO</a>
            <a href="#locations">Kibagabaga</a>
          </div>
          <div className="footer-col">
            <span>HOURS & CONTACT</span>
            <a href="tel:+250791675841">+250 791 675 841 (Kicukiro)</a>
            <a href="https://www.instagram.com/niksalon_kids/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13}/></a>
            <button className="footer-book-link" onClick={openBook}>Book a visit <ArrowUpRight size={13}/></button>
            <span className="footer-hours">Mon–Thu 09:00–19:00 · Fri–Sun 08:00–20:00</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NIK Salon. All rights reserved.</span>
          <span>MADE WITH A LITTLE EXTRA JOY <b>✳</b></span>
        </div>
      </footer>
    </main>
  );
}
