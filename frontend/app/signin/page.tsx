"use client";
import { CheckFeature } from "@/components/CheckFetures";
import { Input } from "@/components/Input";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import axios from "axios";

interface SigninResponse {
  token: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    try {
      const res = await axios.post<SigninResponse>(`${BACKEND_URL}/api/v1/user/signin`, {
        username: email,
        password,
      });

      // Store the token and redirect to the dashboard page
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during signin:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex">
        <div className="flex pt-20 max-w-4xl">
          <div className="flex-1 pt-20 px-4">
            <div className="font-semibold text-3xl pb-4">
              Join millions worldwide who automate their work using Zapier.
            </div>
            <div className="pb-6 pt-4">
              <CheckFeature label={"Easy setup, no coding required"} />
            </div>
            <div className="pb-6">
              <CheckFeature label={"Free forever for core features"} />
            </div>
            <div className="pb-6">
              <CheckFeature label={"14-day trial of premium features & apps"} />
            </div>
          </div>
          <div className="flex-1 pt-6 px-4 border pb-6 mt-12 rounded">
            <form onSubmit={handleSignin}>
              <Input
                label={"Email"}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Your Email"
              />
              <Input
                label={"Password"}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Your Password"
              />
              <div className="pt-4 pb-4">
                <Button className="w-full rounded-full bg-orange-700" type="submit">
                  Signin
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
