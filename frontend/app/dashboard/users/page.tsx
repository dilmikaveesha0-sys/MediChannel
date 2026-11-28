"use client";

import { useState } from "react";

type User = {
  id: number;
  emailHash: string;
  role: string;
  status: string;
  createdAt: string;
};

export default function UsersPage() {
  const [search, setSearch] = useState("");

  // Real user records will load after backend connection.
  const userList: User[] = [];

  const filteredUsers = userList.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      String(user.id).includes(searchText) ||
      user.emailHash.toLowerCase().includes(searchText) ||
      user.role.toLowerCase().includes(searchText) ||
      user.status.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          User Management
        </h1>

        <p className="mb-6 text-gray-600">
          View and manage system user records.
        </p>

        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {userList.length}
          </h2>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              User Records
            </h2>

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-blue-500 sm:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-700">
                  <th className="p-3">User ID</th>
                  <th className="p-3">Email Hash</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Created At</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b text-sm">
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">{user.emailHash}</td>
                      <td className="p-3">{user.role}</td>
                      <td className="p-3">{user.status}</td>
                      <td className="p-3">{user.createdAt}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-gray-500"
                    >
                      No user records available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Backend connection is pending. User records will appear here
            when the backend is connected.
          </p>
        </div>
      </div>
    </main>
  );
}