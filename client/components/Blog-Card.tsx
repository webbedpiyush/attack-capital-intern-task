'use client'

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PostProps {
  id: number
  title: string
  content: string
  createdAt: string
}

export default function BlogCard({ post }: { post: PostProps }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <article className="rounded-lg shadow-md dark:shadow-gray-700 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
            <time className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-0">
              {new Date(post.createdAt).toLocaleString()}
            </time>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.content}</p>
          <div className="mt-4">
            <button
              className="text-sm text-primary font-medium hover:underline transition-all duration-300"
              onClick={() => setIsOpen(true)}
            >
              Read More
            </button>
          </div>
        </div>
      </article>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-3xl h-[calc(100vh-2rem)] max-h-[600px] p-0">
          <ScrollArea className="h-full">
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl">{post.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-2">
                <p className="text-xs sm:text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{post.content}</p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}

