import BlogCard from "@/components/Blog-Card";
import Header from "@/components/Header";

const samplePosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    content:
      "Next.js is a powerful React framework that makes it easy to build server-side rendered and statically generated web applications. In this post, we'll explore the basics of Next.js and how to set up your first project.",
    createdAt: "2023-05-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    content:
      "Tailwind CSS is a utility-first CSS framework that allows you to rapidly build custom user interfaces. This post will cover some advanced techniques and best practices for using Tailwind in your projects.",
    createdAt: "2023-05-17T14:30:00Z",
  },
  {
    id: 3,
    title: "The Power of TypeScript in React Applications",
    content:
      "TypeScript adds static typing to JavaScript, making your code more robust and easier to maintain. Learn how to leverage TypeScript in your React applications for improved developer experience and fewer runtime errors.",
    createdAt: "2023-05-20T09:15:00Z",
  },
  {
    id: 4,
    title: "The Power of TypeScript in React Applications",
    content:
      "TypeScript adds static typing to JavaScript, making your code more robust and easier to maintain. Learn how to leverage TypeScript in your React applications for improved developer experience and fewer runtime errors.",
    createdAt: "2023-05-20T09:15:00Z",
  },
  {
    id: 5,
    title: "The Power of TypeScript in React Applications",
    content:
      "TypeScript adds static typing to JavaScript, making your code more robust and easier to maintain. Learn how to leverage TypeScript in your React applications for improved developer experience and fewer runtime errors.",
    createdAt: "2023-05-20T09:15:00Z",
  },
  {
    id: 6,
    title: "The Power of TypeScript in React Applications",
    content:
      "TypeScript adds static typing to JavaScript, making your code more robust and easier to maintain. Learn how to leverage TypeScript in your React applications for improved developer experience and fewer runtime errors.",
    createdAt: "2023-05-20T09:15:00Z",
  },
  {
    id: 7,
    title: "The Power of TypeScript in React Applications",
    content:
      "TypeScript adds static typing to JavaScript, making your code more robust and easier to maintain. Learn how to leverage TypeScript in your React applications for improved developer experience and fewer runtime errors.",
    createdAt: "2023-05-20T09:15:00Z",
  },
  {
    id: 8,
    title: "The Power of TypeScript in React Applications",
    content:
      "TypeScript adds static typing to JavaScript, making your code more robust and easier to maintain. Learn how to leverage TypeScript in your React applications for improved developer experience and fewer runtime errors.",
    createdAt: "2023-05-20T09:15:00Z",
  },
  {
    id: 9,
    title: "The Power of TypeScript in React Applications",
    content:
      "TypeScript adds static typing to JavaScript, making your code more robust and easier to maintain. Learn how to leverage TypeScript in your React applications for improved developer experience and fewer runtime errors.",
    createdAt: "2023-05-20T09:15:00Z",
  },
  {
    id: 10,
    title: "The Power of TypeScript in React Applications",
    content:
      "TypeScript adds static typing to JavaScript, making your code more robust and easier to maintain. Learn how to leverage TypeScript in your React applications for improved developer experience and fewer runtime errors.",
    createdAt: "2023-05-20T09:15:00Z",
  },
  {
    id: 11,
    title: "The Power of TypeScript in React Applications",
    content:
      "TypeScript adds static typing to JavaScript, making your code more robust and easier to maintain. Learn how to leverage TypeScript in your React applications for improved developer experience and fewer runtime errors.",
    createdAt: "2023-05-20T09:15:00Z",
  },

];

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {samplePosts.map((post) => (
            <BlogCard key={post.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
