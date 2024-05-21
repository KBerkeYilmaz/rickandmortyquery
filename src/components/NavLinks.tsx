"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession } from "next-auth/react";

const NavLinks = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isActive = (path: string) => {
    // Check if the path is the current route
    return pathname === path;
  };

  const getLinkClass = (path: string) => {
    return clsx("transition-colors hover:text-foreground tracking-wider", {
      "text-foreground": isActive(path),
      "text-muted-foreground": !isActive(path),
    });
  };

  return (
    <>
      <Link key="home" href="/" className={getLinkClass("/")}>
        Home
      </Link>
      <Link key="works" href="/works" className={getLinkClass("/works")}>
        Works
      </Link>
      <Link key="cv" href="/cv" className={getLinkClass("/cv")}>
        CV
      </Link> 
      {status === "authenticated" && (
        <Link
          key="dashboard"
          href="/dashboard"
          className={getLinkClass("/dashboard")}
        >
          Dashboard
        </Link>
      )}
    </>
  );
};

export default NavLinks;
