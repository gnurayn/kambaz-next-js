"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
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
        alert("Quiz taking interface will be implemented in the next phase");
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    if (loading) {
        return <div className="p-4">Loading quiz...</div>;
    }

    if (!quiz) {
        return <div className="p-4">Quiz not found</div>;
    }

    return (
        <div className="p-4">
            {/* Header Buttons */}
            <div className="d-flex justify-content-end gap-2 mb-3">
                <Button
                    variant="outline-secondary"
                    onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/preview`)}
                >
                    Preview
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
                >
                    Edit <FaPencilAlt />
                </Button>
            </div>

            <hr />

            {/* Quiz Title */}
            <h2 className="mb-4">{quiz.title}</h2>

            {/* Faculty View - Detailed Quiz Info */}
            {canEditCourse && (
                <div className="border rounded p-4" style={{ maxWidth: "800px" }}>
                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">Quiz Type</div>
                        <div className="col-7">{quiz.quizType || "Graded Quiz"}</div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">Points</div>
                        <div className="col-7">{quiz.points}</div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">Assignment Group</div>
                        <div className="col-7">{quiz.assignmentGroup || "QUIZZES"}</div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">Shuffle Answers</div>
                        <div className="col-7">{quiz.shuffleAnswers ? "Yes" : "No"}</div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">Time Limit</div>
                        <div className="col-7">{quiz.timeLimit} Minutes</div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">Multiple Attempts</div>
                        <div className="col-7">{quiz.multipleAttempts ? "Yes" : "No"}</div>
                    </div>

                    {quiz.multipleAttempts && (
                        <div className="row mb-3">
                            <div className="col-5 text-end fw-bold">How Many Attempts</div>
                            <div className="col-7">{quiz.allowedAttempts || 1}</div>
                        </div>
                    )}

                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">View Responses</div>
                        <div className="col-7">Always</div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">Show Correct Answers</div>
                        <div className="col-7">{quiz.showCorrectAnswers ? "Immediately" : "Never"}</div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">One Question at a Time</div>
                        <div className="col-7">{quiz.oneQuestionAtATime ? "Yes" : "No"}</div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">Require Respondus LockDown Browser</div>
                        <div className="col-7">No</div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">Required to View Quiz Results</div>
                        <div className="col-7">No</div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">Webcam Required</div>
                        <div className="col-7">{quiz.webcamRequired ? "Yes" : "No"}</div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-5 text-end fw-bold">Lock Questions After Answering</div>
                        <div className="col-7">{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</div>
                    </div>

                    {/* Dates Table */}
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>Due</th>
                                <th>For</th>
                                <th>Available from</th>
                                <th>Until</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{formatDate(quiz.dueDate)} at {quiz.dueTime}</td>
                                <td>Everyone</td>
                                <td>{formatDate(quiz.availableFromDate)} at {quiz.availableFromTime}</td>
                                <td>{formatDate(quiz.availableUntilDate)} at {quiz.availableUntilTime}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Student View - Simple Info */}
            {isStudent && (
                <div>
                    {quiz.description && (
                        <p className="mb-3">{quiz.description}</p>
                    )}

                    <div className="mb-3">
                        <p><strong>Quiz Type:</strong> {quiz.quizType}</p>
                        <p><strong>Points:</strong> {quiz.points}</p>
                        <p><strong>Questions:</strong> {quiz.questionCount || 0}</p>
                        <p><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>
                        <p><strong>Due:</strong> {formatDate(quiz.dueDate)} at {quiz.dueTime}</p>
                        <p><strong>Available:</strong> {formatDate(quiz.availableFromDate)} - {formatDate(quiz.availableUntilDate)}</p>
                    </div>

                    {quiz.published ? (
                        <Button
                            variant="danger"
                            size="lg"
                            onClick={handleStartQuiz}
                        >
                            Start Quiz
                        </Button>
                    ) : (
                        <div className="alert alert-warning">
                            This quiz is not yet available.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}