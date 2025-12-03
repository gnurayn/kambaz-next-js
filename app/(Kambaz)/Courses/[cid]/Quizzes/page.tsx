"use client";
import { useParams } from "next/navigation";

export default function QuizzesPage() {
  const { cid } = useParams();

  return (
    <div className="p-4">
      <h1>Quizzes</h1>
    </div>
  );
}