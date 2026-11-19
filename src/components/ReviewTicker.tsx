"use client";

import { Star } from "lucide-react";
import { useReviews } from "./ReviewsContext";

export default function ReviewTicker() {
  const { reviews } = useReviews();
  /* duplicate for seamless loop — need at least enough cards to fill the viewport twice */
  const track = reviews.length < 6
    ? [...reviews, ...reviews, ...reviews]
    : [...reviews, ...reviews];

  return (
    <div className="ticker-wrap">
      <div className="ticker-track" style={{ animationDuration: `${track.length * 5}s` }}>
        {track.map((r, i) => (
          <div key={i} className="ticker-card">
            <div className="ticker-stars">
              {Array.from({ length: r.stars }).map((_, s) => (
                <Star key={s} size={12} fill="currentColor" />
              ))}
            </div>
            <p className="ticker-text">&ldquo;{r.text}&rdquo;</p>
            <span className="ticker-name">— {r.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
