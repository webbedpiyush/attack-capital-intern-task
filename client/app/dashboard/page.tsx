export default function Page({
  searchParams,
}: {
  searchParams: { userId?: string };
}) {
  const userId = searchParams.userId || "Guest";

  return <div className="flex flex-col w-full text-center text-3xl">
    Some features can be added here 
  </div>;
}
