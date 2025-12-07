"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import * as quizClient from "./Quizzes/client";
import * as assignmentClient from "../client";

export default function Breadcrumb({ course }: { course: { name: string } | undefined }) {
    const pathname = usePathname();
    const params = useParams();
    const [quizTitle, setQuizTitle] = useState<string>("");
    const [assignmentTitle, setAssignmentTitle] = useState<string>("");

    useEffect(() => {
        // If we're on a quiz page, fetch the quiz title
        if (pathname.includes("/Quizzes/") && params.qid) {
            loadQuizTitle();
        }

        // If we're on an assignment page, fetch the assignment title
        if (pathname.includes("/Assignments/") && params.aid) {
            loadAssignmentTitle();
        }
    }, [pathname, params.qid, params.aid]);

    const loadQuizTitle = async () => {
        try {
            const quiz = await quizClient.findQuizById(params.qid as string);
            setQuizTitle(quiz.title || "Untitled Quiz");
        } catch (error) {
            console.error("Failed to load quiz:", error);
            setQuizTitle("Untitled Quiz");
        }
    };

    const loadAssignmentTitle = async () => {
        try {
            const assignment = await assignmentClient.findAssignmentById(params.aid as string);
            setAssignmentTitle(assignment.title || "Untitled Assignment");
        } catch (error) {
            console.error("Failed to load assignment:", error);
            setAssignmentTitle("Untitled Assignment");
        }
    };

    const getBreadcrumb = () => {
        const segments = pathname.split("/").filter(Boolean);

        // Check if we're in Quizzes section
        if (pathname.includes("/Quizzes")) {
            const parts = [course?.name];
            parts.push("Quizzes");

            // If we're on a specific quiz page (details or edit)
            if (params.qid) {
                parts.push(quizTitle || "Untitled Quiz");
            }

            return parts.join(" > ");
        }

        // Check if we're in Assignments section
        if (pathname.includes("/Assignments")) {
            const parts = [course?.name];
            parts.push("Assignments");

            // If we're on a specific assignment page (details or edit)
            if (params.aid) {
                parts.push(assignmentTitle || "Untitled Assignment");
            }

            return parts.join(" > ");
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