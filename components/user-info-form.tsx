"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle } from "lucide-react"

interface UserInfoFormProps {
  onSubmit: () => void
}

export function UserInfoForm({ onSubmit }: UserInfoFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scanningText, setScanningText] = useState("")

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Digital Services
    usesAmazon: false,
    usesFacebook: false,
    usesGoogle: false,
    usesApple: false,
    usesNetflix: false,
    usesSpotify: false,

    // Financial Services
    hasCheckingAccount: false,
    hasCreditCard: false,
    hasMortgage: false,
    hasStudentLoan: false,
    hasAutoLoan: false,

    // Products Purchased
    boughtSmartphone: false,
    boughtLaptop: false,
    boughtHeadphones: false,
    boughtSmartHome: false,
    boughtFitnessTech: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const simulateScan = async () => {
    setIsSubmitting(true)

    // Simulate scanning progress
    const scanSteps = [
      "Initializing scan...",
      "Checking digital footprint...",
      "Searching settlement database...",
      "Analyzing eligibility criteria...",
      "Matching your profile with active settlements...",
      "Finding potential claims...",
      "Calculating compensation estimates...",
      "Finalizing results...",
    ]

    for (let i = 0; i < scanSteps.length; i++) {
      setScanningText(scanSteps[i])
      setProgress(Math.round(((i + 1) / scanSteps.length) * 100))
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    // Complete the scan
    setTimeout(() => {
      setIsSubmitting(false)
      onSubmit()
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    simulateScan()
  }

  // Calculate how many services the user has selected
  const selectedServices = Object.entries(formData).filter(
    ([key, value]) => (key.startsWith("uses") || key.startsWith("has") || key.startsWith("bought")) && value === true,
  ).length

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {isSubmitting ? (
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-6">Scanning for Eligible Settlements</h2>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-gray-600 mb-4">{scanningText}</p>
          <p className="text-sm text-gray-500">This may take a few moments...</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Settlement Eligibility Scan</h2>
          <p className="text-gray-600 mb-6">
            Provide information to help us find class action settlements you may qualify for.
            {selectedServices > 0 && (
              <span className="block mt-2 text-blue-600">
                Based on your selections, you might be eligible for {Math.min(selectedServices * 2, 12)} potential
                settlements!
              </span>
            )}
          </p>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Next: Digital Services
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg border-b pb-2">Digital Services You Use</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select the digital services you've used in the past 5 years. Many class action settlements involve
                  these companies.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      id="usesAmazon"
                      name="usesAmazon"
                      type="checkbox"
                      checked={formData.usesAmazon}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="usesAmazon" className="ml-2 block text-sm text-gray-700">
                      Amazon
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="usesFacebook"
                      name="usesFacebook"
                      type="checkbox"
                      checked={formData.usesFacebook}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="usesFacebook" className="ml-2 block text-sm text-gray-700">
                      Facebook/Meta
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="usesGoogle"
                      name="usesGoogle"
                      type="checkbox"
                      checked={formData.usesGoogle}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="usesGoogle" className="ml-2 block text-sm text-gray-700">
                      Google
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="usesApple"
                      name="usesApple"
                      type="checkbox"
                      checked={formData.usesApple}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="usesApple" className="ml-2 block text-sm text-gray-700">
                      Apple
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="usesNetflix"
                      name="usesNetflix"
                      type="checkbox"
                      checked={formData.usesNetflix}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="usesNetflix" className="ml-2 block text-sm text-gray-700">
                      Netflix
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="usesSpotify"
                      name="usesSpotify"
                      type="checkbox"
                      checked={formData.usesSpotify}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="usesSpotify" className="ml-2 block text-sm text-gray-700">
                      Spotify
                    </label>
                  </div>
                </div>

                {selectedServices > 0 && (
                  <div className="bg-blue-50 p-3 rounded-md flex items-start">
                    <CheckCircle className="text-blue-500 mt-0.5 mr-2" size={18} />
                    <p className="text-sm text-blue-700">
                      Great! We've identified potential matches based on your selections.
                    </p>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Next: Financial Services
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg border-b pb-2">Financial Services</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select the financial services you've used. Many settlements involve banking and financial
                  institutions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      id="hasCheckingAccount"
                      name="hasCheckingAccount"
                      type="checkbox"
                      checked={formData.hasCheckingAccount}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="hasCheckingAccount" className="ml-2 block text-sm text-gray-700">
                      Checking Account
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="hasCreditCard"
                      name="hasCreditCard"
                      type="checkbox"
                      checked={formData.hasCreditCard}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="hasCreditCard" className="ml-2 block text-sm text-gray-700">
                      Credit Card
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="hasMortgage"
                      name="hasMortgage"
                      type="checkbox"
                      checked={formData.hasMortgage}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="hasMortgage" className="ml-2 block text-sm text-gray-700">
                      Mortgage
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="hasStudentLoan"
                      name="hasStudentLoan"
                      type="checkbox"
                      checked={formData.hasStudentLoan}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="hasStudentLoan" className="ml-2 block text-sm text-gray-700">
                      Student Loan
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="hasAutoLoan"
                      name="hasAutoLoan"
                      type="checkbox"
                      checked={formData.hasAutoLoan}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="hasAutoLoan" className="ml-2 block text-sm text-gray-700">
                      Auto Loan
                    </label>
                  </div>
                </div>

                {selectedServices > 3 && (
                  <div className="bg-green-50 p-3 rounded-md flex items-start">
                    <CheckCircle className="text-green-500 mt-0.5 mr-2" size={18} />
                    <p className="text-sm text-green-700">
                      You may be eligible for multiple high-value settlements based on your profile!
                    </p>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Next: Products Purchased
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg border-b pb-2">Products Purchased</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select the types of products you've purchased in the last 5 years. Product-related settlements are
                  common.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      id="boughtSmartphone"
                      name="boughtSmartphone"
                      type="checkbox"
                      checked={formData.boughtSmartphone}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="boughtSmartphone" className="ml-2 block text-sm text-gray-700">
                      Smartphone
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="boughtLaptop"
                      name="boughtLaptop"
                      type="checkbox"
                      checked={formData.boughtLaptop}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="boughtLaptop" className="ml-2 block text-sm text-gray-700">
                      Laptop/Computer
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="boughtHeadphones"
                      name="boughtHeadphones"
                      type="checkbox"
                      checked={formData.boughtHeadphones}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="boughtHeadphones" className="ml-2 block text-sm text-gray-700">
                      Headphones/Earbuds
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="boughtSmartHome"
                      name="boughtSmartHome"
                      type="checkbox"
                      checked={formData.boughtSmartHome}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="boughtSmartHome" className="ml-2 block text-sm text-gray-700">
                      Smart Home Devices
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="boughtFitnessTech"
                      name="boughtFitnessTech"
                      type="checkbox"
                      checked={formData.boughtFitnessTech}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="boughtFitnessTech" className="ml-2 block text-sm text-gray-700">
                      Fitness Tracker/Smartwatch
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h4 className="font-medium text-blue-800 mb-2">Scan Summary</h4>
                    <p className="text-sm text-blue-700 mb-2">
                      Based on your information, we'll scan for settlements related to:
                    </p>
                    <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                      {formData.usesAmazon && <li>Amazon services and purchases</li>}
                      {formData.usesFacebook && <li>Facebook/Meta privacy practices</li>}
                      {formData.usesGoogle && <li>Google data collection</li>}
                      {formData.usesApple && <li>Apple products and services</li>}
                      {formData.usesNetflix && <li>Netflix subscription practices</li>}
                      {formData.usesSpotify && <li>Spotify subscription practices</li>}
                      {formData.hasCheckingAccount && <li>Banking fees and practices</li>}
                      {formData.hasCreditCard && <li>Credit card fees and practices</li>}
                      {formData.hasMortgage && <li>Mortgage lending practices</li>}
                      {formData.hasStudentLoan && <li>Student loan servicing</li>}
                      {formData.hasAutoLoan && <li>Auto loan financing</li>}
                      {formData.boughtSmartphone && <li>Smartphone defects and performance</li>}
                      {formData.boughtLaptop && <li>Computer hardware issues</li>}
                      {formData.boughtHeadphones && <li>Audio product performance</li>}
                      {formData.boughtSmartHome && <li>Smart home device privacy</li>}
                      {formData.boughtFitnessTech && <li>Fitness tracker accuracy</li>}
                      {!Object.values(formData).some((v) => v === true) && <li>General consumer settlements</li>}
                    </ul>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Start Scanning
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  )
}
