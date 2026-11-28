"use client";

import { useState } from "react";

type Room = {
  id: number;
  roomNumber: string;
  roomName: string;
  locationDescription: string | null;
  isActive: boolean;
};

export default function RoomsPage() {
  const [search, setSearch] = useState("");

  // Real room records will load after backend connection.
  const roomList: Room[] = [];

  const filteredRooms = roomList.filter((room) => {
    const searchText = search.toLowerCase();

    return (
      String(room.id).includes(searchText) ||
      room.roomNumber.toLowerCase().includes(searchText) ||
      room.roomName.toLowerCase().includes(searchText) ||
      (room.locationDescription ?? "").toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Room Management
        </h1>

        <p className="mb-6 text-gray-600">
          View and manage hospital room records.
        </p>

        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Total Rooms</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {roomList.length}
          </h2>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Room Records
            </h2>

            <input
              type="text"
              placeholder="Search rooms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-blue-500 sm:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-700">
                  <th className="p-3">Room ID</th>
                  <th className="p-3">Room Number</th>
                  <th className="p-3">Room Name</th>
                  <th className="p-3">Location Description</th>
                  <th className="p-3">Active Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room) => (
                    <tr key={room.id} className="border-b text-sm">
                      <td className="p-3">{room.id}</td>
                      <td className="p-3">{room.roomNumber}</td>
                      <td className="p-3">{room.roomName}</td>
                      <td className="p-3">
                        {room.locationDescription || "—"}
                      </td>
                      <td className="p-3">
                        {room.isActive ? "Active" : "Inactive"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-gray-500"
                    >
                      No room records available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Backend connection is pending. Room records will appear here
            when the backend is connected.
          </p>
        </div>
      </div>
    </main>
  );
}