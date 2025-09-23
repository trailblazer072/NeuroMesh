"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "../ui/button"

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
  ]

  return (
    <nav className="border-b  ">
      <div className=" w-full  px-4">
        <div className="flex h-16 items-center w-full justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-600">
              <span className="text-sm font-bold text-white">F</span>
            </div> */}
            <span className="text-2xl font-medium">
  <span className="text-500">NeuroMesh</span>
</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-md font-medium transition-colors hover:text-400 ${
                  pathname === item.href ? "text-400" : "text-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
            <div className="flex items-center space-x-4">

          <SignedIn>
            <Button variant="outline" size="sm" className="hidden md:flex bg-transparent " asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <Button variant="outline" size="sm" className="hidden md:flex bg-transparent " asChild>
              <Link href="/auth/sign-in/">Sign In</Link>
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex" asChild>
              <Link href="/auth/sign-up/">Sign Up</Link>
            </Button>
          </SignedOut>
            </div>


          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-gray-300" /> : <Menu className="h-6 w-6 text-gray-300" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-gray-900 py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                    pathname === item.href ? "text-purple-400" : "text-gray-300"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
