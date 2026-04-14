"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Material = {
  id: string;
  name: string;
  quantity: string;
  points: number;
  location: string;
  description: string;
  image: string;
  owner: string;
  requestedBy?: string;
  isUserMaterial?: boolean;
  status: "available" | "requested" | "completed";
};

export default function AddMaterialPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [points, setPoints] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentUser = localStorage.getItem("renova-current-user") || "Tom";

    const newMaterial: Material = {
      id: Date.now().toString(),
      name,
      quantity,
      points: Number(points),
      location,
      description,
      image:
        image ||
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
      owner: currentUser,
      requestedBy: undefined,
      isUserMaterial: true,
      status: "available",
    };

    const existingMaterials = localStorage.getItem("renova-materials");
    const parsedMaterials: Material[] = existingMaterials
      ? JSON.parse(existingMaterials)
      : [];

    const updatedMaterials = [...parsedMaterials, newMaterial];
    localStorage.setItem("renova-materials", JSON.stringify(updatedMaterials));

    setSuccessMessage("Service added successfully!");

setTimeout(() => {
  router.push("/services");
}, 1200);
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-8 py-16">
      <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
          Add a material
        </p>

        <h1 className="mt-4 text-4xl font-bold text-green-700">
          Share a material with the community
        </h1>

        <p className="mt-4 text-green-700">
          Add reusable materials and help reduce renovation waste.
        </p>

        {successMessage && (
  <div className="mb-6 rounded-2xl bg-green-100 px-4 py-3 text-center font-semibold text-green-700 animate-pulse">
    {successMessage}
  </div>
)}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Material name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Example: White paint"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Quantity
            </label>
            <input
              type="text"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Example: 2 pots"
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
              placeholder="Example: 4"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
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
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the material and its condition"
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
            Publish material
          </button>
        </form>
      </div>
    </main>
  );
}