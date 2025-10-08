"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles.css";
import { Nav, NavItem, NavLink } from "react-bootstrap";

export default function AccountNavigation() {
  const pathname = usePathname();

  return (
    <Nav variant="pills" activeKey={pathname}>
      <NavItem>
        <NavLink
          as={Link}
          href="/Account/Signin"
          eventKey="/Account/Signin"
          className="custom-red"
        >
          Signin
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          as={Link}
          href="/Account/Signup"
          eventKey="/Account/Signup"
          className="custom-red"
        >
          Signup
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          as={Link}
          href="/Account/Profile"
          eventKey="/Account/Profile"
          className="custom-red"
        >
          Profile
        </NavLink>
      </NavItem>
    </Nav>
  );
}

