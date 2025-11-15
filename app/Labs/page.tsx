"use client";
import Link from "next/link";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";
export default function Labs() {
  const pathname = usePathname();
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <h2>Nurayn Guru - Online Section</h2>
      <Nav variant="pills" className="flex-row">
        <NavItem>
          <NavLink href="/Labs/Lab1" id="wd-lab1-link" as={Link} className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}>Lab 1</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Labs/Lab2" id="wd-lab2-link" as={Link} className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}>Lab 2</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Labs/Lab3" id="wd-lab3-link" as={Link} className={`nav-link ${pathname.endsWith("Lab3") ? "active" : ""}`}>Lab 3</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Labs/Lab4" id="wd-lab4-link" as={Link} className={`nav-link ${pathname.endsWith("Lab4") ? "active" : ""}`}>Lab 4</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Labs/Lab5" id="wd-lab5-link" as={Link} className={`nav-link ${pathname.endsWith("Lab5") ? "active" : ""}`}>Lab 5</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}