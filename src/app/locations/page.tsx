"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Phone, Clock, Instagram } from "lucide-react";

const branches = [
  {
    kicker: "KICUKIRO",
    name: "Silverback Mall",
    area: "Gisimenti / Kicukiro, Kigali",
    phone: "+250 791 675 841",
    tel: "+250791675841",
    maps: "Silverback+Mall+Kigali+Rwanda",
    primary: true,
  },
  {
    kicker: "NYARUTARAMA",
    name: "Hotel Villa Portofino",
    area: "Nyarutarama, Kigali",
    phone: "+250 788 692 042",
    tel: "+250788692042",
    maps: "Hotel+Villa+Portofino+Nyarutarama+Kigali",
    primary: false,
  },
  {
    kicker: "GIPOROSO",
    name: "Kabeza / KABCO Area",
    area: "Giporoso, Kigali",
    phone: "+250 793 768 541",
    tel: "+250793768541",
    maps: "Kabeza+Giporoso+Kigali+Rwanda",
    primary: false,
  },
  {
    kicker: "KIBAGABAGA",
    name: "Kibagabaga",
    area: "Kibagabaga, Kigali",
    phone: "+250 795 020 070",
    tel: "+250795020070",
    maps: "Kibagabaga+Kigali+Rwanda",
    primary: false,
  },
];

export default function LocationsPage() {
  const wa = "https://wa.me/250791675841?text=" + encodeURIComponent("Hello NIK Salon! I'd like to book an appointment.");

  return (
    <main className="inner-page">
      <header className="inner-header">
        <Link href="/" className="inner-logo">
          <Image src="/images/nik-logo.png" alt="NIK Salon logo" width={105} height={70} />
        </Link>
        <nav>
          <Link href="/kids">Kids</Link>
          <Link href="/adults">Adults</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/locations">Locations</Link>
        </nav>
        <a className="header-cta" href={wa} target="_blank" rel="noreferrer">
          Book a visit <ArrowUpRight size={16} />
        </a>
      </header>

      {/* Hero */}
      <section className="loc-hero">
        <div className="loc-hero-copy">
          <Link href="/" className="back-link">← Back to NIK home</Link>
          <div className="eyebrow"><span className="eyebrow-line" /> COME ON IN</div>
          <h1>Find your<br /><em>nearest NIK.</em></h1>
          <p>Four branches across Kigali — each one ready to welcome little royals and grown-ups alike.</p>
          <div className="loc-hours-pill">
            <Clock size={15} />
            <div>
              <span><strong>Mon – Thu</strong>&nbsp; 09:00 – 19:00</span>
              <span><strong>Fri – Sun</strong>&nbsp; 08:00 – 20:00</span>
            </div>
          </div>
        </div>
        <div className="loc-hero-art">
          <div className="loc-art-circle loc-circle-green" />
          <div className="loc-art-circle loc-circle-yellow" />
          <div className="loc-art-text">
            <span>4 LOCATIONS</span>
            <strong>KIGALI,<br />RWANDA</strong>
            <i>✳</i>
          </div>
        </div>
      </section>

      {/* Branch cards */}
      <section className="loc-branches">
        <div className="eyebrow"><span className="eyebrow-line" /> OUR BRANCHES</div>
        <h2>Four ways to<br /><em>reach NIK.</em></h2>
        <div className="loc-branch-grid">
          {branches.map((b) => (
            <article key={b.kicker} className={`loc-branch-card${b.primary ? " loc-branch-primary" : ""}`}>
              <div className="loc-branch-top">
                <div className="loc-branch-icon"><MapPin size={18} /></div>
                {b.primary && <span className="loc-primary-badge">Main branch</span>}
              </div>
              <span className="card-kicker">NIK {b.kicker}</span>
              <h3>{b.name}</h3>
              <p className="loc-area">{b.area}</p>
              <div className="loc-branch-contacts">
                <a href={`tel:${b.tel}`} className="loc-contact-row">
                  <Phone size={13} />{b.phone}
                </a>
                <a href={`https://wa.me/${b.tel.replace("+", "")}`} target="_blank" rel="noreferrer" className="loc-contact-row loc-wa">
                  WhatsApp <ArrowUpRight size={12} />
                </a>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${b.maps}`}
                target="_blank"
                rel="noreferrer"
                className="loc-directions"
              >
                Get directions <ArrowUpRight size={13} />
              </a>
            </article>
          ))}
        </div>
        
      </section>

      {/* Hours summary */}
      <section className="loc-hours-section">
        <div className="loc-hours-inner">
          <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> WHEN WE&apos;RE OPEN</div>
          <h2>Come in,<br /><em>we&apos;re ready.</em></h2>
          <div className="loc-hours-grid">
            <div className="loc-hours-row">
              <span>Monday – Thursday</span>
              <strong>09:00 – 19:00</strong>
            </div>
            <div className="loc-hours-row">
              <span>Friday – Sunday</span>
              <strong>08:00 – 20:00</strong>
            </div>
          </div>
          <p>Hours may vary by branch. Contact your nearest NIK to confirm.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="inner-cta">
        <div>
          <span>YOUR NEXT NIK MOMENT</span>
          <h2>Let&apos;s make it<br /><em>a lovely one.</em></h2>
        </div>
        <a className="button button-navy" href={wa} target="_blank" rel="noreferrer">
          Book via WhatsApp <ArrowUpRight size={17} />
        </a>
      </section>

      <footer className="inner-footer">
        <Link href="/">NIK SALON</Link>
        <span>Beauty for every generation.</span>
        <a href="https://www.instagram.com/niksalon_kids/" target="_blank" rel="noreferrer" className="inner-footer-ig">
          <Instagram size={14} /> Follow NIK <ArrowUpRight size={13} />
        </a>
      </footer>
    </main>
  );
}
