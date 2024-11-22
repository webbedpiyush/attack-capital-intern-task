"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface BlogFormData {
  title: string;
  content: string;
}

interface ApiError {
  message: string;
}

export default function CreateBlogPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please login to create a blog post",
      });
      router.push("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create blog post");
      }

      toast({
        variant: "default",
        className: cn("bg-green-500 text-white"),
        title: "Success!",
        description: "Blog post created successfully",
      });

      // Reset form
      setFormData({ title: "", content: "" });

      // Optionally redirect to the new post or posts list
      // router.push('/posts');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-xl font-medium block">
            Blog Title
          </label>
          <input
            id="title"
            name="title"
            className={cn(
              "w-full px-4 py-3 border rounded-md",
              "dark:text-black bg-white",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            type="text"
            placeholder="Enter your blog title"
            value={formData.title}
            onChange={handleChange}
            disabled={isSubmitting}
            required
            minLength={3}
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-xl font-medium block">
            Blog Content
          </label>
          <textarea
            id="content"
            name="content"
            className={cn(
              "w-full px-4 py-3 border rounded-md",
              "dark:text-black bg-white",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            placeholder="Write your blog content here"
            rows={6}
            value={formData.content}
            onChange={handleChange}
            disabled={isSubmitting}
            required
            minLength={10}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full sm:w-auto px-6 py-3 text-lg font-medium",
            "bg-black dark:bg-white",
            "text-white dark:text-black",
            "rounded-lg transition-all",
            "hover:bg-gray-800 dark:hover:bg-gray-100",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          )}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating...
            </span>
          ) : (
            "Create Blog"
          )}
        </button>
      </form>
    </div>
  );
}
