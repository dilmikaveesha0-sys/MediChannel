
"use client";

import { useState } from "react";

type Doctor = {
  id: number;
  userId: number;
  specialisationId: number;
  slmcNumber: string;
  qualifications: string;
  displayName: string;
};

export default function DoctorsPage() {
  const [search, setSearch] = useState("");

  // Backend connection will be added later.
  const doctors: Doctor[] = [];

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.displayName.toLowerCase().includes(search.toLowerCase()) ||
    doctor.slmcNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-100 p-5 md:p-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-teal-700">
            MediChannel / Dashboard
          </p>
          <h1 className="text-3xl font-bold text-slate-800">
            Doctors
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            View and manage doctor information.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Doctors</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {doctors.length}
          </h2>
          <p className="mt-3 text-xs text-slate-400">
            Count will update when backend data is connected.
          </p>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Doctor Records
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Doctor information from the MediChannel system.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search doctor or SLMC number..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 sm:w-80"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Doctor ID</th>
                  <th className="px-6 py-4">Doctor Name</th>
                  <th className="px-6 py-4">SLMC Number</th>
                  <th className="px-6 py-4">Qualifications</th>
                  <th className="px-6 py-4">Specialisation ID</th>
                </tr>
              </thead>

              <tbody>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <tr key={doctor.id} className="border-t border-slate-100">
                      <td className="px-6 py-4 text-slate-700">
                        {doctor.id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {doctor.displayName}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {doctor.slmcNumber}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {doctor.qualifications}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {doctor.specialisationId}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
                        +
                      </div>
                      <p className="font-semibold text-slate-700">
                        No doctor records available
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Doctor records will appear here after connecting
                        to the backend.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
            MediChannel Doctor Management
          </div>
        </section>

      </div>
    </main>
  );
}
