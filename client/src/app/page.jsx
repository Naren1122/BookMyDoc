"use client";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/InputOTP";

export default function TestPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <InputOTP>
        <InputOTPGroup className="justify-center space-x-2">
          {[...Array(6)].map((_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
