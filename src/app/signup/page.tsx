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
      router.push('/login') 
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
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="mb-4
        ">{loading ? "Signing Up...": "Sign Up Page"}</h1>
        <hr />
        <label htmlFor="username" className="block text-sm font-medium text-gray-700"/>
        <input 
        className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 test-black"
        id="username" 
        type="text" 
        value={user.username}
        placeholder="Username"
        onChange={(e) => setUser({...user, username: e.target.value})}/>

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

        <button className="mb-4 rounded-md border-2 p-2" onClick={onSignUp} disabled={loading}>
          {btnDisabled ? "No Sign Up" : "Sign Up"}
        </button>

        <Link href='/login'>Visit Login Page</Link> 
      </div>
    </>
  )
}