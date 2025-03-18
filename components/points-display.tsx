"use client"

interface PointsDisplayProps {
  points?: number
  onPurchase?: () => void
}

export function PointsDisplay({ points = 0, onPurchase }: PointsDisplayProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-md">
        <span className="text-yellow-600">✦</span>
        <span className="text-sm font-medium">{points} Points</span>
      </div>
      {onPurchase && (
        <button onClick={onPurchase} className="text-xs text-blue-600 hover:text-blue-700 hover:underline">
          Buy Points
        </button>
      )}
    </div>
  )
}

