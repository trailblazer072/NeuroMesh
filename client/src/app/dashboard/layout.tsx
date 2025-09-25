import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/global/sidebar"
import { Header } from "@/components/global/header"
import { UserProvider } from "@/context/userContext"





const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NeuroMesh Dashboard",
  description: "",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <UserProvider>
           <div className="flex h-screen bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            </div>
          </div>  
    </UserProvider>
   
       
  
  )
}
