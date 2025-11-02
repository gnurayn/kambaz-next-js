"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";

export default function CourseGuard({ children }: { children: React.ReactNode }) {
    const { cid } = useParams();
    const router = useRouter();
    const { enrolledCourses } = useSelector((state: any) => state.enrollmentReducer);

    useEffect(() => {
        if (Array.isArray(enrolledCourses) && !enrolledCourses.includes(cid)) {
            router.replace("/Dashboard");
        }
    }, [cid, enrolledCourses, router]);

    return <>{children}</>;
}
