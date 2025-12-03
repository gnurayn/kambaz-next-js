"use client";
import { useRouter } from "next/navigation";
import { Dropdown } from "react-bootstrap";
import { useAuth } from "../../../Account/useAuth";
import "../../../style.css";

interface QuizListItemProps {
    quiz: any;
    courseId: string;
    onDelete: (quizId: string) => void;
    onPublishToggle: (quizId: string, published: boolean) => void;
}

export default function QuizListItem({ quiz, courseId, onDelete, onPublishToggle }: QuizListItemProps) {
    const router = useRouter();
    const { canEditCourse, isStudent } = useAuth();

    const getAvailabilityStatus = () => {
        const now = new Date();
        const availableDate = new Date(quiz.availableFromDate);
        const untilDate = new Date(quiz.availableUntilDate);

        if (now > untilDate) {
            return { text: "Closed", color: "text-danger" };
        } else if (now >= availableDate && now <= untilDate) {
            return { text: "Available", color: "text-success" };
        } else {
            return {
                text: `Not available until ${availableDate.toLocaleDateString()}`,
                color: "text-muted"
            };
        }
    };

    const availability = getAvailabilityStatus();

    const handleTitleClick = () => {
        router.push(`/Courses/${courseId}/Quizzes/${quiz._id}`);
    };

    const handleEdit = () => {
        router.push(`/Courses/${courseId}/Quizzes/${quiz._id}`);
    };

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
            onDelete(quiz._id);
        }
    };

    const handlePublishToggle = () => {
        onPublishToggle(quiz._id, !quiz.published);
    };

    return (
        <div className="d-flex align-items-start border-bottom py-3">
            <div className="me-3">
                <span style={{ fontSize: "24px" }}>📝</span>
            </div>

            <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <h5
                            className="mb-1"
                            style={{ cursor: "pointer", color: "#0066cc" }}
                            onClick={handleTitleClick}
                        >
                            {quiz.title}
                        </h5>
                        <div className="text-muted small">
                            <span className={availability.color}>
                                <strong>{availability.text}</strong>
                            </span>
                            {" | "}
                            <strong>Due</strong> {quiz.dueDate} at {quiz.dueTime}
                            {" | "}
                            {quiz.points} pts
                            {" | "}
                            {quiz.questionCount || 0} Questions
                            {isStudent && quiz.lastScore !== undefined && (
                                <>
                                    {" | "}
                                    <strong>Score:</strong> {quiz.lastScore} pts
                                </>
                            )}
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        {canEditCourse && (
                            <button
                                onClick={handlePublishToggle}
                                className="btn btn-link p-0"
                                style={{ fontSize: "20px", textDecoration: "none" }}
                                title={quiz.published ? "Published - Click to unpublish" : "Unpublished - Click to publish"}
                            >
                                {quiz.published ? "✅" : "🚫"}
                            </button>
                        )}

                        {canEditCourse && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    as="button"
                                    className="btn btn-link p-0 border-0"
                                    style={{
                                        fontSize: "18px",
                                        textDecoration: "none",
                                        color: "#aaa",
                                        background: "none",
                                        boxShadow: "none",
                                        fontWeight: "300",
                                        lineHeight: "1"
                                    }}
                                >
                                    ⋮
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleEdit}>
                                        Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleDelete} className="text-danger">
                                        Delete
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handlePublishToggle}>
                                        {quiz.published ? "Unpublish" : "Publish"}
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

