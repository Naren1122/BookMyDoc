// This code assumes you have a similar structure to the previous files
// and focuses on adjusting the styling for the phone number input group.

"use client";

import React from "react";
import AuthForm from "@/components/auth/AuthForm";

const RegisterPage = () => {
  const handleRegister = (values) => {
    console.log("Signup Submitted:", values);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Logo + Heading */}
        <div className="text-center mb-6">
          <img
            src="/images/logo.png"
            alt="BookMyDoctor Logo"
            className="w-full max-w-xl h-32 object-contain mx-auto"
          />
          <h1 className="text-2xl font-bold text-[#29555c] mt-4">Create Your Account</h1>
          <p className="text-sm text-gray-500 mt-2">
            Join BookMyDoctor to start booking appointments
          </p>
        </div>

        {/* AuthForm handles Formik + Form */}
        <AuthForm type="signup" onSubmit={handleRegister} />

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-[#16a3b5] font-semibold hover:underline"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;