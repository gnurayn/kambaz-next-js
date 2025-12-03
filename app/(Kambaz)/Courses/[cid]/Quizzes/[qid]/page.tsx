"use client";
import { useParams } from "next/navigation";

export default function QuizDetails() {
    const { cid, qid } = useParams();

    return (
        <div className="p-4">
            <h1>Quiz Details</h1>
            <p>Course: {cid}</p>
            <p>Quiz: {qid}</p>
            <p className="text-muted">This page will be implemented later</p>
        </div>
    );
}