"use client"

import { ChatInterface } from "@/components/chat-interface"
import { UserInfoForm } from "@/components/user-info-form"
import { EligibleLawsuits } from "@/components/eligible-lawsuits"
import { FiledLawsuits } from "@/components/filed-lawsuits"
import { Navbar } from "@/components/navbar"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showFiledLawsuits, setShowFiledLawsuits] = useState(false)
  const { user, isLoading } = useAuth()

  const handleStartScan = () => {
    setShowForm(true)
  }

  const handleFormSubmit = () => {
    setFormSubmitted(true)
  }

  const handleFileClaim = (lawsuitId: string) => {
    // In a real app, this would call an API to file the claim
    if (user) {
      // Update user points in a real app
      alert(`Claim filed for lawsuit ID: ${lawsuitId}. 5 points deducted.`)
    }
  }

  const handleBuyPoints = () => {
    // In a real app, this would open a payment modal
    alert("15 points added to your account!")
  }

  // Update the userPoints to use the user's points from auth context
  const userPoints = user ? user.points : 5

  return (
    <div className="container mx-auto py-8">
      <Navbar />

      {!showForm && !formSubmitted && (
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] text-blue-600">
            Find & Claim Your Settlement Money
          </h1>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            Our AI assistant scans your digital footprint to match you with eligible class action settlements and files
            claims on your behalf.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <button
                onClick={handleStartScan}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Start Your Free Scan
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}

      {showForm && !formSubmitted && <UserInfoForm onSubmit={handleFormSubmit} />}

      {formSubmitted && (
        <>
          <div className="mb-8">
            <EligibleLawsuits onFileClaim={handleFileClaim} userPoints={userPoints} onBuyPoints={handleBuyPoints} />
          </div>

          <button
            onClick={() => setShowFiledLawsuits(!showFiledLawsuits)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-4"
          >
            {showFiledLawsuits ? "Hide Filed Lawsuits" : "Show Filed Lawsuits"}
          </button>

          {showFiledLawsuits && <FiledLawsuits />}

          <button
            onClick={() => setShowChat(!showChat)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showChat ? "Hide Chat" : "Show Chat"}
          </button>

          {showChat && <ChatInterface />}
        </>
      )}
    </div>
  )
}

