"use client";

import { useState } from "react";

export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // show a toast
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
        // show a toast
       
      } else {
        // show a error toast
        
      }
    } catch (error: any) {
      // show a toast
    }
  };
  return (
    <>
      <form className="pt-5 px-5 sm:pt-12 sm:pl-16" onSubmit={handleSubmit}>
        <p className="text-xl">Blog title</p>
        <input
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <p className="text-xl mt-5">Blog Content</p>
        <textarea
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          placeholder="write content here"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <button
          type="submit"
          className="text-xl mt-8 w-40 h-12 bg-black text-white rounded-2xl"
        >
          Add
        </button>
      </form>
    </>
  );
}
