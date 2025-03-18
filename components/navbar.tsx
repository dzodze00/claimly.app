"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PointsDisplay } from "./points-display"
import { useState } from "react"
import { Menu, X, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface NavbarProps {
  points: number
  onPurchase: () => void
}

export function Navbar({ points, onPurchase }: NavbarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800">
            <Link href="/">My App</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-gray-700 hover:text-blue-600 ${isActive(link.path) ? "font-semibold" : ""}`}
              >
                {link.name}
              </Link>
            ))}
            <PointsDisplay points={points} onPurchase={onPurchase} />
            <div className="flex space-x-2">
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="hidden md:flex items-center space-x-1 text-sm text-gray-700">
                    <User size={16} />
                    <span>{user.firstName}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 py-2">
          <div className="container mx-auto px-6 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} className="block text-gray-700 hover:text-blue-600 py-2 px-4">
                {link.name}
              </Link>
            ))}
            <PointsDisplay points={points} onPurchase={onPurchase} />
            {user ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-1 text-sm text-gray-700">
                  <User size={16} />
                  <span>{user.firstName}</span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

