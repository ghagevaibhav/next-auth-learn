/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface User {
  email: string,
  password: string, 
}

export default function SignupPage () {

  const router = useRouter()

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  })

  // make button disabled until inputs are not filled completely
  const [btnDisabled, setBtnDisabled] = useState(false)

  // loading state to show loading animation
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      // on signup request set loading true
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Logged In Successfull", response.data)
      router.push('/profile') 
    }
    catch (error: any) {
      toast.error("Signup Failed")
    }
  }

  const btnShouldBeDisabled = !user.email || !user.password;
  useEffect(() => {
    setBtnDisabled(btnShouldBeDisabled);
  }, [btnShouldBeDisabled]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="mb-4
        ">{loading ? "Logging In...": "Login Page"}</h1>  
        <hr />

        <label htmlFor="email" className="block text-sm font-medium text-gray-700"/>
        <input 
        className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 test-black"
        id="email" 
        type="email" 
        value={user.email}
        placeholder="Email"
        onChange={(e) => setUser({...user, email: e.target.value})}/>

        <label htmlFor="password" className="block text-sm font-medium text-gray-700"/>
        <input 
        className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 test-black"
        id="password" 
        type="password" 
        value={user.password}
        placeholder="Password"
        onChange={(e) => setUser({...user, password: e.target.value})}/>

        <button className="mb-4 rounded-md border-2 p-2" onClick={onLogin} disabled={loading}>
          {btnDisabled ? "No Login" : "Login"}
        </button>

        <Link href='/signup'>Visit Signup Page</Link>  
      </div>
    </>
  )
}