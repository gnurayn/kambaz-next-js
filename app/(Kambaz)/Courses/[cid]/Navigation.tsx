"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./coursenavigation.css";

export default function CourseNavigation() {
  const rawPathname = usePathname();
  const [pathname, setPathname] = useState(rawPathname);
  const { cid } = useParams();

  useEffect(() => {
    setPathname(rawPathname);
  }, [rawPathname]);

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const href =
          link === "People" ? `/Courses/${cid}/People` : `/Courses/${cid}/${link}`;

        return (
          <Link
            key={href}
            href={href}
            className={`list-group-item border-0 ${pathname === href ? "active" : ""
              }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
