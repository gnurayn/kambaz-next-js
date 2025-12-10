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
        if (pathname.includes("/Quizzes/") && params.qid) {
            loadQuizTitle();
        }

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

        if (pathname.includes("/Quizzes")) {
            const parts = [course?.name];
            parts.push("Quizzes");

            if (params.qid) {
                parts.push(quizTitle || "Untitled Quiz");
            }

            return parts.join(" > ");
        }

        if (pathname.includes("/Assignments")) {
            const parts = [course?.name];
            parts.push("Assignments");

            if (params.aid) {
                parts.push(assignmentTitle || "Untitled Assignment");
            }

            return parts.join(" > ");
        }

        if (pathname.includes("/Modules")) {
            return `${course?.name} > Modules`;
        }

        return `${course?.name} > ${segments[segments.length - 1]}`;
    };

    return (
        <span>
            {getBreadcrumb()}
        </span>
    );
}