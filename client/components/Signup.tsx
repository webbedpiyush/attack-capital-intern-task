"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const signupSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signupSchema.safeParse({ email, password, confirmPassword });

      setLoading(true);
      setErrors(null);

      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to register user");
      }
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      setErrors(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black p-8 relative"
        >
          <div className="absolute top-0 left-0 w-full h-6 bg-black"></div>
          <h2 className="text-4xl font-bold mb-6 text-center">Sign Up</h2>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="mb-6">
            <label htmlFor="email" className="block text-2xl font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xl border-4 border-black focus:outline-none focus:ring-4 focus:ring-gray-400"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-2xl font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-xl border-4 border-black focus:outline-none focus:ring-4 focus:ring-gray-400"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-2xl font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 text-xl border-4 border-black focus:outline-none focus:ring-4 focus:ring-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 text-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <div className="mt-6 text-center">
            <a href="/login" className="text-black hover:underline font-bold">
              Already have an account? Log in
            </a>
          </div>
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-black border-l-4 border-t-4 border-white"></div>
        </form>
      </div>
    </div>
  );
}
