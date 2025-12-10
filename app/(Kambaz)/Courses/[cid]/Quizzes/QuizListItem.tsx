"use client";
import { useRouter } from "next/navigation";
import { Dropdown } from "react-bootstrap";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { RxRocket } from "react-icons/rx";
import { useAuth } from "../../../Account/useAuth";

const CheckCircle = FaCheckCircle as React.ElementType;
const Circle = FaCircle as React.ElementType;

interface QuizListItemProps {
    quiz: any;
    courseId: string;
    onDelete: (quizId: string) => void;
    onPublishToggle: (quizId: string, published: boolean) => void;
}

function GreenCheckmark() {
    return (
        <span className="me-1 position-relative">
            <CheckCircle style={{ top: "2px" }} className="text-success me-1 position-absolute fs-5" />
            <Circle className="text-white me-1 fs-6" />
        </span>
    );
}

export default function QuizListItem({ quiz, courseId, onDelete, onPublishToggle }: QuizListItemProps) {
    const router = useRouter();
    const { canEditCourse, isStudent } = useAuth();

    console.log("Quiz object:", quiz);
    console.log("Quiz ID:", quiz._id);
    console.log("Quiz id:", quiz.id);

    const getAvailabilityStatus = () => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const [year1, month1, day1] = quiz.availableFromDate.split('-');
        const availableDate = new Date(parseInt(year1), parseInt(month1) - 1, parseInt(day1));

        const [year2, month2, day2] = quiz.availableUntilDate.split('-');
        const untilDate = new Date(parseInt(year2), parseInt(month2) - 1, parseInt(day2));

        if (now > untilDate) {
            return { text: "Closed", color: "#000" };
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
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div
            className="d-flex align-items-center border-bottom py-3 position-relative"
            style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "4px",
                    backgroundColor: "#198754"
                }}
            />

            <div
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "2px",
                    backgroundColor: "#dee2e6"
                }}
            />

            <div className="me-3">
                <RxRocket className="text-success" style={{ fontSize: "24px" }} />
            </div>

            <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
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
                        <div style={{ color: "#000", fontSize: "14px" }}>
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
                                    <strong>Score:</strong> {quiz.lastScore.toFixed(1)}%
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
                                    textDecoration: "none",
                                    fontSize: "20px"
                                }}
                                title={quiz.published ? "Published - Click to unpublish" : "Unpublished - Click to publish"}
                            >
                                {quiz.published ? <GreenCheckmark /> : "🚫"}
                            </button>
                        )}

                        {canEditCourse && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    as="div"
                                    style={{
                                        fontSize: "20px",
                                        color: "#6c757d",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center"
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