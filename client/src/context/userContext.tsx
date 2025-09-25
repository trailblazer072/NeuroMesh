// context/StudioContext.tsx
"use client"

import { createContext, useContext, useEffect, useState } from "react"

import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { getUserData } from "@/lib/api"

interface userContextType {
  userData: any
  loading: boolean
}

const UserContext = createContext<userContextType>({
  userData: null,
  loading: true,
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
    const user = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const data = await getUserData()
          setUserData(data)
        } catch (error) {
          console.error("Error fetching studio data", error)
        }
      } 
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useStudio = () => useContext(UserContext)
