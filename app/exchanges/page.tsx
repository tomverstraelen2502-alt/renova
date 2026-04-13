"use client";

import { useEffect, useState } from "react";

type ExchangeStatus = "available" | "requested" | "completed";

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
  status: ExchangeStatus;
};

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
  status: ExchangeStatus;
};

type Service = {
  id: string;
  name: string;
  duration: string;
  points: number;
  location: string;
  description: string;
  image: string;
  owner: string;
  requestedBy?: string;
  isUserService?: boolean;
  status: ExchangeStatus;
};

type ExchangeItem = {
  id: string;
  type: "tool" | "material" | "service";
  name: string;
  points: number;
  location: string;
  description: string;
  owner: string;
  requestedBy?: string;
  status: ExchangeStatus;
};

type User = {
  name: string;
  email: string;
  password: string;
  city: string;
  role: string;
  photo: string;
  points: number;
};

export default function ExchangesPage() {
  const [items, setItems] = useState<ExchangeItem[]>([]);
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedTools = localStorage.getItem("renova-tools");
    const storedMaterials = localStorage.getItem("renova-materials");
    const storedServices = localStorage.getItem("renova-services");
    const storedUser = localStorage.getItem("renova-current-user");
    const storedUsers = localStorage.getItem("renova-users");

    const tools: Tool[] = storedTools ? JSON.parse(storedTools) : [];
    const materials: Material[] = storedMaterials ? JSON.parse(storedMaterials) : [];
    const services: Service[] = storedServices ? JSON.parse(storedServices) : [];

    const normalizedTools: ExchangeItem[] = tools.map((tool) => ({
      id: tool.id,
      type: "tool",
      name: tool.name,
      points: tool.points,
      location: tool.location,
      description: tool.description,
      owner: tool.owner,
      requestedBy: tool.requestedBy,
      status: tool.status,
    }));

    const normalizedMaterials: ExchangeItem[] = materials.map((material) => ({
      id: material.id,
      type: "material",
      name: material.name,
      points: material.points,
      location: material.location,
      description: material.description,
      owner: material.owner,
      requestedBy: material.requestedBy,
      status: material.status,
    }));

    const normalizedServices: ExchangeItem[] = services.map((service) => ({
      id: service.id,
      type: "service",
      name: service.name,
      points: service.points,
      location: service.location,
      description: service.description,
      owner: service.owner,
      requestedBy: service.requestedBy,
      status: service.status,
    }));

    setItems([...normalizedTools, ...normalizedMaterials, ...normalizedServices]);

    if (storedUser) {
      setCurrentUser(storedUser);
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const saveAll = (updatedItems: ExchangeItem[], updatedUsers: User[]) => {
    setItems(updatedItems);
    setUsers(updatedUsers);

    const existingTools = localStorage.getItem("renova-tools");
    if (existingTools) {
      const parsedExistingTools: Tool[] = JSON.parse(existingTools);
      const mergedTools = parsedExistingTools.map((tool) => {
        const updated = updatedItems.find(
          (item) => item.type === "tool" && item.id === tool.id
        );
        return updated
          ? {
              ...tool,
              owner: updated.owner,
              requestedBy: updated.requestedBy,
              status: updated.status,
            }
          : tool;
      });
      localStorage.setItem("renova-tools", JSON.stringify(mergedTools));
    }

    const existingMaterials = localStorage.getItem("renova-materials");
    if (existingMaterials) {
      const parsedExistingMaterials: Material[] = JSON.parse(existingMaterials);
      const mergedMaterials = parsedExistingMaterials.map((material) => {
        const updated = updatedItems.find(
          (item) => item.type === "material" && item.id === material.id
        );
        return updated
          ? {
              ...material,
              owner: updated.owner,
              requestedBy: updated.requestedBy,
              status: updated.status,
            }
          : material;
      });
      localStorage.setItem("renova-materials", JSON.stringify(mergedMaterials));
    }

    const existingServices = localStorage.getItem("renova-services");
    if (existingServices) {
      const parsedExistingServices: Service[] = JSON.parse(existingServices);
      const mergedServices = parsedExistingServices.map((service) => {
        const updated = updatedItems.find(
          (item) => item.type === "service" && item.id === service.id
        );
        return updated
          ? {
              ...service,
              owner: updated.owner,
              requestedBy: updated.requestedBy,
              status: updated.status,
            }
          : service;
      });
      localStorage.setItem("renova-services", JSON.stringify(mergedServices));
    }

    localStorage.setItem("renova-users", JSON.stringify(updatedUsers));

    const currentUserData = updatedUsers.find((user) => user.name === currentUser);
    if (currentUserData) {
      localStorage.setItem(
        "renova-current-user-data",
        JSON.stringify(currentUserData)
      );
      localStorage.setItem("renova-points", String(currentUserData.points));
    }
  };

  const handleConfirmExchange = (
    itemId: string,
    itemType: "tool" | "material" | "service"
  ) => {
    const item = items.find((i) => i.id === itemId && i.type === itemType);
    if (!item || !item.requestedBy) return;

    const requester = users.find((user) => user.name === item.requestedBy);
    const owner = users.find((user) => user.name === item.owner);

    if (!requester || !owner) {
      alert("Could not find the users involved in this exchange.");
      return;
    }

    if (requester.points < item.points) {
      alert(`${requester.name} does not have enough points for this exchange.`);
      return;
    }

    const updatedUsers = users.map((user) => {
      if (user.name === requester.name) {
        return { ...user, points: user.points - item.points };
      }

      if (user.name === owner.name) {
        return { ...user, points: user.points + item.points };
      }

      return user;
    });

    const updatedItems = items.map((i) =>
      i.id === itemId && i.type === itemType
        ? { ...i, status: "completed" as ExchangeStatus }
        : i
    );

    saveAll(updatedItems, updatedUsers);

    alert("Exchange confirmed successfully.");
  };

  const receivedRequests = items.filter(
    (item) => item.owner === currentUser && item.status === "requested"
  );

  const sentRequests = items.filter(
    (item) => item.requestedBy === currentUser && item.status === "requested"
  );

  const completedExchanges = items.filter(
    (item) =>
      item.status === "completed" &&
      (item.owner === currentUser || item.requestedBy === currentUser)
  );

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-8 py-16">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
          Exchanges
        </p>
        <h1 className="mt-2 text-4xl font-bold text-green-700">
          My exchanges
        </h1>
        <p className="mt-3 text-green-700">
          Follow the requests you sent and the requests you received.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <h2 className="text-2xl font-bold text-green-700">
            Requests received
          </h2>

          {receivedRequests.length === 0 ? (
            <p className="mt-4 text-stone-600">
              You have not received any requests yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {receivedRequests.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="rounded-[20px] bg-stone-50 p-5 ring-1 ring-stone-200"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
                    {item.type}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-green-700">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-stone-700">
                    <span className="font-semibold">Requested by:</span>{" "}
                    <a
                      href={`/users/${encodeURIComponent(item.requestedBy || "")}`}
                      className="text-green-700 hover:underline"
                    >
                      {item.requestedBy}
                    </a>
                  </p>

                  <p className="mt-1 text-stone-700">
                    <span className="font-semibold">Points:</span> {item.points}
                  </p>

                  <button
                    onClick={() => handleConfirmExchange(item.id, item.type)}
                    className="mt-4 rounded-full bg-green-700 px-5 py-2 font-semibold text-white transition hover:bg-green-800"
                  >
                    Confirm exchange
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <h2 className="text-2xl font-bold text-green-700">
            Requests sent
          </h2>

          {sentRequests.length === 0 ? (
            <p className="mt-4 text-stone-600">
              You have not sent any requests yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {sentRequests.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="rounded-[20px] bg-stone-50 p-5 ring-1 ring-stone-200"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
                    {item.type}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-green-700">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-stone-700">
                    <span className="font-semibold">Owner:</span>{" "}
                    <a
                      href={`/users/${encodeURIComponent(item.owner)}`}
                      className="text-green-700 hover:underline"
                    >
                      {item.owner}
                    </a>
                  </p>

                  <p className="mt-1 text-stone-700">
                    <span className="font-semibold">Points:</span> {item.points}
                  </p>

                  <p className="mt-2 font-medium text-amber-700">
                    Waiting for owner confirmation
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="mt-8 rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
        <h2 className="text-2xl font-bold text-green-700">
          Completed exchanges
        </h2>

        {completedExchanges.length === 0 ? (
          <p className="mt-4 text-stone-600">
            No completed exchanges yet.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {completedExchanges.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="rounded-[20px] bg-stone-50 p-5 ring-1 ring-stone-200"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
                  {item.type}
                </p>

                <h3 className="mt-2 text-xl font-semibold text-green-700">
                  {item.name}
                </h3>

                <p className="mt-2 text-stone-700">
                  <span className="font-semibold">Owner:</span> {item.owner}
                </p>

                <p className="mt-1 text-stone-700">
                  <span className="font-semibold">Borrower:</span> {item.requestedBy}
                </p>

                <p className="mt-1 text-stone-700">
                  <span className="font-semibold">Points transferred:</span> {item.points}
                </p>

                <div className="mt-4 flex gap-3">
                  {currentUser !== item.owner && item.owner && (
                    <a
                      href={`/review?target=${encodeURIComponent(item.owner)}&tool=${encodeURIComponent(item.name)}`}
                      className="rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                      Review owner
                    </a>
                  )}

                  {currentUser !== item.requestedBy && item.requestedBy && (
                    <a
                      href={`/review?target=${encodeURIComponent(item.requestedBy)}&tool=${encodeURIComponent(item.name)}`}
                      className="rounded-full border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
                    >
                      Review borrower
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}