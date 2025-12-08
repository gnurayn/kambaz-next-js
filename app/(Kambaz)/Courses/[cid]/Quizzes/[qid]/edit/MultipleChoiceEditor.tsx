"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface MultipleChoiceQuestion {
    _id?: string;
    type: "multiple-choice";
    title: string;
    points: number;
    question: string;
    answers: Answer[];
}

interface MultipleChoiceEditorProps {
    question?: MultipleChoiceQuestion;
    onSave: (question: MultipleChoiceQuestion) => void;
    onCancel: () => void;
}

export default function MultipleChoiceEditor({ question, onSave, onCancel }: MultipleChoiceEditorProps) {
    const [formData, setFormData] = useState<MultipleChoiceQuestion>(
        question || {
            type: "multiple-choice",
            title: "",
            points: 4,
            question: "",
            answers: [
                { id: "1", text: "", isCorrect: true },
                { id: "2", text: "", isCorrect: false },
                { id: "3", text: "", isCorrect: false },
                { id: "4", text: "", isCorrect: false },
            ],
        }
    );

    const handleAddAnswer = () => {
        const newAnswer: Answer = {
            id: Date.now().toString(),
            text: "",
            isCorrect: false,
        };
        setFormData({
            ...formData,
            answers: [...formData.answers, newAnswer],
        });
    };

    const handleRemoveAnswer = (id: string) => {
        if (formData.answers.length <= 2) {
            alert("Must have at least 2 answers");
            return;
        }
        setFormData({
            ...formData,
            answers: formData.answers.filter((a) => a.id !== id),
        });
    };

    const handleAnswerTextChange = (id: string, text: string) => {
        setFormData({
            ...formData,
            answers: formData.answers.map((a) =>
                a.id === id ? { ...a, text } : a
            ),
        });
    };

    const handleCorrectAnswerChange = (id: string) => {
        setFormData({
            ...formData,
            answers: formData.answers.map((a) => ({
                ...a,
                isCorrect: a.id === id,
            })),
        });
    };

    const handleSave = () => {
        if (!formData.title.trim()) {
            alert("Please enter a question title");
            return;
        }
        if (!formData.question.trim()) {
            alert("Please enter the question text");
            return;
        }
        if (formData.answers.some((a) => !a.text.trim())) {
            alert("All answers must have text");
            return;
        }
        if (!formData.answers.some((a) => a.isCorrect)) {
            alert("Please select a correct answer");
            return;
        }
        onSave(formData);
    };

    return (
        <div className="border rounded p-4 mb-3">
            {/* Top Row: Title, Type, Points */}
            <div className="d-flex align-items-center gap-3 mb-3">
                <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Question Title"
                    style={{ flex: 1 }}
                />
                <Form.Select
                    value="multiple-choice"
                    disabled
                    style={{ width: "200px" }}
                >
                    <option value="multiple-choice">Multiple Choice</option>
                </Form.Select>
                <div className="d-flex align-items-center gap-2">
                    <span>pts:</span>
                    <Form.Control
                        type="number"
                        value={formData.points}
                        onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                        style={{ width: "80px" }}
                    />
                </div>
            </div>

            <hr />

            <p className="text-muted small">
                Enter your question and multiple answers, then select the one correct answer.
            </p>

            {/* Question */}
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Question:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder="Enter your question text here"
                />
            </Form.Group>

            {/* Answers */}
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Answers:</Form.Label>
                {formData.answers.map((answer, index) => (
                    <div key={answer.id} className="d-flex align-items-center gap-2 mb-2">
                        <Form.Check
                            type="radio"
                            name="correctAnswer"
                            checked={answer.isCorrect}
                            onChange={() => handleCorrectAnswerChange(answer.id)}
                        />
                        <span className="text-muted" style={{ minWidth: "120px" }}>
                            {answer.isCorrect ? "Correct Answer" : "Possible Answer"}
                        </span>
                        <Form.Control
                            type="text"
                            value={answer.text}
                            onChange={(e) => handleAnswerTextChange(answer.id, e.target.value)}
                            placeholder={`Answer text`}
                        />
                        {formData.answers.length > 2 && (
                            <Button
                                variant="link"
                                className="text-danger"
                                onClick={() => handleRemoveAnswer(answer.id)}
                            >
                                <FaTrash />
                            </Button>
                        )}
                    </div>
                ))}
                <Button variant="link" className="text-danger p-0 mt-2" onClick={handleAddAnswer}>
                    + Add Another Answer
                </Button>
            </Form.Group>

            {/* Action Buttons */}
            <div className="d-flex gap-2 mt-3">
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleSave}>
                    Update Question
                </Button>
            </div>
        </div>
    );
}