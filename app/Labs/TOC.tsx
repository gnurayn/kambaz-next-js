<<<<<<< HEAD
"use client";
=======
>>>>>>> a2
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TOC() {
<<<<<<< HEAD
  const pathname = usePathname();
  return (
    <Nav variant="pills" className="flex-row">
      <NavItem>
        <NavLink href="/Labs" as={Link} className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}>Labs</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab1" as={Link} className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}>Lab 1</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab2" as={Link} className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}>Lab 2</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab3" as={Link} className={`nav-link ${pathname.endsWith("Lab3") ? "active" : ""}`}>Lab 3</NavLink>
=======
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink href="/Labs" as={Link}>Labs</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab1" as={Link}>Lab 1</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab2" as={Link}>Lab 2</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab3" as={Link}>Lab 3</NavLink>
>>>>>>> a2
      </NavItem>
      <NavItem>
        <NavLink href="/" as={Link}>Kambaz</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/gnurayn" as={Link}>My Github</NavLink>
      </NavItem>
    </Nav>
  );
}
<<<<<<< HEAD
=======

>>>>>>> a2
