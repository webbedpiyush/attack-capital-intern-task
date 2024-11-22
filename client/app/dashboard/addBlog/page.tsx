"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast({
        variant: "destructive",
        title: "no token available",
      });
      return;
    }

    try {
      const response = await fetch(`/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          variant: "default",
          className: cn("bg-green-500"),
          title: "blog created Successfully!!",
        });
        setTitle("");
        setContent("");
      } else {
        toast({
          variant: "destructive",
          title: "error happened while creating blog",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    }
  };
  return (
    <>
      <form className="pt-5 px-5 sm:pt-12 sm:pl-16" onSubmit={handleSubmit}>
        <p className="text-xl">Blog title</p>
        <input
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border dark:text-black"
          type="text"
          placeholder="Type here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <p className="text-xl mt-5">Blog Content</p>
        <textarea
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border dark:text-black"
          placeholder="write content here"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <button
          type="submit"
          className="text-xl mt-8 w-40 h-12 bg-black dark:bg-white text-white dark:text-black rounded-2xl"
        >
          Add
        </button>
      </form>
    </>
  );
}
