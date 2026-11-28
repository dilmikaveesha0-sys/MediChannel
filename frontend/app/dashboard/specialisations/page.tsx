
"use client";

import { useState } from "react";

type Specialisation = {
  id: number;
  name: string;
  description: string | null;
};

export default function SpecialisationsPage() {
  const [search, setSearch] = useState("");

  // Backend connection will be added later.
  const specialisations: Specialisation[] = [];

  const filteredSpecialisations = specialisations.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-100 p-5 md:p-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-teal-700">
            MediChannel / Dashboard
          </p>
          <h1 className="text-3xl font-bold text-slate-800">
            Specialisations
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            View available medical specialisations.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Specialisations
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {specialisations.length}
          </h2>
          <p className="mt-3 text-xs text-slate-400">
            Count will update when backend data is connected.
          </p>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Specialisation Records
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Medical specialisation information from MediChannel.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search specialisation..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 sm:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Specialisation Name</th>
                  <th className="px-6 py-4">Description</th>
                </tr>
              </thead>

              <tbody>
                {filteredSpecialisations.length > 0 ? (
                  filteredSpecialisations.map((item) => (
                    <tr key={item.id} className="border-t border-slate-100">
                      <td className="px-6 py-4 text-slate-700">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {item.description || "Not provided"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-16 text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
                        +
                      </div>
                      <p className="font-semibold text-slate-700">
                        No specialisation records available
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Records will appear here after connecting
                        to the backend.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
            MediChannel Specialisation Management
          </div>
        </section>

      </div>
    </main>
  );
}
