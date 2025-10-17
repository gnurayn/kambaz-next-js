"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles.css";

export default function AccountNavigation() {
  const pathname = usePathname();

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
    </div>
  );
}

