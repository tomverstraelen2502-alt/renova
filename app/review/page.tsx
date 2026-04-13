"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Review = {
  id: string;
  author: string;
  target: string;
  toolName: string;
  score: number;
  comment: string;
};

function ReviewPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const target = searchParams.get("target") || "";
  const toolName = searchParams.get("tool") || "";

  const author = useMemo(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("renova-current-user") || "";
  }, []);

  const [score, setScore] = useState("5");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newReview: Review = {
      id: Date.now().toString(),
      author,
      target,
      toolName,
      score: Number(score),
      comment,
    };

    const existingReviews = localStorage.getItem("renova-reviews");
    const parsedReviews: Review[] = existingReviews ? JSON.parse(existingReviews) : [];

    const updatedReviews = [...parsedReviews, newReview];
    localStorage.setItem("renova-reviews", JSON.stringify(updatedReviews));

    router.push(`/users/${encodeURIComponent(target)}`);
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-8 py-16">
      <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
          Leave feedback
        </p>

        <h1 className="mt-4 text-4xl font-bold text-green-700">
          Review {target}
        </h1>

        <p className="mt-4 text-green-700">
          Share your feedback about the exchange for{" "}
          <span className="font-semibold">{toolName}</span>.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Score
            </label>
            <select
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Comment
            </label>
            <textarea
              rows={5}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your experience"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Publish review
          </button>
        </form>
      </div>
    </main>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<main className="mx-auto min-h-screen max-w-3xl px-8 py-16">Loading...</main>}>
      <ReviewPageContent />
    </Suspense>
  );
}