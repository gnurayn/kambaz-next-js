"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../client";

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface Question {
    type: string;
    title: string;
    points: number;
    question: string;
    answers?: Answer[];
    correctAnswer?: boolean;
    possibleAnswers?: string[];
}

interface Quiz {
    _id: string;
    title: string;
    description?: string;
    points: number;
    timeLimit?: number;
    multipleAttempts: boolean;
    allowedAttempts?: number;
    showCorrectAnswers: boolean;
    questions: Question[];
}

interface AttemptAnswer {
    questionIndex: number;
    answer: string;
    isCorrect: boolean;
    pointsEarned: number;
}

interface Attempt {
    _id: string;
    attemptNumber: number;
    answers: AttemptAnswer[];
    score: number;
    totalPoints: number;
    submittedAt: string;
}

export default function TakeQuizPage() {
    const params = useParams();
    const router = useRouter();
    const cid = params.cid as string;
    const qid = params.qid as string;

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [latestAttempt, setLatestAttempt] = useState<Attempt | null>(null);
    const [attemptCount, setAttemptCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadQuizData();
    }, [qid]);

    const loadQuizData = async () => {
        try {
            const [quizData, attempt, attempts] = await Promise.all([
                client.findQuizById(qid),
                client.getLatestAttempt(qid),
                client.getStudentAttempts(qid)
            ]);

            setQuiz(quizData);
            setLatestAttempt(attempt);
            setAttemptCount(attempts.length);

            if (attempt) {
                setSubmitted(true);
            } else {
                const initialAnswers: Record<number, string> = {};
                quizData.questions?.forEach((_: Question, index: number) => {
                    initialAnswers[index] = "";
                });
                setAnswers(initialAnswers);
            }
        } catch (error) {
            console.error("Error loading quiz data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionIndex: number, answer: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionIndex]: answer,
        }));
    };

    const handleSubmit = async () => {
        if (submitting) return;

        setSubmitting(true);
        try {
            const attempt = await client.submitQuizAttempt(qid, answers);
            setLatestAttempt(attempt);
            setSubmitted(true);
            setAttemptCount(prev => prev + 1);
        } catch (error: any) {
            console.error("Error submitting quiz:", error);
            alert(error.message || "Failed to submit quiz");
        } finally {
            setSubmitting(false);
        }
    };

    const handleRetake = () => {
        if (!quiz) return;

        const maxAttempts = quiz.multipleAttempts ? (quiz.allowedAttempts || 1) : 1;
        if (attemptCount >= maxAttempts) {
            alert("You have exhausted all attempts for this quiz.");
            return;
        }

        const initialAnswers: Record<number, string> = {};
        quiz.questions?.forEach((_, index) => {
            initialAnswers[index] = "";
        });
        setAnswers(initialAnswers);
        setSubmitted(false);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
                <div className="fs-4">Loading quiz...</div>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
                <div className="fs-4 text-danger">Quiz not found</div>
            </div>
        );
    }

    const maxAttempts = quiz.multipleAttempts ? (quiz.allowedAttempts || 1) : 1;
    const canRetake = attemptCount < maxAttempts;

    return (
        <div className="container" style={{ maxWidth: "900px", padding: "2rem" }}>
            <div className="mb-4">
                <h1 className="mb-2">{quiz.title}</h1>
                <p className="text-muted">
                    Attempt {attemptCount} of {maxAttempts}
                </p>
            </div>

            {!submitted ? (
                <>
                    <div className="bg-light p-3 rounded mb-4">
                        <p className="mb-1">
                            <strong>Points:</strong> {quiz.points}
                        </p>
                        {quiz.timeLimit && (
                            <p className="mb-1">
                                <strong>Time Limit:</strong> {quiz.timeLimit} minutes
                            </p>
                        )}
                        <p className="mb-0">
                            <strong>Questions:</strong> {quiz.questions?.length || 0}
                        </p>
                    </div>

                    <div className="d-flex flex-column gap-4">
                        {quiz.questions?.map((question, index) => (
                            <div key={index} className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <h5 className="card-title mb-0">Question {index + 1}</h5>
                                        <span className="badge bg-secondary">{question.points} pts</span>
                                    </div>

                                    <p className="mb-3 fw-semibold">{question.question}</p>

                                    {question.type === "multiple-choice" && question.answers && (
                                        <div className="d-flex flex-column gap-2">
                                            {question.answers.map((answer, answerIndex) => (
                                                <div
                                                    key={answerIndex}
                                                    className="form-check p-3 border rounded"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`question-${index}`}
                                                        id={`q${index}-a${answerIndex}`}
                                                        value={answer.text}
                                                        checked={answers[index] === answer.text}
                                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                    />
                                                    <label
                                                        className="form-check-label w-100"
                                                        htmlFor={`q${index}-a${answerIndex}`}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {answer.text}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {question.type === "true-false" && (
                                        <div className="d-flex flex-column gap-2">
                                            {["True", "False"].map((option) => (
                                                <div
                                                    key={option}
                                                    className="form-check p-3 border rounded"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`question-${index}`}
                                                        id={`q${index}-${option}`}
                                                        value={option}
                                                        checked={answers[index] === option}
                                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                    />
                                                    <label
                                                        className="form-check-label w-100"
                                                        htmlFor={`q${index}-${option}`}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {question.type === "fill-in-blank" && (
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your answer"
                                            value={answers[index] || ""}
                                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="btn btn-danger btn-lg px-5"
                        >
                            {submitting ? "Submitting..." : "Submit Quiz"}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {latestAttempt && (
                        <>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h2 className="card-title mb-4">Quiz Results</h2>
                                    <div className="text-center py-4">
                                        <div className="display-1 fw-bold text-primary mb-2">
                                            {latestAttempt.score.toFixed(1)}%
                                        </div>
                                        <p className="text-muted fs-5">
                                            {latestAttempt.answers.filter(a => a.isCorrect).length} out of{" "}
                                            {quiz.questions?.length || 0} correct
                                        </p>
                                        <p className="text-muted">
                                            Submitted: {new Date(latestAttempt.submittedAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {quiz.showCorrectAnswers && (
                                <div className="d-flex flex-column gap-4">
                                    {quiz.questions?.map((question, index) => {
                                        const attemptAnswer = latestAttempt.answers.find(
                                            a => a.questionIndex === index
                                        );
                                        const isCorrect = attemptAnswer?.isCorrect || false;

                                        return (
                                            <div
                                                key={index}
                                                className={`card border-2 ${isCorrect
                                                    ? "border-success bg-success-subtle"
                                                    : "border-danger bg-danger-subtle"
                                                    }`}
                                            >
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                                        <h5 className="card-title mb-0">Question {index + 1}</h5>
                                                        <div className="text-end">
                                                            <span
                                                                className={`fw-bold fs-5 ${isCorrect ? "text-success" : "text-danger"
                                                                    }`}
                                                            >
                                                                {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                                                            </span>
                                                            <p className="text-muted mb-0 small">
                                                                {question.points} pts
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="mb-3 fw-semibold">{question.question}</p>

                                                    <div className="d-flex flex-column gap-2">
                                                        <p className="mb-1">
                                                            <strong>Your Answer:</strong>{" "}
                                                            <span className={isCorrect ? "text-success" : "text-danger"}>
                                                                {attemptAnswer?.answer || "(No answer)"}
                                                            </span>
                                                        </p>
                                                        {!isCorrect && (
                                                            <p className="mb-0">
                                                                <strong>Correct Answer:</strong>{" "}
                                                                <span className="text-success">
                                                                    {question.type === "true-false"
                                                                        ? question.correctAnswer ? "True" : "False"
                                                                        : question.type === "multiple-choice"
                                                                            ? question.answers?.find(a => a.isCorrect)?.text
                                                                            : question.possibleAnswers?.join(", ")}
                                                                </span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="d-flex justify-content-center gap-3 mt-4">
                                {canRetake && (
                                    <button onClick={handleRetake} className="btn btn-primary btn-lg px-4">
                                        Retake Quiz ({maxAttempts - attemptCount} attempts remaining)
                                    </button>
                                )}
                                {!canRetake && (
                                    <div className="alert alert-info">
                                        You have used all {maxAttempts} attempts for this quiz.
                                    </div>
                                )}
                                <button
                                    onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
                                    className="btn btn-secondary btn-lg px-4"
                                >
                                    Back to Quiz Details
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}