import { Computer, DiamondPlus, Logs, Pointer } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="flex flex-col bg-slate-100">
      <div className="px-2 sm:pl-14 py-3 border border-black">
        <Link href={"/"} className="flex gap-2 items-center">
          <Pointer size={28} />
          <span className="text-center">Attack-Capital Intern-task</span>
        </Link>
      </div>
      <div className="w-28 sm:w-80 h-[100dvh] relative py-12 border border-black">
        <div className="w-[50%] sm:w-[80%] absolute right-0">
          <Link
            href="/dashboard/addBlog"
            className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000] cursor-pointer"
          >
            <DiamondPlus size={28} />
            <p>Add blogs</p>
          </Link>
          <Link
            href="/dashboard/blogList"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000] cursor-pointer"
          >
            <Logs size={28} />
            <p>Blogs list</p>
          </Link>
          <Link
            href="https://github.com/webbedpiyush" target="_blank"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000] cursor-pointer"
          >
            <Computer size={28} />
            <p>New versions feature</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
