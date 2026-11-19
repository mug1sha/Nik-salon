"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Review {
  name: string;
  stars: number;
  text: string;
}

const seed: Review[] = [
  { name: "Amina K.",    stars: 5, text: "My daughter absolutely loves coming here. The staff are so gentle and patient — she leaves every time with the biggest smile!" },
  { name: "David M.",   stars: 5, text: "Best kids' haircut experience in Kigali. Clean, professional and they really know how to handle little ones. Highly recommend!" },
  { name: "Grace N.",   stars: 5, text: "I've been coming to NIK Adults for over a year. Consistent quality every single time. My go-to salon without question." },
  { name: "Patrick R.", stars: 5, text: "The braids they did for my son were absolutely perfect. He felt like a little king walking out. We'll be back every month!" },
  { name: "Sandrine U.",stars: 5, text: "Warm atmosphere, skilled stylists and they always listen to what you want. NIK is special — not just a salon, it's an experience." },
  { name: "Eric T.",    stars: 4, text: "Great service and friendly team. The Silverback Mall branch is very convenient. Will definitely keep coming back." },
  { name: "Claire B.",  stars: 5, text: "Took my twins for their first haircut and the staff made it so fun and stress-free. I can't recommend NIK Kids enough." },
  { name: "Joseph N.",  stars: 5, text: "The transformation my wife got at NIK Adults was incredible. She walked in and walked out a whole new person. Brilliant work." },
  { name: "Diane M.",   stars: 5, text: "I always leave feeling confident and beautiful. The team really cares about every detail. This is my happy place!" },
  { name: "Kevin H.",   stars: 5, text: "Professional, creative and so welcoming. Finding NIK was one of the best things that happened to my hair this year." },
];

interface ReviewsCtx {
  reviews: Review[];
  addReview: (r: Review) => void;
}

const ReviewsContext = createContext<ReviewsCtx>({
  reviews: seed,
  addReview: () => {},
});

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(seed);
  const addReview = (r: Review) => setReviews((prev) => [r, ...prev]);
  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export const useReviews = () => useContext(ReviewsContext);
