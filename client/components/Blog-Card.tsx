import React from "react";

export default function BlogCard() {
  return (
    <article className="rounded-lg shadow-md dark:shadow-gray-700 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <time className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </time>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
        Getting Started with Next.js
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">Next.js is a powerful React framework that makes it easy to build server-side rendered and statically generated web applications. In this post, we'll explore the basics of Next.js and how to set up your first project.</p>
        <div className="mt-4">
          <span className="text-sm text-black-600 font-medium hover:text-blue-600 hover:underline transition-all duration-300 cursor-pointer ">
            Read More
          </span>
        </div>
      </div>
    </article>
  );
}
