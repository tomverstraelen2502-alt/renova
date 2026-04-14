"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddServicePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [points, setPoints] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const currentUser = localStorage.getItem("renova-current-user") || "Tom";

    const newService = {
      id: Date.now().toString(),
      name,
      duration,
      points: Number(points),
      location,
      description,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      owner: currentUser,
      status: "available",
      isUserService: true,
    };

    const existing = localStorage.getItem("renova-services");
    const parsed = existing ? JSON.parse(existing) : [];

    const updated = [...parsed, newService];
    localStorage.setItem("renova-services", JSON.stringify(updated));
    setSuccessMessage("Added successfully!");

    setSuccessMessage("Service added successfully!");

setTimeout(() => {
  router.push("/services");
}, 1200);
  };

  return (
    <main className="max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-4xl font-bold text-green-700">
        Add a service
      </h1>
      {successMessage && (
  <div className="mb-6 rounded-2xl bg-green-100 px-4 py-3 text-center font-semibold text-green-700 animate-pulse">
    {successMessage}
  </div>
)}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <input
          placeholder="Service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <input
          placeholder="Duration (e.g. 2 hours)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <input
          placeholder="Points"
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        <button className="bg-green-700 text-white px-6 py-3 rounded-full">
          Publish service
        </button>
      </form>
    </main>
  );
}