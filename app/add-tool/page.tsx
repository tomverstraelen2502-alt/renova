"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Tool = {
  id: string;
  name: string;
  points: number;
  location: string;
  category: string;
  description: string;
  image: string;
  owner: string;
  requestedBy?: string;
  isUserTool?: boolean;
  status: "available" | "requested" | "completed";
};

export default function AddToolPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Power tool");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentUser = localStorage.getItem("renova-current-user") || "Tom";

    const newTool: Tool = {
      id: Date.now().toString(),
      name,
      points: Number(points),
      location,
      category,
      description,
      image:
        image ||
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
      owner: currentUser,
      requestedBy: undefined,
      isUserTool: true,
      status: "available",
    };

    const existingTools = localStorage.getItem("renova-tools");
    const parsedTools: Tool[] = existingTools ? JSON.parse(existingTools) : [];

    const updatedTools = [...parsedTools, newTool];
    localStorage.setItem("renova-tools", JSON.stringify(updatedTools));

    setSuccessMessage("Service added successfully!");

setTimeout(() => {
  router.push("/services");
}, 1200);
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-8 py-16">
      <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
          Add a tool
        </p>

        <h1 className="mt-4 text-4xl font-bold text-green-700">
          Share a tool with the community
        </h1>

        <p className="mt-4 text-green-700">
          Add a tool you can lend and help other users renovate more sustainably.
        </p>
        {successMessage && (
  <div className="mb-6 rounded-2xl bg-green-100 px-4 py-3 text-center font-semibold text-green-700 animate-pulse">
    {successMessage}
  </div>
)}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Tool name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Example: Electric drill"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            >
              <option>Power tool</option>
              <option>Hand tool</option>
              <option>Outdoor tool</option>
              <option>Heavy equipment</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Location
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Example: Liège"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Points required
            </label>
            <input
              type="number"
              required
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="Example: 3"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the tool and its condition"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Photo URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste an image link here"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Publish tool
          </button>
        </form>
      </div>
    </main>
  );
}