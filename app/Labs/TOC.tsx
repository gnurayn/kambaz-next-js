<<<<<<< Updated upstream
=======
"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
>>>>>>> Stashed changes
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TOC() {
<<<<<<< Updated upstream
 return (
   <ul>
     <li>
       <Link href="/Labs" id="wd-lab1-link">
         Home </Link>
     </li>
     <li>
       <Link href="/Labs/Lab1" id="wd-lab1-link">
         Lab 1 </Link>
     </li>
     <li>
       <Link href="/Labs/Lab2" id="wd-lab2-link">
         Lab 2 </Link>
     </li>
     <li>
       <Link href="/Labs/Lab3" id="wd-lab3-link">
         Lab 3 </Link>
     </li>
   </ul>
);}
=======
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
>>>>>>> Stashed changes
