"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import BookingModal from "@/components/BookingModal";

export default function BookPage() {
  const [open, setOpen] = useState(false);

  // Open the modal as soon as the page mounts
  useEffect(() => { setOpen(true); }, []);

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
        <button className="header-cta" onClick={() => setOpen(true)}>
          Book a visit <ArrowUpRight size={16} />
        </button>
      </header>

      {/* Minimal backdrop content shown while (or after) the modal is open */}
      <section className="inner-hero" style={{ gridTemplateColumns: "1fr", textAlign: "center", justifyItems: "center" }}>
        <div className="inner-copy" style={{ maxWidth: 520, margin: "0 auto" }}>
          <Link href="/" className="back-link">
            <ArrowLeft size={14} /> Back to NIK home
          </Link>
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="eyebrow-line" /> YOUR NEXT NIK MOMENT
          </div>
          <h1>
            Let&apos;s plan<br />
            <em>your visit.</em>
          </h1>
          <p>
            Choose your branch, tell us whether it&apos;s for a child or an adult, and send your request directly to NIK via WhatsApp.
          </p>
          <button className="button button-green" onClick={() => setOpen(true)}>
            Open booking form <ArrowUpRight size={17} />
          </button>
        </div>
      </section>

      <BookingModal isOpen={open} onClose={() => setOpen(false)} />

      <footer className="inner-footer">
        <Link href="/">NIK SALON</Link>
        <span>Beauty for every generation.</span>
        <Link href="/locations">Find a location <ArrowUpRight size={14} /></Link>
      </footer>
    </main>
  );
}
