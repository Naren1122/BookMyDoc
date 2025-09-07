"use client";

import React, { useState } from "react";
import OTPInput from "react-otp-input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const OTP_LENGTH = 6;

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerifyOTP = (e) => {
    e.preventDefault();

    // Clear any previous error message
    setError(""); 

    if (otp.length !== OTP_LENGTH) {
      setError("Please enter 6 digits");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid OTP");
      return;
    }

    // TODO: Verify OTP backend
    router.push("/auth/forgot-password/reset-password");
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

        <h1 className="text-2xl font-bold text-center font-sans">
          Verify OTP
        </h1>
        <p className="text-center text-gray-600">
          Enter the 6-digit OTP sent to your email.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleVerifyOTP} className="space-y-4 font-sans">
          <div className="flex justify-center space-x-2">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={OTP_LENGTH}
              renderInput={(props, index) => (
                <input
                  {...props}
                  id={`otp-field-${index}`}
                  name={`otp-field-${index}`}
                  aria-label={`OTP digit ${index + 1}`}
                  className="w-12 h-12 md:w-14 md:h-14 border border-gray-300 rounded-md text-center text-xl md:text-2xl font-semibold text-gray-800 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400"
                />
              )}
              shouldAutoFocus
              containerStyle="flex justify-center gap-2"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors duration-300 ease-in-out"
            // The `disabled` prop is removed
          >
            Verify OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTPPage;