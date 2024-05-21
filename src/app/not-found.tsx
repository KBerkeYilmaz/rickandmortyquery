import Link from "next/link";
import { OctagonAlert } from "lucide-react";
export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-4">
      <div>
        <OctagonAlert className="h-20 w-20 text-red-500" />
      </div>
      <div>
        <h1 className="font-bold text-xl">404: Not Found</h1>
        <p>Could not find requested resource</p>
        <Link href="/">
          Return <span className="hover:text-blue-500">Home</span>
        </Link>
      </div>
    </div>
  );
}
