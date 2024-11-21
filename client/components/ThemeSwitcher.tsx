"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [isdark, setIsdark] = useState<boolean>(false);
  useEffect(function () {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      setIsdark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsdark(false);
      document.documentElement.classList.remove("dark");
    }
  } ,[]);

  function toggleTheme() {
    const newTheme = isdark ? "light" :"dark"
    setIsdark((prev) =>!prev)
    document.documentElement.classList.toggle("dark",newTheme ==="dark")
    localStorage.setItem("theme",newTheme)
  }
  return <button className="text-black rounded-full dark:text-white" onClick={toggleTheme}>
    {isdark ? <Sun/> : <Moon />}
  </button>;
}
