"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PointsDisplay } from "./points-display"
import { useState } from "react"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  points?: number
  onPurchase?: () => void
}

export function Navbar({ points = 5, onPurchase }: NavbarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">Claimly</span>
          </Link>

          <nav className="hidden md:flex ml-8 space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium ${
                  isActive(link.path) ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <PointsDisplay points={points} onPurchase={onPurchase} />
          </div>

          <div className="flex space-x-2">
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
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block text-sm font-medium ${isActive(link.path) ? "text-blue-600" : "text-gray-700"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <PointsDisplay points={points} onPurchase={onPurchase} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

