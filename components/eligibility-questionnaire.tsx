"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"

// Define the structure for eligibility questions
interface EligibilityQuestion {
  id: string
  lawsuitId: string
  question: string
  description?: string
  options: {
    id: string
    text: string
    isEligible: boolean
  }[]
}

// Define the structure for lawsuit data
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

interface EligibilityQuestionnaireProps {
  lawsuits: Lawsuit[]
  onComplete: (eligibleLawsuitIds: string[]) => void
}

export function EligibilityQuestionnaire({ lawsuits, onComplete }: EligibilityQuestionnaireProps) {
  // Generate questions based on lawsuits
  const generateQuestions = (): EligibilityQuestion[] => {
    return lawsuits.map((lawsuit) => ({
      id: `question-${lawsuit.id}`,
      lawsuitId: lawsuit.id,
      question: `Did you ${getQuestionForLawsuit(lawsuit)}?`,
      description: getDescriptionForLawsuit(lawsuit),
      options: [
        { id: `${lawsuit.id}-yes`, text: "Yes", isEligible: true },
        { id: `${lawsuit.id}-no`, text: "No", isEligible: false },
        { id: `${lawsuit.id}-unsure`, text: "I'm not sure", isEligible: true },
      ],
    }))
  }

  // Helper function to generate question text based on lawsuit
  const getQuestionForLawsuit = (lawsuit: Lawsuit): string => {
    if (lawsuit.company.includes("Data Breach")) {
      return "have an account with this company between 2020-2023"
    } else if (lawsuit.company.includes("Privacy")) {
      return "use this service between 2020-2022"
    } else if (lawsuit.company.includes("Overcharging")) {
      return "make a purchase from this company between 2019-2021"
    } else if (lawsuit.company.includes("Subscription")) {
      return "have a subscription with this service between 2021-2023"
    } else if (lawsuit.company.includes("Fee")) {
      return "have an account with this financial institution between 2020-2023"
    } else {
      return "use this product or service during the relevant time period"
    }
  }

  // Helper function to generate description text based on lawsuit
  const getDescriptionForLawsuit = (lawsuit: Lawsuit): string => {
    if (lawsuit.company.includes("Data Breach")) {
      return "This settlement is for customers whose personal information may have been compromised."
    } else if (lawsuit.company.includes("Privacy")) {
      return "This settlement is for users whose data may have been improperly shared with third parties."
    } else if (lawsuit.company.includes("Overcharging")) {
      return "This settlement is for customers who may have been charged excessive fees."
    } else if (lawsuit.company.includes("Subscription")) {
      return "This settlement is for subscribers who may have been charged after cancellation."
    } else if (lawsuit.company.includes("Fee")) {
      return "This settlement is for account holders who may have been charged improper fees."
    } else {
      return "This settlement is for customers who purchased or used this product or service."
    }
  }

  const questions = generateQuestions()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [progress, setProgress] = useState(0)

  const handleAnswer = (lawsuitId: string, isEligible: boolean) => {
    // Save the answer
    setAnswers((prev) => ({
      ...prev,
      [lawsuitId]: isEligible,
    }))

    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setProgress(Math.round(((currentQuestionIndex + 1) / questions.length) * 100))
    } else {
      // Questionnaire complete, determine eligible lawsuits
      const eligibleLawsuitIds = Object.entries(answers)
        .filter(([_, isEligible]) => isEligible)
        .map(([lawsuitId]) => lawsuitId)
        // Add the current answer if it's eligible
        .concat(isEligible ? [lawsuitId] : [])

      onComplete(eligibleLawsuitIds)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Eligibility Questionnaire</h2>
        <p className="text-gray-600">
          Please answer the following questions to determine your eligibility for each settlement.
        </p>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-lg text-blue-800">{lawsuits[currentQuestionIndex].company}</h3>
          <p className="text-blue-700 text-sm mt-1">{lawsuits[currentQuestionIndex].description}</p>
          <div className="flex items-center mt-2">
            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
              Potential compensation: {lawsuits[currentQuestionIndex].compensation}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-2">{currentQuestion.question}</h3>
        {currentQuestion.description && <p className="text-gray-600 mb-4">{currentQuestion.description}</p>}

        <div className="space-y-3 mt-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(currentQuestion.lawsuitId, option.isEligible)}
              className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <span>{option.text}</span>
              {option.isEligible ? (
                <CheckCircle className="text-green-500" size={18} />
              ) : (
                <AlertCircle className="text-gray-400" size={18} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>

        {currentQuestionIndex > 0 && (
          <button
            onClick={() => {
              setCurrentQuestionIndex((prev) => prev - 1)
              setProgress(Math.round(((currentQuestionIndex - 1) / questions.length) * 100))
            }}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Previous
          </button>
        )}
      </div>
    </div>
  )
}

