/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface LogoutData {
  message: string;
  success: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get<any>("/api/users/me");
      console.log(response.data);
      setData(response.data.user._id);
      console.log("User ID:", response.data.user._id);
    } catch {
      toast.error("Error getting user data");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await axios.get<LogoutData>("/api/users/logout");

      if (response.data.success) {
        toast.success("Logged out successfully");
        router.push("/login");
      }
    } catch {
      toast.error("Error logging out");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />

      <h1 className="m-2 text-2xl font-bold">
        {loading ? "Loading..." : data ?? "No user found"}
      </h1>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={logout}
        disabled={loading}
      >
        {loading ? "Please wait..." : "Logout"}
      </button>
    </div>
  );
}
