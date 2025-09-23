import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navigation from "@/components/global/navigation"
// import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NeuroMesh",
  description:
    "A platform to automate and manage complex workflows with ease.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <>
         <Navigation />
        <main>{children}</main>
        {/* <Footer /> */}
   </> 
   

  )
}