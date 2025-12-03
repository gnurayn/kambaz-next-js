"use client";
import { useRouter } from "next/navigation";
import { Dropdown } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { useAuth } from "../../../Account/useAuth";

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
            return { text: "Closed", color: "#6c757d" };
        } else if (now >= availableDate && now <= untilDate) {
            return { text: "Available", color: "#000" };
        } else {
            return {
                text: `Not available until ${availableDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${quiz.availableFromTime}`,
                color: "#000"
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

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div
            className="d-flex align-items-start border-bottom py-3 position-relative"
            style={{ paddingLeft: "20px" }}
        >
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "4px",
                    backgroundColor: "#4caf50"
                }}
            />

            <div className="me-3">
                <span style={{ fontSize: "24px" }}>📝</span>
            </div>

            <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <h5
                            className="mb-1"
                            style={{
                                cursor: "pointer",
                                color: "#000",
                                fontWeight: "bold",
                                fontSize: "18px"
                            }}
                            onClick={handleTitleClick}
                        >
                            {quiz.title}
                        </h5>
                        <div style={{ color: "#6c757d", fontSize: "14px" }}>
                            <span style={{ color: availability.color }}>
                                <strong>{availability.text}</strong>
                            </span>
                            {" | "}
                            <strong>Due</strong> {formatDate(quiz.dueDate)} at {quiz.dueTime}
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
                                style={{
                                    fontSize: "20px",
                                    textDecoration: "none",
                                    color: quiz.published ? "#28a745" : "#6c757d"
                                }}
                                title={quiz.published ? "Published - Click to unpublish" : "Unpublished - Click to publish"}
                            >
                                <BsCheckCircleFill />
                            </button>
                        )}

                        {canEditCourse && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    as="div"
                                    style={{
                                        fontSize: "20px",
                                        color: "#6c757d",
                                        cursor: "pointer"
                                    }}
                                >
                                    <IoEllipsisVertical />
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