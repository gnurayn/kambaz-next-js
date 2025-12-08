"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface TrueFalseQuestion {
    _id?: string;
    type: "true-false";
    title: string;
    points: number;
    question: string;
    correctAnswer: boolean;
}

interface TrueFalseEditorProps {
    question?: TrueFalseQuestion;
    onSave: (question: TrueFalseQuestion) => void;
    onCancel: () => void;
}

export default function TrueFalseEditor({ question, onSave, onCancel }: TrueFalseEditorProps) {
    const [formData, setFormData] = useState<TrueFalseQuestion>(
        question || {
            type: "true-false",
            title: "",
            points: 3,
            question: "",
            correctAnswer: true,
        }
    );

    const handleSave = () => {
        if (!formData.title.trim()) {
            alert("Please enter a question title");
            return;
        }
        if (!formData.question.trim()) {
            alert("Please enter the question text");
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
                    value="true-false"
                    disabled
                    style={{ width: "150px" }}
                >
                    <option value="true-false">True/False</option>
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

            <p className="text-muted small mb-3">
                Enter your question text, then select if True or False is the correct answer.
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

                <div className="d-flex align-items-center gap-3 mb-2 ps-3">
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setFormData({ ...formData, correctAnswer: true })}
                    >
                        {formData.correctAnswer === true ? "✓" : "○"}
                    </span>
                    <span
                        style={{
                            color: formData.correctAnswer === true ? "#28a745" : "#000",
                            cursor: "pointer"
                        }}
                        onClick={() => setFormData({ ...formData, correctAnswer: true })}
                    >
                        True
                    </span>
                </div>

                <div className="d-flex align-items-center gap-3 ps-3">
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setFormData({ ...formData, correctAnswer: false })}
                    >
                        {formData.correctAnswer === false ? "✓" : "○"}
                    </span>
                    <span
                        style={{
                            color: formData.correctAnswer === false ? "#28a745" : "#000",
                            cursor: "pointer"
                        }}
                        onClick={() => setFormData({ ...formData, correctAnswer: false })}
                    >
                        False
                    </span>
                </div>
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