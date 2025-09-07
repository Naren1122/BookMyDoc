"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ForgotPasswordIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/forgot-password/send-otp");
    router.replace("/auth/forgot-password/verify-otp");
    router.replace("/auth/forgot-password/reset-password");
    router.replace("/auth/forgot-password/send-otp");
  
  }, [router]);

  return null;
};

export default ForgotPasswordIndex;
