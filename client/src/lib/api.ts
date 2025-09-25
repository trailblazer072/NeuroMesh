"use server"
import { auth } from "@clerk/nextjs/server"
import axios from "axios"

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api" 

async function getAuthHeaders() {
  const { getToken } = await auth();
  const token = await getToken()

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export const getUserData = async () => {
try {
     const headers = await getAuthHeaders();
    const response = await axios.get(`${url}/user`, { headers }) 
    return response.data
} catch (error) {
    console.error("Error fetching user data:", error)
    throw new Error("Failed to fetch user data")
}
}



