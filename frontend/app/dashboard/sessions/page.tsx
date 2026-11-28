
"use client";

import { useState } from "react";

type Session = {
  id: number;
  doctorId: number;
  roomId: number;
  sessionDate: string;
  startTime: string;
  endTime: string;
  sessionType: string;
  capacity: number;
  consultationFee: number;
  status: string;
};

export default function SessionsPage() {
  const [search, setSearch] = useState("");

  // Backend connection will be added later.
  const sessions: Session[] = [];

  const filteredSessions = sessions.filter((session) =>
    String(session.id).includes(search) ||
    String(session.doctorId).includes(search) ||
    session.status.toLowerCase().includes(search.toLowerCase())
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
            Sessions
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View and manage doctor consultation sessions.
          </p>
        </div>

        {/* Summary Card */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Sessions
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {sessions.length}
          </h2>

          <p className="mt-3 text-xs text-slate-400">
            Count will update when backend data is connected.
          </p>
        </div>

        {/* Session Records */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Session Records
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Consultation session information from MediChannel.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search session..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 sm:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Session ID</th>
                  <th className="px-5 py-4">Doctor ID</th>
                  <th className="px-5 py-4">Room ID</th>
                  <th className="px-5 py-4">Session Date</th>
                  <th className="px-5 py-4">Start Time</th>
                  <th className="px-5 py-4">End Time</th>
                  <th className="px-5 py-4">Session Type</th>
                  <th className="px-5 py-4">Capacity</th>
                  <th className="px-5 py-4">Fee</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session) => (
                    <tr
                      key={session.id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-5 py-4 font-medium text-slate-700">
                        {session.id}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {session.doctorId}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {session.roomId}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {session.sessionDate}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {session.startTime}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {session.endTime}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {session.sessionType}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {session.capacity}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {session.consultationFee}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {session.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="px-6 py-16 text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
                        +
                      </div>

                      <p className="font-semibold text-slate-700">
                        No session records available
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Session records will appear here after
                        connecting to the backend.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
            MediChannel Session Management
          </div>
        </section>

      </div>
    </main>
  );
}
