'use client';

import { Suspense } from 'react';

export default function Page({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams.userId || "Guest";

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts of Author: {userId}</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <PostsList userId={userId} />
      </Suspense>
    </div>
  );
}


import { useEffect, useState } from "react";

// Define types for the post data
interface Post {
  id: number;
  title: string;
  content: string;
  // Add other post properties as needed
}

interface FetchError {
  message: string;
  status?: number;
}

interface PostsListProps {
  userId: string;
}

export function PostsList({ userId }: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);
  const [author, setAuthor] = useState<Number>(Number(userId));
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Get token from localStorage on component mount
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setLoading(false);
      setError({ message: "Authentication required" });
    }
  }, []);

  const handleFetchPosts = async () => {
    if (!token) {
      setError({ message: "No authentication token found" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/post/fetchPosts?author=${author}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.error || "Failed to fetch posts",
          status: response.status,
        };
      }

      setPosts(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError({
        message: error instanceof Error ? error.message : "Failed to fetch posts",
        status: (error as any)?.status,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      handleFetchPosts();
    }
  }, [token, author]); // Dependencies array includes token and author

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error: {error.message}
        {error.status && ` (Status: ${error.status})`}
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (posts.length === 0) {
    return <p className="text-gray-500 text-center py-4">No posts available</p>;
  }

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li
          key={post.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600">{post.content}</p>
        </li>
      ))}
    </ul>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
}