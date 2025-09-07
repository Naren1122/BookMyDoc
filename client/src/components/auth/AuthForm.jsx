"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const AuthForm = ({ type = "signup", onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Define validation schema based on form type (signup or login)
  const getValidationSchema = () => {
    if (type === "signup") {
      return Yup.object({
        name: Yup.string().required("Full Name is required"),
        phone: Yup.string()
          .required("Phone Number is required")
          .matches(/^(98|97)\d{8}$/, "Invalid Nepali phone number (e.g., 98XXXXXXXX)"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .matches(/[A-Z]/, "Must contain at least one uppercase letter")
          .matches(/[a-z]/, "Must contain at least one lowercase letter")
          .matches(/\d/, "Must contain at least one number")
          .matches(/[@$!%*?&]/, "Must contain at least one special character")
          .min(8, "Password must be at least 8 characters"),
        confirmPassword: Yup.string()
          .required("Confirm password is required")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
        gender: Yup.string().required("Gender is required"),
      });
    }
    // Validation for login form
    return Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    });
  };

  const initialValues =
    type === "signup"
      ? { name: "", phone: "", email: "", password: "", confirmPassword: "", gender: "" }
      : { email: "", password: "" };

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema()} // <--- Added this line
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="space-y-4">
          {/* Name - only for signup */}
          {type === "signup" && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Field as={Input} type="text" name="name" placeholder="Enter your name" />
              <ErrorMessage name="name" component="div" className="text-xs text-red-500 mt-1" />
            </div>
          )}

          {/* Phone - only for signup */}
          {type === "signup" && (
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex">
                <span className="flex items-center px-4 bg-gray-100 border border-gray-300 rounded-l-md text-gray-600 h-10 font-medium">
                  +977
                </span>
                <Field
                  as={Input}
                  type="tel"
                  name="phone"
                  placeholder="98XXXXXXXX"
                  className="flex-1 rounded-none rounded-r-md"
                />
              </div>
              <ErrorMessage name="phone" component="div" className="text-xs text-red-500 mt-1" />
            </div>
          )}

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Field as={Input} type="email" name="email" placeholder="Enter your email" autoComplete="off" />
            <ErrorMessage name="email" component="div" className="text-xs text-red-500 mt-1" />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Field
                as={Input}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                autoComplete="new-password"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </span>
            </div>
            <ErrorMessage name="password" component="div" className="text-xs text-red-500 mt-1" />
          </div>

          {/* Confirm Password - only for signup */}
          {type === "signup" && (
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Field
                  as={Input}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </span>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="text-xs text-red-500 mt-1" />
            </div>
          )}

        
          {/* Submit Button */}
          <div>
            <Button type="submit">
              {type === "signup" ? "Create Account" : "Login"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;