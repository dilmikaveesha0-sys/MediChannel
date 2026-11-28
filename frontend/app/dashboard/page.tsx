
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: "▦", name: "Dashboard", path: "/dashboard" },
  { icon: "♙", name: "Users", path: "/dashboard/users" },
  { icon: "♥", name: "Patients", path: "/dashboard/patients" },
  { icon: "✚", name: "Doctors", path: "/dashboard/doctors" },
  { icon: "▤", name: "Specialisations", path: "/dashboard/specialisations" },
  { icon: "▣", name: "Appointments", path: "/dashboard/appointments" },
  { icon: "◷", name: "Sessions", path: "/dashboard/sessions" },
  { icon: "▧", name: "Consultations", path: "/dashboard/consultations" },
  { icon: "♢", name: "Notifications", path: "/dashboard/notifications" },
  { icon: "☆", name: "Feedback", path: "/dashboard/feedback" },
  { icon: "▱", name: "Notices", path: "/dashboard/notices" },
  { icon: "▣", name: "Rooms", path: "/dashboard/rooms" },
  { icon: "◉", name: "Audit Logs", path: "/dashboard/audit-logs" },
];

const overviewItems = [
  {
    title: "Total Users",
    icon: "♙",
    description: "Registered system users",
    endpoint: "/api/users",
  },
  {
    title: "Patients",
    icon: "♥",
    description: "Patient records",
    endpoint: "/api/patients",
  },
  {
    title: "Doctors",
    icon: "✚",
    description: "Registered doctors",
    endpoint: "/api/doctors",
  },
  {
    title: "Appointments",
    icon: "▣",
    description: "Appointment records",
    endpoint: "/api/appointments",
  },
];

export default function DashboardPage() {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-slate-100 md:flex">

      {/* Sidebar */}
      <aside className="w-full bg-slate-950 text-white md:min-h-screen md:w-64 md:shrink-0">

        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500 text-2xl font-bold">
            +
          </div>

          <div>
            <h1 className="text-xl font-bold">MediChannel</h1>
            <p className="text-xs text-slate-400">
              Healthcare Management
            </p>
          </div>
        </div>

        <nav className="p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Main Menu
          </p>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-teal-600 text-white"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="mx-4 mb-5 mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold text-white">
            MediChannel System
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Healthcare administration and management portal.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <section className="min-w-0 flex-1">

        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5 md:px-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Admin Dashboard
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Welcome to MediChannel Management System
            </p>
          </div>

          <div className="rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700">
            Admin Panel
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 md:p-10">

          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800">
              Overview
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Summary of MediChannel system records
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {overviewItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-2xl text-teal-700">
                    {item.icon}
                  </div>

                  <span className="text-xs font-medium text-slate-400">
                    API
                  </span>
                </div>

                <h4 className="mt-5 text-base font-semibold text-slate-700">
                  {item.title}
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>

                <p className="mt-4 break-all rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                  {item.endpoint}
                </p>

                <p className="mt-3 text-xs font-medium text-amber-600">
                  Awaiting backend connection
                </p>
              </div>
            ))}
          </div>

          {/* System Information */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800">
                System Information
              </h3>

              <div className="mt-5 space-y-4">
                <div className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">
                    Application
                  </span>
                  <span className="text-sm font-semibold text-slate-700">
                    MediChannel
                  </span>
                </div>

                <div className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">
                    Frontend
                  </span>
                  <span className="text-sm font-semibold text-teal-700">
                    Next.js
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-sm text-slate-500">
                    Database
                  </span>
                  <span className="text-sm font-semibold text-slate-700">
                    PostgreSQL
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800">
                Backend Integration
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                The dashboard is prepared to use the existing
                MediChannel backend endpoints.
              </p>

              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-800">
                  Connection pending
                </p>
                <p className="mt-1 text-xs leading-5 text-amber-700">
                  Backend and database connection will be
                  tested before displaying actual records.
                </p>
              </div>
            </div>

          </div>

          <footer className="mt-10 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
            © 2026 MediChannel. All rights reserved.
          </footer>

        </div>
      </section>
    </main>
  );
}
