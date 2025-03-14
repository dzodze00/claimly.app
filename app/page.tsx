"use client"

import { ChatInterface } from "@/components/chat-interface"
import { PointsDisplay } from "@/components/points-display"
import { UserInfoForm } from "@/components/user-info-form"
import { useState } from "react"

// EligibleLawsuits component defined directly in page.tsx
function EligibleLawsuits({ onFileClaim, userPoints }) {
  const [selectedLawsuits, setSelectedLawsuits] = useState([])

  // Mock data for eligible lawsuits
  const MOCK_LAWSUITS = [
    {
      id: "lawsuit-1",
      company: "TechCorp Data Breach",
      compensation: "$75-150",
      deadline: "2025-06-30",
      description: "For users affected by the 2023 data breach exposing email addresses and passwords.",
      eligibility: "High",
      status: "Open",
      pointsCost: 5
    },
    {
      id: "lawsuit-2",
      company: "SocialApp Privacy Settlement",
      compensation: "$25-50",
      deadline: "2025-08-15",
      description: "For users whose data was improperly shared with third parties between 2020-2022.",
      eligibility: "Medium",
      status: "Open",
      pointsCost: 5
    },
    {
      id: "lawsuit-3",
      company: "RetailCo Overcharging Settlement",
      compensation: "$42.50",
      deadline: "2025-05-15",
      description: "For customers who were overcharged on shipping fees between 2019-2021.",
      eligibility: "High",
      status: "Open",
      pointsCost: 5
    },
    {
      id: "lawsuit-4",
      company: "StreamingService Subscription Settlement",
      compensation: "$15-30",
      deadline: "2025-07-20",
      description: "For subscribers who were charged after cancellation between 2021-2023.",
      eligibility: "Medium",
      status: "Open",
      pointsCost: 5
    },
    {
      id: "lawsuit-5",
      company: "BankCorp Fee Settlement",
      compensation: "$50-100",
      deadline: "2025-10-15",
      description: "For account holders charged improper maintenance fees between 2020-2023.",
      eligibility: "High",
      status: "Open",
      pointsCost: 5
    }
  ]

  const toggleLawsuit = (id) => {
    if (selectedLawsuits.includes(id)) {
      setSelectedLawsuits(selectedLawsuits.filter(lawsuitId => lawsuitId !== id))
    } else {
      setSelectedLawsuits([...selectedLawsuits, id])
    }
  }

  const handleFileClaim = (id) => {
    if (onFileClaim) {
      onFileClaim(id)
    }
  }

  const getEligibilityColor = (eligibility) => {
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

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Eligible Class Action Settlements</h2>
        <p className="text-gray-600 mt-1">
          Based on your information, we've found {MOCK_LAWSUITS.length} settlements you may be eligible for.
        </p>
      </div>

      <div className="divide-y">
        {MOCK_LAWSUITS.map(lawsuit => (
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
                  <h3 className="font-medium text-lg">{lawsuit.company}</h3>
                  <p className="text-gray-600 mt-1">{lawsuit.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      Compensation: {lawsuit.compensation}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                      Deadline: {new Date(lawsuit.deadline).toLocaleDateString()}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEligibilityColor(lawsuit.eligibility)}`}>
                      Eligibility: {lawsuit.eligibility}
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
        ))}
      </div>

      {selectedLawsuits.length > 0 && (
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{selectedLawsuits.length} claims selected</span>
              <span className="text-gray-600 ml-2">
                ({selectedLawsuits.length * 5} points required)
              </span>
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
    </div>
  )
}

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [userPoints, setUserPoints] = useState(5) // Start with 5 points for demo
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleStartScan = () => {
    setShowForm(true)
  }

  const handleFormSubmit = () => {
    setFormSubmitted(true)
  }

  const handleFileClaim = (lawsuitId) => {
    // In a real app, this would call an API to file the claim
    setUserPoints(prev => Math.max(0, prev - 5))
    alert(`Claim filed for lawsuit ID: ${lawsuitId}. 5 points deducted.`)
  }

  const handleBuyPoints = () => {
    // In a real app, this would open a payment modal
    setUserPoints(prev => prev + 15)
    alert("15 points added to your account!")
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="mr-4 flex">
            <a className="flex items-center space-x-2" href="/">
              <span className="text-xl font-bold text-blue-600">Claimly</span>
            </a>
          </div>
          <nav className="flex flex-1 items-center justify-between">
            <div className="flex space-x-4">
              <a className="text-sm font-medium hover:text-blue-600" href="#">
                How It Works
              </a>
              <a className="text-sm font-medium hover:text-blue-600" href="#">
                About
              </a>
              <a className="text-sm font-medium hover:text-blue-600" href="#">
                FAQ
              </a>
            </div>
            <PointsDisplay 
              points={userPoints} 
              onPurchase={handleBuyPoints} 
            />
          </nav>
        </div>
      </header>

      <div className="container mx-auto flex-1 items-center px-4 py-6 md:py-12">
        <div className="mx-auto max-w-3xl">
          {!showForm && !formSubmitted && (
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] text-blue-600">
                Find & Claim Your Settlement Money
              </h1>
              <p className="mt-4 text-lg text-gray-600 md:text-xl">
                Our AI assistant scans your digital footprint to match you with eligible class action settlements and
                files claims on your behalf.
              </p>
              
              <button 
                onClick={handleStartScan}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Start Your Free Scan
              </button>
            </div>
          )}

          {showForm && !formSubmitted && (
            <UserInfoForm onSubmit={handleFormSubmit} />
          )}

          {formSubmitted && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-medium text-green-800">Scan Complete!</h2>
                <p className="text-green-700">
                  We've found several class action settlements you may be eligible for.
                </p>
              </div>
              
              <EligibleLawsuits 
                onFileClaim={handleFileClaim}
                userPoints={userPoints}
              />
              
              <div className="mt-6">
                <button
                  onClick={() => setShowChat(prev => !prev)}
                  className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                >
                  {showChat ? "Hide Chat Assistant" : "Need Help? Chat with our Assistant"}
                </button>
                
                {showChat && (
                  <div className="mt-4">
                    <ChatInterface />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-600 md:text-left">
            © 2025 Claimly. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a className="text-sm text-gray-600 hover:text-blue-600" href="#">
              Privacy
            </a>
            <a className="text-sm text-gray-600 hover:text-blue-600" href="#">
              Terms
            </a>
            <a className="text-sm text-gray-600 hover:text-blue-600" href="#">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
