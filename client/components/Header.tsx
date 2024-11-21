import { MoveRight } from "lucide-react";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <header className="sticky top-0 w-full bg-opacity-70 backdrop-blur-md transition-colors duration-300 z-10 py-5 px-5 md:px-12 lg:px-28 dark:text-white">
      <div className="flex justify-between items-center">
        <Link
          href={"/"}
          className="text-2xl font-bold text-black dark:text-white"
        >
          Intern-Task
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/login">
            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:px-6 border border-solid border-black dark:border-white shadow-[-7px_7px_0px_#000] dark:shadow-[-7px_7px_0px_#fff]">
              <span className="text-lg text-black dark:text-white">Login</span>
              <MoveRight size={28} className="text-black dark:text-white" />
            </button>
          </Link>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium text-black dark:text-white">
          Blogs Collection
        </h1>
      </div>
    </header>
  );
}
