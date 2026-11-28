"use client";

import { useState } from "react";

type Notice = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  expiresAt: string | null;
  isPublished: boolean;
};

export default function NoticesPage() {
  const [search, setSearch] = useState("");

  // Real notice records will load after backend connection.
  const noticeList: Notice[] = [];

  const filteredNotices = noticeList.filter((notice) => {
    const searchText = search.toLowerCase();

    return (
      String(notice.id).includes(searchText) ||
      notice.title.toLowerCase().includes(searchText) ||
      notice.content.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Notice Management
        </h1>

        <p className="mb-6 text-gray-600">
          View and manage system notices.
        </p>

        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Total Notices</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {noticeList.length}
          </h2>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Notice Records
            </h2>

            <input
              type="text"
              placeholder="Search notices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-blue-500 sm:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-700">
                  <th className="p-3">Notice ID</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Content</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3">Expires At</th>
                  <th className="p-3">Published</th>
                </tr>
              </thead>

              <tbody>
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice) => (
                    <tr key={notice.id} className="border-b text-sm">
                      <td className="p-3">{notice.id}</td>
                      <td className="p-3">{notice.title}</td>
                      <td className="p-3">{notice.content}</td>
                      <td className="p-3">{notice.createdAt}</td>
                      <td className="p-3">{notice.expiresAt || "—"}</td>
                      <td className="p-3">
                        {notice.isPublished ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-gray-500"
                    >
                      No notice records available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Backend connection is pending. Notice records will appear here
            when the backend is connected.
          </p>
        </div>
      </div>
    </main>
  );
}