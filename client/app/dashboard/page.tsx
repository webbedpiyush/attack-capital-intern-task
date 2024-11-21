import { CircleUserRound } from "lucide-react";

export default function Page({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams.userId || "Guest";

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
        <h3 className="font-medium">Dashboard</h3>
        <div className="flex items-center gap-3">
          <span className="text-lg md:text-2xl">User ID: {userId}</span>
          <CircleUserRound size={40} />
        </div>
      </div>
    </div>
  )
}