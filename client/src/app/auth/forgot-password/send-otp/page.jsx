"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const SendOTPPage = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }

    setError("");
    // TODO: Call backend to send OTP
    router.push("/auth/forgot-password/verify-otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="flex justify-center mb-4">
          <img
            src="/images/logo.png"
            alt="BookMyDoctor Logo"
            className="w-full max-w-xl h-32 object-contain mx-auto"
          />
        </div>

        <h1 className="text-2xl font-bold text-center font-sans">Forgot Password</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSendOTP} className="space-y-4 font-sans">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex">
              <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-600 h-12">
                +977
              </span>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98XXXXXXXX"
                className="rounded-l-none"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!phone.trim()}
          >
            Send OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SendOTPPage;
