"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  interface data {
    message: string,
    success: boolean
  }
  
  const verifyEmail = async () => {
    if (!token) {
      setError(true);
      toast.error("Token not found");
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyemail", { token });
      const data = response.data as data;

      if (data.success ) {
        setVerified(true);
        setError(false);
        toast.success(data.message);

        setTimeout(() => {
          router.push("/login");
        }, 500);
      } else {
        setError(true);
        toast.error(data.message);
      }

    } catch (err: any) {
      setError(true);
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-semibold">Verify Email</h1>

      <button
        onClick={verifyEmail}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        disabled={loading || verified}
      >
        {loading ? "Verifying..." : verified ? "Verified" : "Verify Email"}
      </button>

      {verified && <p className="mt-4 text-green-600">Email Verified Successfully!</p>}
      {error && <p className="mt-4 text-red-600">Verification Failed.</p>}
      {!token && <p className="mt-2 text-gray-500 text-sm">No token found in URL.</p>}
    </div>
  );
}
