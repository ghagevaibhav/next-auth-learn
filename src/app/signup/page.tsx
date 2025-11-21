/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface User {
  email: string,
  password: string, 
  username: string
}

export default function SignupPage () {

  const router = useRouter()

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: ""
  })

  // make button disabled until inputs are not filled completely
  const [btnDisabled, setBtnDisabled] = useState(false)

  // loading state to show loading animation
  const [loading, setLoading] = useState(false)

  const onSignUp = async () => {
    try {
      // on signup request set loading true
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup Successfull", response.data)
      router.push('/api/users/login') 
    }
    catch (error: any) {
      toast.error("Signup Failed")
    }
  }

  const btnShouldBeDisabled = !user.email || !user.password || !user.username;
  useEffect(() => {
    setBtnDisabled(btnShouldBeDisabled);
  }, [btnShouldBeDisabled]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        Signup Page
      </div>
    </>
  )
}