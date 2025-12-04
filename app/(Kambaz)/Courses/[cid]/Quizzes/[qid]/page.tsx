"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../../../Account/useAuth";
import * as client from "../client";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const { isStudent, canEditCourse } = useAuth();
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuiz();
    }, [qid]);

    const loadQuiz = async () => {
        try {
            const data = await client.findQuizById(qid as string);
            setQuiz(data);
        } catch (error) {
            console.error("Failed to load quiz:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStartQuiz = () => {
        // This will be implemented later when we build the quiz-taking interface
        alert("Quiz taking interface will be implemented in the next phase");
    };

    if (loading) {
        return <div className="p-4">Loading quiz...</div>;
    }

    if (!quiz) {
        return <div className="p-4">Quiz not found</div>;
    }

    return (
        <div className="p-4">
            <h1>{quiz.title}</h1>

            {quiz.description && (
                <p className="text-muted">{quiz.description}</p>
            )}

            <div className="my-3">
                <p><strong>Quiz Type:</strong> {quiz.quizType}</p>
                <p><strong>Points:</strong> {quiz.points}</p>
                <p><strong>Questions:</strong> {quiz.questionCount || 0}</p>
                <p><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>
                <p><strong>Due Date:</strong> {quiz.dueDate} at {quiz.dueTime}</p>
                <p><strong>Available From:</strong> {quiz.availableFromDate} at {quiz.availableFromTime}</p>
                <p><strong>Available Until:</strong> {quiz.availableUntilDate} at {quiz.availableUntilTime}</p>
            </div>

            <div className="d-flex gap-2">
                {isStudent && quiz.published && (
                    <Button
                        variant="danger"
                        size="lg"
                        onClick={handleStartQuiz}
                    >
                        Start Quiz
                    </Button>
                )}

                {canEditCourse && (
                    <Button
                        variant="secondary"
                        onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
                    >
                        Back to Quizzes
                    </Button>
                )}
            </div>

            {isStudent && !quiz.published && (
                <div className="alert alert-warning mt-3">
                    This quiz is not yet available.
                </div>
            )}

            {canEditCourse && (
                <div className="alert alert-info mt-3">
                    <strong>Faculty View:</strong> Quiz editing interface will be implemented in the next phase.
                </div>
            )}
        </div>
    );
}