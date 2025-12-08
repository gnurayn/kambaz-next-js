"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import * as client from "../../client";
import MultipleChoiceEditor from "./MultipleChoiceEditor";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("details");
    const [questions, setQuestions] = useState<any[]>([]);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

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

    const handleSave = async () => {
        try {
            await client.updateQuiz(qid as string, quiz);
            alert("Quiz saved successfully!");
            router.push(`/Courses/${cid}/Quizzes/${qid}`);
        } catch (error) {
            console.error("Failed to save quiz:", error);
            alert("Failed to save quiz");
        }
    };

    const handleSaveAndPublish = async () => {
        try {
            await client.updateQuiz(qid as string, { ...quiz, published: true });
            alert("Quiz saved and published!");
            router.push(`/Courses/${cid}/Quizzes`);
        } catch (error) {
            console.error("Failed to save quiz:", error);
            alert("Failed to save quiz");
        }
    };

    const handleCancel = () => {
        router.push(`/Courses/${cid}/Quizzes`);
    };

    if (loading) {
        return <div className="p-4">Loading quiz...</div>;
    }

    if (!quiz) {
        return <div className="p-4">Quiz not found</div>;
    }

    return (
        <div className="p-4">
            {/* Header with Points, Published Status, and Ellipsis */}
            <div className="d-flex justify-content-end align-items-center mb-3">
                <div className="d-flex align-items-center gap-3">
                    <span>Points {quiz.points}</span>
                    <span className="text-muted">
                        {quiz.published ? "✓ Published" : "○ Not Published"}
                    </span>
                    <Button
                        variant="secondary"
                        size="sm"
                        style={{ cursor: "default" }}
                    >
                        <IoEllipsisVertical />
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <Nav variant="tabs" className="mb-4">
                <Nav.Item>
                    <Nav.Link
                        active={activeTab === "details"}
                        onClick={() => setActiveTab("details")}
                    >
                        Details
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        active={activeTab === "questions"}
                        onClick={() => setActiveTab("questions")}
                    >
                        Questions
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/* Details Tab Content */}
            {activeTab === "details" && (
                <div style={{ maxWidth: "600px" }}>
                    {/* Title */}
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            value={quiz.title}
                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                            placeholder="Unnamed Quiz"
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                        />
                    </Form.Group>

                    {/* Quiz Instructions */}
                    <Form.Group className="mb-3">
                        <Form.Label>Quiz Instructions:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={6}
                            value={quiz.description || ""}
                            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                            placeholder="Enter quiz instructions..."
                        />
                    </Form.Group>

                    {/* Quiz Type */}
                    <Form.Group className="mb-3">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <Form.Label className="mb-0">Quiz Type</Form.Label>
                            </div>
                            <div className="col-8">
                                <Form.Select
                                    value={quiz.quizType}
                                    onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                                >
                                    <option value="Graded Quiz">Graded Quiz</option>
                                    <option value="Practice Quiz">Practice Quiz</option>
                                    <option value="Graded Survey">Graded Survey</option>
                                    <option value="Ungraded Survey">Ungraded Survey</option>
                                </Form.Select>
                            </div>
                        </div>
                    </Form.Group>

                    {/* Assignment Group */}
                    <Form.Group className="mb-3">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <Form.Label className="mb-0">Assignment Group</Form.Label>
                            </div>
                            <div className="col-8">
                                <Form.Select
                                    value={quiz.assignmentGroup}
                                    onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
                                >
                                    <option value="QUIZZES">Quizzes</option>
                                    <option value="EXAMS">Exams</option>
                                    <option value="ASSIGNMENTS">Assignments</option>
                                    <option value="PROJECT">Project</option>
                                </Form.Select>
                            </div>
                        </div>
                    </Form.Group>

                    {/* Options Section */}
                    <div className="mb-4">
                        <h6 className="mb-3">Options</h6>

                        {/* Shuffle Answers */}
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Shuffle Answers"
                                checked={quiz.shuffleAnswers}
                                onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                            />
                        </Form.Group>

                        {/* Time Limit */}
                        <Form.Group className="mb-3">
                            <div className="d-flex align-items-center gap-2">
                                <Form.Check
                                    type="checkbox"
                                    label="Time Limit"
                                    checked={quiz.timeLimit > 0}
                                    onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })}
                                />
                                {quiz.timeLimit > 0 && (
                                    <>
                                        <Form.Control
                                            type="number"
                                            value={quiz.timeLimit}
                                            onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 0 })}
                                            style={{ width: "80px" }}
                                        />
                                        <span>Minutes</span>
                                    </>
                                )}
                            </div>
                        </Form.Group>

                        {/* Allow Multiple Attempts */}
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Allow Multiple Attempts"
                                checked={quiz.multipleAttempts}
                                onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                            />
                        </Form.Group>

                        {/* Show Correct Answers */}
                        <Form.Group className="mb-3">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <Form.Label className="mb-0">Show Correct Answers</Form.Label>
                                </div>
                                <div className="col-8">
                                    <Form.Select
                                        value={quiz.showCorrectAnswers ? "Immediately" : "Never"}
                                        onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value === "Immediately" })}
                                    >
                                        <option value="Never">Never</option>
                                        <option value="Immediately">Immediately</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </Form.Group>

                        {/* Access Code */}
                        <Form.Group className="mb-3">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <Form.Label className="mb-0">Access Code</Form.Label>
                                </div>
                                <div className="col-8">
                                    <Form.Control
                                        type="text"
                                        value={quiz.accessCode || ""}
                                        onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                                        placeholder="Leave blank for no access code"
                                    />
                                </div>
                            </div>
                        </Form.Group>

                        {/* One Question at a Time */}
                        <Form.Group className="mb-3">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <Form.Label className="mb-0">One Question at a Time</Form.Label>
                                </div>
                                <div className="col-8">
                                    <Form.Select
                                        value={quiz.oneQuestionAtATime ? "Yes" : "No"}
                                        onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.value === "Yes" })}
                                    >
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </Form.Group>

                        {/* Webcam Required */}
                        <Form.Group className="mb-3">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <Form.Label className="mb-0">Webcam Required</Form.Label>
                                </div>
                                <div className="col-8">
                                    <Form.Select
                                        value={quiz.webcamRequired ? "Yes" : "No"}
                                        onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.value === "Yes" })}
                                    >
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </Form.Group>

                        {/* Lock Questions After Answering */}
                        <Form.Group className="mb-3">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <Form.Label className="mb-0">Lock Questions After Answering</Form.Label>
                                </div>
                                <div className="col-8">
                                    <Form.Select
                                        value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                                        onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.value === "Yes" })}
                                    >
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </Form.Group>
                    </div>

                    {/* Assign Section */}
                    <div className="border rounded p-3 mb-4">
                        <h6 className="mb-3">Assign</h6>

                        {/* Assign to */}
                        <Form.Group className="mb-3">
                            <Form.Label>Assign to</Form.Label>
                            <div className="border rounded p-2 d-flex align-items-center gap-2">
                                <span className="badge bg-light text-dark">Everyone ×</span>
                            </div>
                        </Form.Group>

                        {/* Due */}
                        <Form.Group className="mb-3">
                            <Form.Label>Due</Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Control
                                    type="date"
                                    value={quiz.dueDate}
                                    onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                                />
                                <Form.Control
                                    type="text"
                                    value={quiz.dueTime}
                                    onChange={(e) => setQuiz({ ...quiz, dueTime: e.target.value })}
                                    placeholder="Time"
                                    style={{ width: "120px" }}
                                />
                            </div>
                        </Form.Group>

                        {/* Available from and Until */}
                        <div className="row">
                            <div className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Available from</Form.Label>
                                    <div className="d-flex gap-2">
                                        <Form.Control
                                            type="date"
                                            value={quiz.availableFromDate}
                                            onChange={(e) => setQuiz({ ...quiz, availableFromDate: e.target.value })}
                                        />
                                    </div>
                                    <Form.Control
                                        type="text"
                                        value={quiz.availableFromTime}
                                        onChange={(e) => setQuiz({ ...quiz, availableFromTime: e.target.value })}
                                        placeholder="Time"
                                        className="mt-2"
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Until</Form.Label>
                                    <div className="d-flex gap-2">
                                        <Form.Control
                                            type="date"
                                            value={quiz.availableUntilDate}
                                            onChange={(e) => setQuiz({ ...quiz, availableUntilDate: e.target.value })}
                                        />
                                    </div>
                                    <Form.Control
                                        type="text"
                                        value={quiz.availableUntilTime}
                                        onChange={(e) => setQuiz({ ...quiz, availableUntilTime: e.target.value })}
                                        placeholder="Time"
                                        className="mt-2"
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="light" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="light" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="danger" onClick={handleSaveAndPublish}>
                            Save & Publish
                        </Button>
                    </div>
                </div>
            )}

            {/* Questions Tab Content */}
            {activeTab === "questions" && (
                <div>
                    <div className="mb-3">
                        <Button
                            variant="danger"
                            onClick={() => setEditingQuestionIndex(questions.length)}
                        >
                            + New Question
                        </Button>
                    </div>

                    {/* List of Questions */}
                    {questions.map((q, index) => (
                        <div key={index}>
                            {editingQuestionIndex === index ? (
                                <MultipleChoiceEditor
                                    question={q}
                                    onSave={(updatedQuestion) => {
                                        const newQuestions = [...questions];
                                        newQuestions[index] = updatedQuestion;
                                        setQuestions(newQuestions);
                                        setEditingQuestionIndex(null);
                                        // Update quiz points
                                        const totalPoints = newQuestions.reduce((sum, q) => sum + q.points, 0);
                                        setQuiz({ ...quiz, points: totalPoints, questionCount: newQuestions.length });
                                    }}
                                    onCancel={() => setEditingQuestionIndex(null)}
                                />
                            ) : (
                                <div className="border rounded p-3 mb-3">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h6>{q.title}</h6>
                                            <p className="text-muted small mb-1">{q.question}</p>
                                            <p className="small mb-0">
                                                <strong>Type:</strong> Multiple Choice | <strong>Points:</strong> {q.points}
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => setEditingQuestionIndex(index)}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* New Question Editor */}
                    {editingQuestionIndex === questions.length && (
                        <MultipleChoiceEditor
                            onSave={(newQuestion) => {
                                const newQuestions = [...questions, newQuestion];
                                setQuestions(newQuestions);
                                setEditingQuestionIndex(null);
                                // Update quiz points
                                const totalPoints = newQuestions.reduce((sum, q) => sum + q.points, 0);
                                setQuiz({ ...quiz, points: totalPoints, questionCount: newQuestions.length });
                            }}
                            onCancel={() => setEditingQuestionIndex(null)}
                        />
                    )}

                    {/* Empty State */}
                    {questions.length === 0 && editingQuestionIndex === null && (
                        <div className="text-center py-5 text-muted">
                            <p>No questions yet. Click "+ New Question" to add one.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}