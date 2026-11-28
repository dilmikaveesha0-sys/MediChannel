"use client";

import { useState } from "react";

type Feedback = {
  id: number;
  appointmentId: number;
  rating: number;
  comment: string | null;
  status: string;
  createdAt: string;
};

export default function FeedbackPage() {
  const [search, setSearch] = useState("");

  // Backend connection is pending.
  // Real database records will be loaded later.
  const feedbackList: Feedback[] = [];

  const filteredFeedback = feedbackList.filter((feedback) => {
    const searchText = search.toLowerCase();

    return (
      String(feedback.id).includes(searchText) ||
      String(feedback.appointmentId).includes(searchText) ||
      (feedback.comment ?? "").toLowerCase().includes(searchText) ||
      feedback.status.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Feedback Management
        </h1>

        <p className="mb-6 text-gray-600">
          View and manage patient feedback records.
        </p>

        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Total Feedback</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {feedbackList.length}
          </h2>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Feedback Records
            </h2>

            <input
              type="text"
              placeholder="Search feedback..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-blue-500 sm:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-700">
                  <th className="p-3">Feedback ID</th>
                  <th className="p-3">Appointment ID</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Comment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Created At</th>
                </tr>
              </thead>

              <tbody>
                {filteredFeedback.length > 0 ? (
                  filteredFeedback.map((feedback) => (
                    <tr key={feedback.id} className="border-b text-sm">
                      <td className="p-3">{feedback.id}</td>
                      <td className="p-3">{feedback.appointmentId}</td>
                      <td className="p-3">{feedback.rating}</td>
                      <td className="p-3">
                        {feedback.comment || "—"}
                      </td>
                      <td className="p-3">{feedback.status}</td>
                      <td className="p-3">{feedback.createdAt}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-gray-500"
                    >
                      No feedback records available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Backend connection is pending. Feedback records will appear here
            when the backend is connected.
          </p>
        </div>
      </div>
    </main>
  );
}