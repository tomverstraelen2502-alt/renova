"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const storedPoints = localStorage.getItem("renova-points");

    if (storedPoints) {
      setPoints(Number(storedPoints));
    } else {
      localStorage.setItem("renova-points", "10"); // points de départ
      setPoints(10);
    }
  }, []);

  return (
    <main className="min-h-screen px-8 py-12">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-green-700">
          Your dashboard
        </h1>

        <div className="mt-8 rounded-[24px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <h2 className="text-xl font-semibold text-green-700">
            Your points
          </h2>

          <p className="mt-4 text-5xl font-bold text-stone-900">
            {points} pts
          </p>

          <p className="mt-4 text-stone-600">
            Earn points by sharing tools, materials or services with the community.
          </p>
        </div>
      </section>
    </main>
  );
}