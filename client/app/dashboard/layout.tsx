"use client";
import { AuthCheck } from "@/components/AuthCheck";
import Sidebar from "@/components/Sidebar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { CircleUserRound, LogOut } from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutWrapperProps) {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  useEffect(function () {
    const user = localStorage.getItem("userId")!;
    console.log(userId);
    setUserId(user);
  }, []);
  function logoutFunction() {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      router.push("/");
    }
  }
  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden md:block h-screen sticky top-0">
            <Sidebar userId={userId} />
          </div>

          <div className="flex-1 flex flex-col min-h-screen">
            <div className="md:hidden">
              <Sidebar userId={userId} />
            </div>

            <main className="flex-1">
              <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black dark:border-white">
                <h3 className="font-medium ml-2">Dashboard</h3>
                <div className="flex items-center gap-3 justify-end">
                  <span className="text-lg md:text-2xl">User ID: {userId}</span>
                  <CircleUserRound size={40} />
                  <ThemeSwitcher />
                  <LogOut onClick={logoutFunction} />
                </div>
              </div>
              {children}
            </main>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}
