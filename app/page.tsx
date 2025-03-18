"use client"

// Update imports to include new components
import { ChatInterface } from "@/components/chat-interface"
import { UserInfoForm } from "@/components/user-info-form"
import { EligibleLawsuits } from "@/components/eligible-lawsuits"
import { FiledLawsuits } from "@/components/filed-lawsuits"
import { Navbar } from "@/components/navbar"
import { useState } from "react"
import Link from "next/link"

// Replace the Home component with this updated version
export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [userPoints, setUserPoints] = useState(5) // Start with 5 points for demo
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showFiledLawsuits, setShowFiledLawsuits] = useState(false)

  const handleStartScan = () => {
    setShowForm(true)
  }

  const handleFormSubmit = () => {
    setFormSubmitted(true)
  }

  const handleFileClaim = (lawsuitId: string) => {
    // In a real app, this would call an API to file the claim
    setUserPoints((prev) => Math.max(0, prev - 5))
    alert(`Claim filed for lawsuit ID: ${lawsuitId}. 5 points deducted.`)
  }

  const handleBuyPoints = () => {
    // In a real app, this would open a payment modal
    setUserPoints((prev) => prev + 15)
    alert("15 points added to your account!")
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar points={userPoints} onPurchase={handleBuyPoints} />

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

              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Log In
                </Link>
              </div>
            </div>
          )}

          {showForm && !formSubmitted && <UserInfoForm onSubmit={handleFormSubmit} />}

          {formSubmitted && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-medium text-green-800">Scan Complete!</h2>
                <p className="text-green-700">We've found several class action settlements you may be eligible for.</p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Claims Dashboard</h2>
                <button
                  onClick={() => setShowFiledLawsuits(!showFiledLawsuits)}
                  className="text-sm px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  {showFiledLawsuits ? "Show Eligible Claims" : "Show Filed Claims"}
                </button>
              </div>

              {showFiledLawsuits ? (
                <FiledLawsuits />
              ) : (
                <EligibleLawsuits onFileClaim={handleFileClaim} userPoints={userPoints} />
              )}

              <div className="mt-6">
                <button
                  onClick={() => setShowChat((prev) => !prev)}
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
            <Link className="text-sm text-gray-600 hover:text-blue-600" href="/privacy">
              Privacy
            </Link>
            <Link className="text-sm text-gray-600 hover:text-blue-600" href="/terms">
              Terms
            </Link>
            <Link className="text-sm text-gray-600 hover:text-blue-600" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

