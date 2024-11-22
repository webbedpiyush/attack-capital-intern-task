import BlogCard from "@/components/Blog-Card";
import Header from "@/components/Header";

async function fetchPosts() {
  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_API_URL}/getAllPost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.error("Error fetching posts :", error);
  }
}

export default async function Home() {
  const posts = await fetchPosts();
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map(
            (post: {
              id: number;
              title: string;
              content: string;
              createdAt: string;
            }) => (
              <BlogCard key={post.id} post={post} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
