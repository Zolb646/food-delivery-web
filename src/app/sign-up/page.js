"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpStep1 } from "./_features/signUpStep1";
import { SignUpStep2 } from "./_features/signUpStep2";

export default function SignupPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleClick = () => {
    router.push("/login");
  };

  const getSavedStep = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("currentStep");
      return saved ? Number(saved) : 1;
    }
    return 1;
  };

  const [step, setStep] = useState(1);

  useEffect(() => {
    setMounted(true);
    setStep(getSavedStep());
  }, []);

  const saveStep = (newStep) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentStep", newStep);
    }
    setStep(newStep);
  };

  const validateInput = () => {
    const errors = {};

    if (step === 1) {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please provide a valid email address.";
      }
    }

    if (step === 2) {
      if (
        !password ||
        !/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)
      ) {
        errors.password = "Password must include letters and numbers.";
      }
      if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match. Please try again.";
      }
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    console.log("Next step validated", email);
    saveStep(step + 1);
  };

  const handleBackStep = () => {
    saveStep(step - 1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Clicked");
    setError({});

    if (!validateInput()) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/sign-up", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Signup failed");
      router.push("/login");
    } catch (err) {
      setError({ general: err.message });
    }
  };

  if (!mounted) return null;

  return (
    <>
      {step === 1 && (
        <SignUpStep1
          error={error}
          loading={loading}
          handleNextStep={handleNextStep}
          setEmail={setEmail}
          email={email}
          handleClick={handleClick}
          router={router}
        />
      )}
      {step === 2 && (
        <SignUpStep2
          error={error}
          loading={loading}
          handleSignup={handleSignup}
          handleBackStep={handleBackStep}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          handleClick={handleClick}
        />
      )}
    </>
  );
}
