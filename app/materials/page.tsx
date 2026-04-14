"use client";

import { useEffect, useState } from "react";

type MaterialStatus = "available" | "requested" | "completed";

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
  status: MaterialStatus;
};

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
const [currentUser, setCurrentUser] = useState("");
const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
const [locationFilter, setLocationFilter] = useState("all");
const [sortOption, setSortOption] = useState("default");

  const saveMaterials = (updatedMaterials: Material[]) => {
    setMaterials(updatedMaterials);
    localStorage.setItem("renova-materials", JSON.stringify(updatedMaterials));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this material?")) return;

    const updatedMaterials = materials.filter((material) => material.id !== id);
    saveMaterials(updatedMaterials);
  };

  const handleRequest = (id: string) => {
    const updatedMaterials = materials.map((material) =>
      material.id === id
        ? {
            ...material,
            status: "requested" as MaterialStatus,
            requestedBy: currentUser,
          }
        : material
    );

    saveMaterials(updatedMaterials);
  };

  useEffect(() => {
    const defaultMaterials: Material[] = [
      {
        id: "1",
        name: "White paint",
        quantity: "2 pots",
        points: 4,
        location: "Liège",
        description: "Leftover paint in good condition for small interior works.",
        image:
          "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
        owner: "Lucien",
        isUserMaterial: false,
        status: "available",
      },
      {
        id: "2",
        name: "Wood planks",
        quantity: "6 pieces",
        points: 6,
        location: "Ans",
        description: "Reusable wooden planks for DIY and renovation projects.",
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
        owner: "Hugo",
        isUserMaterial: false,
        status: "available",
      },
      {
        id: "3",
        name: "Leftover tiles",
        quantity: "12 tiles",
        points: 7,
        location: "Herstal",
        description: "Neutral floor tiles, useful for small repairs.",
        image:
          "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=800&q=80",
        owner: "Tom",
        isUserMaterial: false,
        status: "available",
      },
    ];

    try {
     const storedMaterials = localStorage.getItem("renova-materials");
const storedUser = localStorage.getItem("renova-current-user");

if (storedMaterials) {
  const parsedMaterials = JSON.parse(storedMaterials).map(
    (material: Material) => ({
      ...material,
      status: material.status || "available",
    })
  );
  setMaterials(parsedMaterials);
} else {
  setMaterials([]);
}

if (storedUser) {
  setCurrentUser(storedUser);
} else {
  setCurrentUser("");
}
    } catch (error) {
      console.error("Error reading localStorage:", error);
      localStorage.setItem("renova-materials", JSON.stringify(defaultMaterials));
      setMaterials(defaultMaterials);
      setCurrentUser("Tom");
    }
  }, []);

    const availableLocations = Array.from(
  new Set(materials.map((material) => material.location))
);

const filteredMaterials = materials.filter((material) => {
  const matchesSearch = material.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "all" ? true : material.status === statusFilter;

  const matchesLocation =
    locationFilter === "all"
      ? true
      : material.location === locationFilter;

  return matchesSearch && matchesStatus && matchesLocation;
});

  return (
    <main className="min-h-screen px-8 py-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
              Materials
            </p>
            <h1 className="mt-2 text-4xl font-bold text-green-700">
              Available materials
            </h1>
            <div className="mb-8 grid gap-4 rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-stone-200 md:grid-cols-4">
  <div>
    <label className="mb-2 block text-sm font-medium text-green-700">
      Search
    </label>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search a material"
      className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-green-700">
      Status
    </label>
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900"
    >
      <option value="all">All</option>
      <option value="available">Available</option>
      <option value="requested">Requested</option>
      <option value="completed">Completed</option>
    </select>
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-green-700">
      Location
    </label>
    <select
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900"
    >
      <option value="all">All locations</option>
      {availableLocations.map((location) => (
        <option key={location} value={location}>
          {location}
        </option>
      ))}
    </select>
  </div>
  <div>
  <label className="mb-2 block text-sm font-medium text-green-700">
    Sort by
  </label>
  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900"
  >
    <option value="default">Default</option>
    <option value="low">Points: low to high</option>
    <option value="high">Points: high to low</option>
  </select>
</div>
</div>
            <p className="mt-3 max-w-2xl text-green-700">
              Browse reusable materials shared by the Renova community.
            </p>
          </div>

          <a
            href="/add-material"
            className="inline-flex rounded-full bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Add a material
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className="overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-stone-200"
            >
              <img
                src={material.image}
                alt={material.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold text-green-700">
                    {material.name}
                  </h2>

                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
                    {material.status}
                  </span>
                </div>

                <p className="mt-2 text-stone-700">
                  <span className="font-semibold">Owner:</span>{" "}
                  <a
                    href={`/users/${encodeURIComponent(material.owner)}`}
                    className="font-semibold text-green-700 hover:underline"
                  >
                    {material.owner}
                  </a>
                </p>

                <p className="mt-1 text-stone-700">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {material.quantity}
                </p>

                <p className="mt-1 text-stone-700">
                  <span className="font-semibold">Points:</span>{" "}
                  {material.points}
                </p>

                <p className="mt-1 text-stone-700">
                  <span className="font-semibold">Location:</span>{" "}
                  {material.location}
                </p>

                {material.requestedBy && (
                  <p className="mt-1 text-stone-700">
                    <span className="font-semibold">Requested by:</span>{" "}
                    <a
                      href={`/users/${encodeURIComponent(material.requestedBy)}`}
                      className="font-semibold text-green-700 hover:underline"
                    >
                      {material.requestedBy}
                    </a>
                  </p>
                )}

                <p className="mt-3 text-stone-600">{material.description}</p>

                <div className="mt-5 flex flex-col gap-2">
                  {material.status === "available" &&
                    material.owner !== currentUser && (
                      <button
                        onClick={() => handleRequest(material.id)}
                        className="rounded-full bg-green-700 px-4 py-2 text-white transition hover:bg-green-800"
                      >
                        Request
                      </button>
                    )}

                  {material.status === "available" &&
                    material.owner === currentUser && (
                      <div className="rounded-full bg-stone-200 px-4 py-2 text-center text-sm font-semibold text-stone-700">
                        Your material
                      </div>
                    )}

                  {material.status === "requested" && (
                    <div className="rounded-full bg-amber-100 px-4 py-2 text-center text-sm font-semibold text-amber-700">
                      Waiting for owner confirmation
                    </div>
                  )}

                  {material.status === "completed" && (
                    <div className="rounded-full bg-stone-200 px-4 py-2 text-center text-sm font-semibold text-stone-700">
                      Exchange completed
                    </div>
                  )}

                  {material.isUserMaterial && material.owner === currentUser && (
                    <button
                      onClick={() => handleDelete(material.id)}
                      className="rounded-full border border-red-500 px-4 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}