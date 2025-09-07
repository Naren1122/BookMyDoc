"use client";

import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";

const LoginPage = () => {
  const handleLogin = (values) => {
    console.log("Login Submitted:", values);
    // TODO: Call backend API for login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        {/* Logo + Heading */}
        <div className="flex flex-col items-center">
          <img
            src="/images/logo.png"
            alt="BookMyDoctor Logo"
            className="w-32 h-32 object-contain"
          />
          <h1 className="text-2xl font-bold text-[#29555c] mt-4 text-center">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Sign in to your account
          </p>
        </div>

        {/* Auth Form */}
        <AuthForm type="login" onSubmit={handleLogin} />

        {/* Forgot Password */}
        <div className="text-center">
          <Link
            href="/auth/forgot-password/send-otp"
            className="text-[#16a3b5] font-semibold hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#16a3b5] font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
