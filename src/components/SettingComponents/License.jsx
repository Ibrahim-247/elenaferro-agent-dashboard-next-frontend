import React from "react";

export default function License() {
  return (
    <div>
      <section className="bg-white rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-6">License Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-gray-500">License Number</p>
            <p className="font-medium">Current PGA-12346678</p>
          </div>

          <div>
            <p className="text-gray-500">License Type</p>
            <p className="font-medium">Broker</p>
          </div>

          <div>
            <p className="text-gray-500">Expiration Date</p>
            <p className="font-medium">31 Dec 2026</p>
          </div>

          <div>
            <p className="text-gray-500">License State</p>
            <p className="font-medium">Georgia</p>
          </div>

          <div className="space-y-1.5">
            <p className="text-gray-500">Status</p>
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs">
              Active
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
