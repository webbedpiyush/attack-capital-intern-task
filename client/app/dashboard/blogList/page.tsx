"use client";
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

export default function Page({ searchParams }: { searchParams: { userId?: string } }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);
  const [author, setAuthor] = useState<Number>(2);

  const userId = searchParams.userId || "Guest";

  // Assuming author is a number from your example
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
      // Updated to match the correct API endpoint structure (/api/posts)
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
      console.log(userId)
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError({
        message:
          error instanceof Error ? error.message : "Failed to fetch posts",
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
  }, [token]); // Dependencies array includes token

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error.message}
          {error.status && ` (Status: ${error.status})`}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts  of Author:{userId}</h1>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No posts available</p>
      ) : (
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
      )}
    </div>
  );
}
