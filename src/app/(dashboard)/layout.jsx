"use client";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import PrivateRoute from "@/private/PrivateRoute";
import { useState } from "react";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PrivateRoute>
      <div className="flex h-screen overflow-hidden bg-white">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block h-full">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-60 transition-opacity duration-300 ${
            isSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div
            className={`absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-300 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar mobile onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen relative">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="flex-1 overflow-auto bg-[#F6F6F6] p-4 lg:p-6 custom_scroll">
            <div className="w-full">{children}</div>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}
