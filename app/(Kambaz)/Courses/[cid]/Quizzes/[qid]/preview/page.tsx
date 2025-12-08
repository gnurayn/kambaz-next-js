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
    quizType: string;
    points: number;
    assignmentGroup: string;
    shuffleAnswers: boolean;
    timeLimit?: number;
    multipleAttempts: boolean;
    showCorrectAnswers: boolean;
    accessCode?: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate?: string;
    availableFromDate?: string;
    availableUntilDate?: string;
    published: boolean;
    questions: Question[];
}

export default function QuizPreviewPage() {
    const params = useParams();
    const router = useRouter();
    const cid = params.cid as string;
    const qid = params.qid as string;

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuizData();
    }, [qid]);

    const loadQuizData = async () => {
        try {
            const quizData = await client.findQuizById(qid);
            setQuiz(quizData);

            // Initialize answers object
            const initialAnswers: Record<number, string> = {};
            quizData.questions?.forEach((_: Question, index: number) => {
                initialAnswers[index] = "";
            });
            setAnswers(initialAnswers);
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

    const getCorrectAnswer = (question: Question): string => {
        if (question.type === "true-false") {
            return question.correctAnswer ? "True" : "False";
        }

        if (question.type === "multiple-choice" && question.answers) {
            const correctAns = question.answers.find((ans) => ans.isCorrect);
            return correctAns?.text || "";
        }

        if (question.type === "fill-in-blank" && question.possibleAnswers) {
            return question.possibleAnswers.join(", ");
        }

        return "";
    };

    const calculateScore = () => {
        let totalPoints = 0;
        let earnedPoints = 0;

        quiz?.questions?.forEach((question, index) => {
            totalPoints += question.points;
            const userAnswer = answers[index];

            if (question.type === "multiple-choice" && question.answers) {
                const correctAns = question.answers.find((ans) => ans.isCorrect);
                if (correctAns && userAnswer === correctAns.text) {
                    earnedPoints += question.points;
                }
            } else if (question.type === "true-false") {
                const correctAns = question.correctAnswer ? "True" : "False";
                if (userAnswer === correctAns) {
                    earnedPoints += question.points;
                }
            } else if (
                question.type === "fill-in-blank" &&
                question.possibleAnswers
            ) {
                const userAns = String(userAnswer).toLowerCase().trim();
                const isCorrect = question.possibleAnswers.some(
                    (possible) => possible.toLowerCase().trim() === userAns
                );
                if (isCorrect) {
                    earnedPoints += question.points;
                }
            }
        });

        return { earnedPoints, totalPoints };
    };

    const handleSubmit = () => {
        const { earnedPoints, totalPoints } = calculateScore();
        setScore(totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0);
        setSubmitted(true);
    };

    const isAnswerCorrect = (
        question: Question,
        questionIndex: number
    ): boolean => {
        const userAnswer = answers[questionIndex];

        if (question.type === "multiple-choice" && question.answers) {
            const correctAns = question.answers.find((ans) => ans.isCorrect);
            return correctAns?.text === userAnswer;
        }

        if (question.type === "true-false") {
            const correctAns = question.correctAnswer ? "True" : "False";
            return userAnswer === correctAns;
        }

        if (question.type === "fill-in-blank" && question.possibleAnswers) {
            const userAns = String(userAnswer).toLowerCase().trim();
            return question.possibleAnswers.some(
                (possible) => possible.toLowerCase().trim() === userAns
            );
        }

        return false;
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
                <div className="fs-4">Loading quiz preview...</div>
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

    return (
        <div className="container" style={{ maxWidth: "900px", padding: "2rem" }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h1 className="mb-2">{quiz.title} - Preview</h1>
                    <p className="text-muted">
                        This is a preview. Your answers will not be saved.
                    </p>
                </div>
                {!submitted && (
                    <button
                        onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
                        className="btn btn-primary"
                    >
                        Edit Quiz
                    </button>
                )}
            </div>

            {/* Quiz Info */}
            {!submitted && (
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
            )}

            {/* Questions or Results */}
            {!submitted ? (
                <>
                    {/* Questions */}
                    <div className="d-flex flex-column gap-4">
                        {quiz.questions?.map((question, index) => (
                            <div key={index} className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <h5 className="card-title mb-0">Question {index + 1}</h5>
                                        <span className="badge bg-secondary">{question.points} pts</span>
                                    </div>

                                    <p className="mb-3 fw-semibold">{question.question}</p>

                                    {/* Multiple Choice */}
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
                                                        onChange={(e) =>
                                                            handleAnswerChange(index, e.target.value)
                                                        }
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

                                    {/* True/False */}
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
                                                        onChange={(e) =>
                                                            handleAnswerChange(index, e.target.value)
                                                        }
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

                                    {/* Fill in the Blank */}
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

                    {/* Submit Button */}
                    <div className="text-center mt-4">
                        <button
                            onClick={handleSubmit}
                            className="btn btn-success btn-lg px-5"
                        >
                            Submit Quiz Preview
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Results Summary */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Quiz Results</h2>
                            <div className="text-center py-4">
                                <div className="display-1 fw-bold text-primary mb-2">
                                    {score.toFixed(1)}%
                                </div>
                                <p className="text-muted fs-5">
                                    {quiz.questions?.filter((q, i) => isAnswerCorrect(q, i))
                                        .length || 0}{" "}
                                    out of {quiz.questions?.length || 0} correct
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Results */}
                    <div className="d-flex flex-column gap-4">
                        {quiz.questions?.map((question, index) => {
                            const correct = isAnswerCorrect(question, index);
                            const userAnswer = answers[index];
                            const correctAnswer = getCorrectAnswer(question);

                            return (
                                <div
                                    key={index}
                                    className={`card border-2 ${correct ? "border-success bg-success-subtle" : "border-danger bg-danger-subtle"
                                        }`}
                                >
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <h5 className="card-title mb-0">Question {index + 1}</h5>
                                            <div className="text-end">
                                                <span
                                                    className={`fw-bold fs-5 ${correct ? "text-success" : "text-danger"
                                                        }`}
                                                >
                                                    {correct ? "✓ Correct" : "✗ Incorrect"}
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
                                                <span className={correct ? "text-success" : "text-danger"}>
                                                    {String(userAnswer) || "(No answer)"}
                                                </span>
                                            </p>
                                            {!correct && (
                                                <p className="mb-0">
                                                    <strong>Correct Answer:</strong>{" "}
                                                    <span className="text-success">{correctAnswer}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                const resetAnswers: Record<number, string> = {};
                                quiz.questions?.forEach((_, index) => {
                                    resetAnswers[index] = "";
                                });
                                setAnswers(resetAnswers);
                            }}
                            className="btn btn-secondary btn-lg px-4"
                        >
                            Retake Preview
                        </button>
                        <button
                            onClick={() =>
                                router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)
                            }
                            className="btn btn-primary btn-lg px-4"
                        >
                            Edit Quiz
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}