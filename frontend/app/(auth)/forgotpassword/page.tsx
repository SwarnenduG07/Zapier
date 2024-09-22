"use client";
import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/forgotpassword`, {
        username: email,
      });

      if (res.status === 200) {
        setMessage("Password reset email sent. Check your inbox.");
        setError("");
      }
    } catch (err) {
      setError("Wrong Credentials.Give the Registerd Email");
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md px-6 py-8 bg-white shadow-md rounded-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <Input
            label={"Email"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
          <div className="mt-4">
            <Button className="w-full bg-amber-600" type="submit">
              Send Reset Link
            </Button>
          </div>
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}
