import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, MapPin, Phone, Sparkles } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  tag: string;
  cards: { title: string; description: string }[];
};

export default function InnerPage({ eyebrow, title, accent, description, image, tag, cards }: Props) {
  const whatsapp = "https://wa.me/250791675841?text=" + encodeURIComponent("Hello NIK Salon! I'd like to ask about " + title + ".");
  return (
    <main className="inner-page">
      <header className="inner-header">
        <Link href="/" className="inner-logo"><Image src="/images/nik-logo.png" alt="NIK Salon logo" width={105} height={70}/></Link>
        <nav><Link href="/kids">Kids</Link><Link href="/adults">Adults</Link><Link href="/gallery">Gallery</Link><Link href="/locations">Locations</Link></nav>
        <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer">Book a visit <ArrowUpRight size={16}/></a>
      </header>
      <section className="inner-hero">
        <div className="inner-copy">
          <Link href="/" className="back-link"><ArrowLeft size={14}/> Back to NIK home</Link>
          <div className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</div>
          <h1>{title}<br/><em>{accent}</em></h1>
          <p>{description}</p>
          <a className="button button-green" href={whatsapp} target="_blank" rel="noreferrer">Ask about an appointment <ArrowUpRight size={17}/></a>
        </div>
        <div className="inner-image"><Image src={image} alt={tag} fill sizes="(max-width:700px) 90vw, 45vw" style={{objectFit:"cover"}} /><span>{tag}</span></div>
      </section>
      <section className="inner-cards">
        <div className="eyebrow"><span className="eyebrow-line"/> THE NIK EXPERIENCE</div>
        <h2>Made for your<br/><em>moment.</em></h2>
        <div className="inner-card-grid">
          {cards.map((card, i) => <article key={card.title}><span>0{i+1}</span><Sparkles size={19}/><h3>{card.title}</h3><p>{card.description}</p></article>)}
        </div>
        <p className="inner-note">Service names and descriptions are concept placeholders. Confirm NIK's actual services and prices before publishing.</p>
      </section>
      <section className="inner-cta"><div><span>YOUR NEXT NIK MOMENT</span><h2>Let's make it<br/><em>a lovely one.</em></h2></div><a className="button button-navy" href={whatsapp} target="_blank" rel="noreferrer">Contact NIK <ArrowUpRight size={17}/></a></section>
      <footer className="inner-footer"><Link href="/">NIK SALON</Link><span>Beauty for every generation.</span><Link href="/locations">Find a location <ArrowUpRight size={14}/></Link></footer>
    </main>
  );
}
