"use client";

import { useState } from "react";

type AuditLog = {
  id: number;
  userId: number;
  action: string;
  eventTimestamp: string;
  ipAddress: string | null;
  details: string | null;
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");

  // Real audit log records will load after backend connection.
  const auditLogs: AuditLog[] = [];

  const filteredLogs = auditLogs.filter((log) => {
    const searchText = search.toLowerCase();

    return (
      String(log.id).includes(searchText) ||
      String(log.userId).includes(searchText) ||
      log.action.toLowerCase().includes(searchText) ||
      (log.ipAddress ?? "").toLowerCase().includes(searchText) ||
      (log.details ?? "").toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Audit Logs
        </h1>

        <p className="mb-6 text-gray-600">
          View system activities and audit records.
        </p>

        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Total Audit Logs</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {auditLogs.length}
          </h2>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Audit Log Records
            </h2>

            <input
              type="text"
              placeholder="Search audit logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-blue-500 sm:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-700">
                  <th className="p-3">Log ID</th>
                  <th className="p-3">User ID</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Event Timestamp</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>

              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b text-sm">
                      <td className="p-3">{log.id}</td>
                      <td className="p-3">{log.userId}</td>
                      <td className="p-3">{log.action}</td>
                      <td className="p-3">{log.eventTimestamp}</td>
                      <td className="p-3">{log.ipAddress || "—"}</td>
                      <td className="p-3">{log.details || "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-gray-500"
                    >
                      No audit log records available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Backend connection is pending. Audit log records will appear here
            when the backend is connected.
          </p>
        </div>
      </div>
    </main>
  );
}