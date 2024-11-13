"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { cn } from "@/lib/utils";

const ActiveLink = ({key, href, children, className, activeClassName } ) => {
      const pathname = usePathname()
      const isActive = pathname === href ;
  return (
    <Link
      key={key}
      href={href}
      className={cn(
        'px-4 py-2 uppercase -tracking-wide text-sm sm:text-xl',
        isActive ? activeClassName : className
      )}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;