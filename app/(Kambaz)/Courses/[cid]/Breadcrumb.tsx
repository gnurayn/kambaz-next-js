"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import * as quizClient from "@/app/(Kambaz)/Courses/[cid]/Quizzes/client";

export default function Breadcrumb({ course }: { course: { name: string } | undefined }) {
    const pathname = usePathname();
    const params = useParams();
    const [quizTitle, setQuizTitle] = useState<string>("");

    useEffect(() => {
        // If we're on a quiz page, fetch the quiz title
        if (pathname.includes("/Quizzes/") && params.qid) {
            loadQuizTitle();
        }
    }, [pathname, params.qid]);

    const loadQuizTitle = async () => {
        try {
            const quiz = await quizClient.findQuizById(params.qid as string);
            setQuizTitle(quiz.title);
        } catch (error) {
            console.error("Failed to load quiz:", error);
        }
    };

    const getBreadcrumb = () => {
        const segments = pathname.split("/").filter(Boolean);

        // Check if we're in Quizzes section
        if (pathname.includes("/Quizzes")) {
            const parts = [course?.name];

            parts.push("Quizzes");

            // If we're on a specific quiz page (details or edit)
            if (params.qid && quizTitle) {
                parts.push(quizTitle);
            }

            return parts.join(" > ");
        }

        // Check if we're in Assignments section
        if (pathname.includes("/Assignments")) {
            return `${course?.name} > Assignments`;
        }

        // Check if we're in Modules section
        if (pathname.includes("/Modules")) {
            return `${course?.name} > Modules`;
        }

        // Default: show last segment
        return `${course?.name} > ${segments[segments.length - 1]}`;
    };

    return (
        <span>
            {getBreadcrumb()}
        </span>
    );
}