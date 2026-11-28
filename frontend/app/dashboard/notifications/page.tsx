
"use client";

import { useState } from "react";

type Notification = {
  id: number;
  userId: number;
  message: string;
  notificationType: string;
  isRead: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const [search, setSearch] = useState("");

  // Backend connection will be added later.
  const notifications: Notification[] = [];

  const filteredNotifications = notifications.filter((item) =>
    String(item.id).includes(search) ||
    String(item.userId).includes(search) ||
    item.message.toLowerCase().includes(search.toLowerCase())
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
            Notifications
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View system notifications and messages.
          </p>
        </div>

        {/* Summary Card */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Notifications
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {notifications.length}
          </h2>

          <p className="mt-3 text-xs text-slate-400">
            Count will update when backend data is connected.
          </p>
        </div>

        {/* Notification Records */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Notification Records
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Notification information from the MediChannel system.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search notifications..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 sm:w-80"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Notification ID</th>
                  <th className="px-5 py-4">User ID</th>
                  <th className="px-5 py-4">Message</th>
                  <th className="px-5 py-4">Notification Type</th>
                  <th className="px-5 py-4">Is Read</th>
                  <th className="px-5 py-4">Created At</th>
                </tr>
              </thead>

              <tbody>
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-5 py-4 font-medium text-slate-700">
                        {item.id}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {item.userId}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {item.message}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {item.notificationType}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {item.isRead ? "Yes" : "No"}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {item.createdAt}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
                        +
                      </div>

                      <p className="font-semibold text-slate-700">
                        No notification records available
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Notifications will appear here after
                        connecting to the backend.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
            MediChannel Notification Management
          </div>
        </section>

      </div>
    </main>
  );
}
