
"use client";

import { useState } from "react";

type Appointment = {
  id: number;
  patientId: number;
  sessionId: number;
  appointmentNumber: number;
  status: string;
  paymentStatus: string;
  amount: number;
  bookedAt: string;
};

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");

  // Backend connection will be added later.
  const appointments: Appointment[] = [];

  const filteredAppointments = appointments.filter((appointment) =>
    String(appointment.id).includes(search) ||
    String(appointment.patientId).includes(search) ||
    String(appointment.appointmentNumber).includes(search)
  );

  return (
    <main className="min-h-screen bg-slate-100 p-5 md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-teal-700">
            MediChannel / Dashboard
          </p>

          <h1 className="text-3xl font-bold text-slate-800">
            Appointments
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View and manage patient appointments.
          </p>
        </div>

        {/* Summary Card */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Appointments
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {appointments.length}
          </h2>

          <p className="mt-3 text-xs text-slate-400">
            Count will update when backend data is connected.
          </p>
        </div>

        {/* Appointment Records */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Appointment Records
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Appointment information from the MediChannel system.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search appointment..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 sm:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Appointment ID</th>
                  <th className="px-5 py-4">Patient ID</th>
                  <th className="px-5 py-4">Session ID</th>
                  <th className="px-5 py-4">Appointment No.</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Payment Status</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Booked At</th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-5 py-4 font-medium text-slate-700">
                        {appointment.id}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {appointment.patientId}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {appointment.sessionId}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {appointment.appointmentNumber}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {appointment.status}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {appointment.paymentStatus}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {appointment.amount}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {appointment.bookedAt}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
                        +
                      </div>

                      <p className="font-semibold text-slate-700">
                        No appointment records available
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Appointment records will appear here after
                        connecting to the backend.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
            MediChannel Appointment Management
          </div>
        </section>

      </div>
    </main>
  );
}
