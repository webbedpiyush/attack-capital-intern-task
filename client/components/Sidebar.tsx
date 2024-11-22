"use client";

import { useState } from "react";
import {
  Computer,
  DiamondPlus,
  LogInIcon as Logs,
  Pointer,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-black p-2 rounded-md"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black dark:bg-white bg-opacity-50 dark:bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out z-50 md:relative md:z-0 flex flex-col bg-white dark:bg-black w-64 md:w-80 h-full`}
      >
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <Link href={"/"} className="flex gap-2 items-center">
            <Pointer size={28} className="text-black dark:text-white" />
            <span className="text-center text-black dark:text-white font-semibold">Attack-Capital Intern-task</span>
          </Link>
        </div>
        <div className="flex-grow py-6 px-4">
          <div className="space-y-4">
            <Link
              href={`/dashboard/addBlog?userId=${userId}`}
              className="flex items-center gap-3 font-medium px-3 py-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <DiamondPlus size={24} />
              <p>Add blogs</p>
            </Link>
            <Link
              href={`/dashboard/blogList?userId=${userId}`}
              className="flex items-center gap-3 font-medium px-3 py-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Logs size={24} />
              <p>Blogs list</p>
            </Link>
            <Link
              href="https://github.com/webbedpiyush"
              target="_blank"
              className="flex items-center gap-3 font-medium px-3 py-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Computer size={24} />
              <p>New versions feature</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
