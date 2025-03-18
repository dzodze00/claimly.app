"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bookmark } from "lucide-react"

// Mock data for eligible lawsuits
const MOCK_LAWSUITS = [
  {
    id: "lawsuit-1",
    company: "TechCorp Data Breach",
    compensation: "$75-150",
    deadline: "2025-06-30",
    description: "For users affected by the 2023 data breach exposing email addresses and passwords.",
    eligibility: "High",
    winProbability: "High",
    status: "Open",
    pointsCost: 5,
  },
  {
    id: "lawsuit-2",
    company: "SocialApp Privacy Settlement",
    compensation: "$25-50",
    deadline: "2025-08-15",
    description: "For users whose data was improperly shared with third parties between 2020-2022.",
    eligibility: "Medium",
    winProbability: "Medium",
    status: "Open",
    pointsCost: 5,
  },
  {
    id: "lawsuit-3",
    company: "RetailCo Overcharging Settlement",
    compensation: "$42.50",
    deadline: "2025-05-15",
    description: "For customers who were overcharged on shipping fees between 2019-2021.",
    eligibility: "High",
    winProbability: "High",
    status: "Open",
    pointsCost: 5,
  },
  {
    id: "lawsuit-4",
    company: "StreamingService Subscription Settlement",
    compensation: "$15-30",
    deadline: "2025-07-20",
    description: "For subscribers who were charged after cancellation between 2021-2023.",
    eligibility: "Medium",
    winProbability: "Low",
    status: "Open",
    pointsCost: 5,
  },
  {
    id: "lawsuit-5",
    company: "BankCorp Fee Settlement",
    compensation: "$50-100",
    deadline: "2025-10-15",
    description: "For account holders charged improper maintenance fees between 2020-2023.",
    eligibility: "High",
    winProbability: "Medium",
    status: "Open",
    pointsCost: 5,
  },
]

interface Lawsuit {
  id: string
  company: string
  compensation: string
  deadline: string
  description: string
  eligibility: string
  winProbability: string
  status: string
  pointsCost: number
}

interface EligibleLawsuitsProps {
  onFileClaim?: (lawsuitId: string) => void
  userPoints: number
  onBuyPoints?: () => void
  eligibleLawsuitIds?: string[]
}

export function EligibleLawsuits({ onFileClaim, userPoints, onBuyPoints, eligibleLawsuitIds }: EligibleLawsuitsProps) {
  const [selectedLawsuits, setSelectedLawsuits] = useState<string[]>([])
  const [savedLawsuits, setSavedLawsuits] = useState<string[]>([])
  const [showSavedOnly, setShowSavedOnly] = useState(false)

  // Load saved lawsuits from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedLawsuits")
    if (saved) {
      setSavedLawsuits(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage whenever savedLawsuits changes
  useEffect(() => {
    localStorage.setItem("savedLawsuits", JSON.stringify(savedLawsuits))
  }, [savedLawsuits])

  const toggleLawsuit = (id: string) => {
    if (selectedLawsuits.includes(id)) {
      setSelectedLawsuits(selectedLawsuits.filter((lawsuitId) => lawsuitId !== id))
    } else {
      setSelectedLawsuits([...selectedLawsuits, id])
    }
  }

  const toggleSaveLawsuit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (savedLawsuits.includes(id)) {
      setSavedLawsuits(savedLawsuits.filter((lawsuitId) => lawsuitId !== id))
    } else {
      setSavedLawsuits([...savedLawsuits, id])
    }
  }

  const handleFileClaim = (id: string) => {
    if (onFileClaim) {
      onFileClaim(id)
    }
  }

  const getEligibilityColor = (eligibility: string) => {
    switch (eligibility) {
      case "High":
        return "text-green-600 bg-green-50"
      case "Medium":
        return "text-yellow-600 bg-yellow-50"
      case "Low":
        return "text-orange-600 bg-orange-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getWinProbabilityColor = (probability: string) => {
    switch (probability) {
      case "High":
        return "text-green-600 bg-green-50"
      case "Medium":
        return "text-yellow-600 bg-yellow-50"
      case "Low":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  // Filter lawsuits based on eligibility if provided
  const filteredLawsuits = eligibleLawsuitIds
    ? MOCK_LAWSUITS.filter((lawsuit) => eligibleLawsuitIds.includes(lawsuit.id))
    : MOCK_LAWSUITS

  // Further filter if showing saved only
  const displayedLawsuits = showSavedOnly
    ? filteredLawsuits.filter((lawsuit) => savedLawsuits.includes(lawsuit.id))
    : filteredLawsuits

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Eligible Class Action Settlements</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-3 py-1.5 text-sm rounded-md border ${
                showSavedOnly ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-white border-gray-200 text-gray-600"
              }`}
            >
              {showSavedOnly ? "Show All" : "Saved Only"}
            </button>
          </div>
        </div>
        <p className="text-gray-600 mt-1">
          {eligibleLawsuitIds
            ? `You are eligible for ${displayedLawsuits.length} settlements based on your answers.`
            : showSavedOnly
              ? `Showing ${displayedLawsuits.length} saved settlements.`
              : `Based on your information, we've found ${MOCK_LAWSUITS.length} settlements you may be eligible for.`}
        </p>
      </div>

      <div className="divide-y">
        {displayedLawsuits.length > 0 ? (
          displayedLawsuits.map((lawsuit) => (
            <div key={lawsuit.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id={`lawsuit-${lawsuit.id}`}
                    checked={selectedLawsuits.includes(lawsuit.id)}
                    onChange={() => toggleLawsuit(lawsuit.id)}
                    className="mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-lg">{lawsuit.company}</h3>
                      <button
                        onClick={(e) => toggleSaveLawsuit(lawsuit.id, e)}
                        className="text-gray-400 hover:text-blue-500"
                        aria-label={savedLawsuits.includes(lawsuit.id) ? "Unsave lawsuit" : "Save lawsuit"}
                      >
                        <Bookmark
                          size={16}
                          className={savedLawsuits.includes(lawsuit.id) ? "fill-blue-500 text-blue-500" : ""}
                        />
                      </button>
                    </div>
                    <p className="text-gray-600 mt-1">{lawsuit.description}</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        Compensation: {lawsuit.compensation}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                        Deadline: {new Date(lawsuit.deadline).toLocaleDateString()}
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEligibilityColor(lawsuit.eligibility)}`}
                      >
                        Eligibility: {lawsuit.eligibility}
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getWinProbabilityColor(lawsuit.winProbability)}`}
                      >
                        Win Probability: {lawsuit.winProbability}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleFileClaim(lawsuit.id)}
                  disabled={userPoints < lawsuit.pointsCost}
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    userPoints >= lawsuit.pointsCost
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  File Claim ({lawsuit.pointsCost} pts)
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            {showSavedOnly
              ? "No saved lawsuits found. Save lawsuits by clicking the bookmark icon."
              : "No eligible lawsuits found based on your answers."}
          </div>
        )}
      </div>

      {selectedLawsuits.length > 0 && (
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{selectedLawsuits.length} claims selected</span>
              <span className="text-gray-600 ml-2">({selectedLawsuits.length * 5} points required)</span>
            </div>
            <button
              disabled={userPoints < selectedLawsuits.length * 5}
              className={`px-4 py-2 rounded-md ${
                userPoints >= selectedLawsuits.length * 5
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              File Selected Claims
            </button>
          </div>
        </div>
      )}

      {userPoints < 5 && onBuyPoints && (
        <div className="p-4 bg-yellow-50 border-t">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-yellow-800">Low on points</span>
              <span className="text-yellow-700 ml-2">You need at least 5 points to file a claim.</span>
            </div>
            <button onClick={onBuyPoints} className="px-4 py-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-700">
              Buy More Points
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

