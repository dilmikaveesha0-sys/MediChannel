
"use client";

import { useState } from "react";

type Patient = {
  id: number;
  userId: number;
  fullName: string;
  dateOfBirth: string;
  phone: string;
  address: string | null;
};

export default function PatientsPage() {
  const [search, setSearch] = useState("");

  // Backend connection will be added after database access is available.
  const patients: Patient[] = [];

  const filteredPatients = patients.filter((patient) =>
    patient.fullName.toLowerCase().includes(search.toLowerCase()) ||
    patient.phone.includes(search)
  );

  return (
    <main className="min-h-screen bg-slate-100 p-5 md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-teal-700">
              MediChannel / Dashboard
            </p>
            <h1 className="text-3xl font-bold text-slate-800">
              Patients
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage and view patient information.
            </p>
          </div>

          <div className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm">
            Patient Management
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Patients
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {patients.length}
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50 text-3xl text-teal-700">
              ♥
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Count will update when backend data is connected.
          </p>
        </div>

        {/* Patient Table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Patient Records
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Patient information from the MediChannel system.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name or phone..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 sm:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Patient ID</th>
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Date of Birth</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Address</th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {patient.id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {patient.fullName}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {patient.dateOfBirth}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {patient.phone}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {patient.address || "Not provided"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
                        ♥
                      </div>
                      <p className="font-semibold text-slate-700">
                        No patient records available
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Patient records will appear here after connecting
                        to the backend.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
            MediChannel Patient Management
          </div>
        </section>

      </div>
    </main>
  );
}
