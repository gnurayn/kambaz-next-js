"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import * as client from "../../client";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("details");

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
            {/* Header with Points and Published Status */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Points {quiz.points}</h4>
                <div className="d-flex align-items-center gap-2">
                    <span className="text-muted">
                        {quiz.published ? "✓ Published" : "○ Not Published"}
                    </span>
                    <button className="btn btn-link">⋮</button>
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
                        <div className="border rounded p-2 mb-2" style={{ backgroundColor: "#f5f5f5" }}>
                            <div className="d-flex gap-2 mb-2" style={{ fontSize: "12px" }}>
                                <button className="btn btn-sm btn-light">Edit</button>
                                <button className="btn btn-sm btn-light">View</button>
                                <button className="btn btn-sm btn-light">Insert</button>
                                <button className="btn btn-sm btn-light">Format</button>
                                <button className="btn btn-sm btn-light">Tools</button>
                                <button className="btn btn-sm btn-light">Table</button>
                            </div>
                            <div className="d-flex gap-2 mb-2" style={{ fontSize: "12px" }}>
                                <select className="form-select form-select-sm" style={{ width: "80px" }}>
                                    <option>12pt</option>
                                </select>
                                <select className="form-select form-select-sm" style={{ width: "120px" }}>
                                    <option>Paragraph</option>
                                </select>
                                <button className="btn btn-sm btn-light"><strong>B</strong></button>
                                <button className="btn btn-sm btn-light"><em>I</em></button>
                                <button className="btn btn-sm btn-light"><u>U</u></button>
                            </div>
                        </div>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={quiz.description || ""}
                            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                            placeholder="Enter quiz instructions..."
                        />
                        <div className="text-end mt-1">
                            <small className="text-muted">0 words</small>
                        </div>
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
                                    <option value="QUIZZES">QUIZZES</option>
                                    <option value="EXAMS">EXAMS</option>
                                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                    <option value="PROJECT">PROJECT</option>
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

                        <Button variant="link" className="p-0">+ Add</Button>
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

            {/* Questions Tab Content (placeholder) */}
            {activeTab === "questions" && (
                <div className="p-4 text-center text-muted">
                    <h5>Questions Editor</h5>
                    <p>This section will be implemented next</p>
                </div>
            )}
        </div>
    );
}