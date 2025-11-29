"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import "../styles.css";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const links = [
    { href: "/Account/Signin", label: "Signin" },
    { href: "/Account/Signup", label: "Signup" },
    { href: "/Account/Profile", label: "Profile" },
  ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`list-group-item border-0 ${pathname === link.href ? "active" : ""
            }`}
        >
          {link.label}
        </Link>
      ))}

      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          href="/Account/Users"
          className={`list-group-item border-0 ${pathname.endsWith("Users") ? "active" : ""
            }`}
        >
          Users
        </Link>
      )}
    </div>
  );
}