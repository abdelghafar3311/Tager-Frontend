'use client'
import Link from "next/link"
import Alarm from "@/UI/Alarm/alarm"
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  return (
    <Alarm subject={"Something went wrong!"} type="error" ClassName="m-2">
      <p className="text-lg">{error.message}</p>
      <div className="flex gap-2 items-center">
        <button className="border-rose-800 text-rose-800 cursor-pointer" onClick={() => reset()}>Try again</button>
        <Link href="/" className="text-blue-600 cursor-pointer">Home</Link>
      </div>
    </Alarm>
  )
}