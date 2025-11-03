"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import CourseGuard from "./CourseGuard";

/* eslint-disable @typescript-eslint/no-explicit-any */
const AlignJustify = FaAlignJustify as React.ElementType;

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [showNav, setShowNav] = useState(true);
  return (
    <CourseGuard>
      <div id="wd-courses">
        <h2 className="text-danger">
          <AlignJustify className="me-4 fs-4 mb-1"
            style={{ cursor: "pointer" }}
            onClick={() => setShowNav(!showNav)} />
          <Breadcrumb course={course} />
        </h2> <hr />

        <div className="d-flex">
          {showNav && (
            <div className="d-none d-md-block">
              <CourseNavigation />
            </div>)}

          <div className="flex-fill">
            {children}
          </div></div>

      </div>

    </CourseGuard>
  );
}

