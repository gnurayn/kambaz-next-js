"use client";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import * as client from "./client";

const Plus = FaPlus as React.ElementType;
const Search = FaSearch as React.ElementType;
const EllipsisVertical = IoEllipsisVertical as React.ElementType;

interface QuizControlsProps {
    onQuizCreated: (quiz: any) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function QuizControls({ onQuizCreated, searchQuery, onSearchChange }: QuizControlsProps) {
    const { cid } = useParams();
    const router = useRouter();

    const handleAddQuiz = async () => {
        try {
            const newQuiz = {
                title: "Untitled Quiz",
                description: "",
                quizType: "Graded Quiz",
                points: 0,
                assignmentGroup: "Quizzes",
                shuffleAnswers: true,
                timeLimit: 20,
                multipleAttempts: false,
                showCorrectAnswers: false,
                accessCode: "",
                oneQuestionAtATime: true,
                webcamRequired: false,
                lockQuestionsAfterAnswering: false,
                dueDate: new Date().toISOString().split('T')[0],
                dueTime: "11:59 pm",
                availableFromDate: new Date().toISOString().split('T')[0],
                availableFromTime: "12:00 am",
                availableUntilDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                availableUntilTime: "11:59 pm",
                published: false,
                questionCount: 0,
            };

            const createdQuiz = await client.createQuizForCourse(cid as string, newQuiz);
            onQuizCreated(createdQuiz);

            router.push(`/Courses/${cid}/Quizzes/${createdQuiz._id}`);
        } catch (error) {
            console.error("Failed to create quiz:", error);
            alert("Failed to create quiz");
        }
    };

    return (
        <div
            id="wd-quiz-controls"
            className="d-flex align-items-center gap-2 mb-3"
        >
            <div className="position-relative" style={{ width: "250px" }}>
                <Search
                    className="position-absolute"
                    style={{
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        color: "#6c757d",
                    }}
                />
                <Form.Control
                    type="text"
                    placeholder="Search for Quiz"
                    className="ps-5"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="d-flex gap-2 ms-auto">
                <Button
                    variant="danger"
                    size="lg"
                    id="wd-add-quiz-btn"
                    onClick={handleAddQuiz}
                >
                    <Plus className="position-relative me-2" style={{ bottom: ".75px" }} />
                    Quiz
                </Button>

                <Button
                    variant="secondary"
                    size="lg"
                    id="wd-quiz-menu"
                >
                    <EllipsisVertical />
                </Button>
            </div>
        </div>
    );
}