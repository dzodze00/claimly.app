"use client"

import { Sparkles } from 'lucide-react'

interface PointsDisplayProps {
  points: number
  onPurchase?: () => void
}

export function PointsDisplay({ points, onPurchase }: PointsDisplayProps) {
  return (
    <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
      <div className="flex items-center gap-1 text-blue-600">
        <Sparkles size={16} className="text-yellow-500" />
        <span className="font-medium">{points} Points</span>
      </div>
      
      {onPurchase && (
        <button
          onClick={onPurchase}
          className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md ml-2"
        >
          Buy Points
        </button>
      )}
    </div>
  )
}
