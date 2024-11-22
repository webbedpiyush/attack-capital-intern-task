"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      loginSchema.safeParse({ email, password });

      setLoading(true);
      setError(null);

      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // redirect it to the dashboard page
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      router.push(`/dashboard?userId=${data.user.id}`);
    } catch (error: any) {
      setLoading(false);
      setError(error.message || "Something went wrong");
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
          <h2 className="text-4xl font-bold mb-6 text-center text-black">
            Login
          </h2>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-2xl font-bold mb-2 text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xl border-4 border-black focus:outline-none focus:ring-4 focus:ring-gray-400 text-black"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-2xl font-bold mb-2 text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-xl border-4 border-black focus:outline-none focus:ring-4 focus:ring-gray-400 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 text-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
          <div className="mt-6 text-center">
            <a href="/signup" className="text-black hover:underline font-bold">
              First time user? Register
            </a>
          </div>
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-black border-l-4 border-t-4 border-white"></div>
        </form>
      </div>
    </div>
  );
}
