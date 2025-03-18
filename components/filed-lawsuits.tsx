"use client"

import { useState } from "react"

// Mock data for filed lawsuits
const MOCK_FILED_LAWSUITS = [
  {
    id: "filed-1",
    company: "TechCorp Data Breach",
    compensation: "$75-150",
    filedDate: "2025-01-15",
    status: "Pending Review",
    estimatedPayment: "June 2025",
  },
  {
    id: "filed-2",
    company: "RetailCo Overcharging Settlement",
    compensation: "$42.50",
    filedDate: "2025-02-03",
    status: "Approved",
    estimatedPayment: "May 2025",
  },
  {
    id: "filed-3",
    company: "BankCorp Fee Settlement",
    compensation: "$50-100",
    filedDate: "2025-02-28",
    status: "Processing",
    estimatedPayment: "August 2025",
  },
]

export function FiledLawsuits() {
  const [filter, setFilter] = useState<string>("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-50"
      case "Pending Review":
        return "text-yellow-600 bg-yellow-50"
      case "Processing":
        return "text-blue-600 bg-blue-50"
      case "Rejected":
        return "text-red-600 bg-red-50"
      case "Paid":
        return "text-purple-600 bg-purple-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const filteredLawsuits =
    filter === "all" ? MOCK_FILED_LAWSUITS : MOCK_FILED_LAWSUITS.filter((lawsuit) => lawsuit.status === filter)

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Filed Claims</h2>
        <p className="text-gray-600 mt-1">Track the status of your filed class action claims.</p>
      </div>

      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "all" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 border"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Pending Review")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "Pending Review" ? "bg-yellow-100 text-yellow-700" : "bg-white text-gray-700 border"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("Processing")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "Processing" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 border"
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setFilter("Approved")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "Approved" ? "bg-green-100 text-green-700" : "bg-white text-gray-700 border"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Paid")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "Paid" ? "bg-purple-100 text-purple-700" : "bg-white text-gray-700 border"
            }`}
          >
            Paid
          </button>
        </div>
      </div>

      <div className="divide-y">
        {filteredLawsuits.length > 0 ? (
          filteredLawsuits.map((lawsuit) => (
            <div key={lawsuit.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-medium text-lg">{lawsuit.company}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      Compensation: {lawsuit.compensation}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      Filed: {new Date(lawsuit.filedDate).toLocaleDateString()}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lawsuit.status)}`}
                    >
                      Status: {lawsuit.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">Estimated Payment: {lawsuit.estimatedPayment}</p>
                </div>

                <div className="mt-4 md:mt-0">
                  <button className="px-3 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">No claims matching the selected filter.</div>
        )}
      </div>
    </div>
  )
}

