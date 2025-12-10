"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

interface FillInBlankQuestion {
    _id?: string;
    type: "fill-in-blank";
    title: string;
    points: number;
    question: string;
    possibleAnswers: string[];
}

interface FillInBlankEditorProps {
    question?: FillInBlankQuestion;
    onSave: (question: FillInBlankQuestion) => void;
    onCancel: () => void;
}

export default function FillInBlankEditor({ question, onSave, onCancel }: FillInBlankEditorProps) {
    const [formData, setFormData] = useState<FillInBlankQuestion>(
        question || {
            type: "fill-in-blank",
            title: "",
            points: 4,
            question: "",
            possibleAnswers: [""],
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

        const validAnswers = formData.possibleAnswers.filter(a => a.trim() !== "");
        if (validAnswers.length === 0) {
            alert("Please enter at least one possible answer");
            return;
        }

        const questionToSave: FillInBlankQuestion = {
            type: "fill-in-blank",
            title: formData.title,
            points: formData.points,
            question: formData.question,
            possibleAnswers: validAnswers,
        };

        onSave(questionToSave);
    };

    const addAnswer = () => {
        setFormData({
            ...formData,
            possibleAnswers: [...formData.possibleAnswers, ""]
        });
    };

    const removeAnswer = (index: number) => {
        if (formData.possibleAnswers.length <= 1) {
            alert("Must have at least 1 possible answer");
            return;
        }
        const newAnswers = formData.possibleAnswers.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            possibleAnswers: newAnswers
        });
    };

    const updateAnswer = (index: number, value: string) => {
        const newAnswers = [...formData.possibleAnswers];
        newAnswers[index] = value;
        setFormData({
            ...formData,
            possibleAnswers: newAnswers
        });
    };

    return (
        <div className="border rounded p-4 mb-3">
            <div className="d-flex align-items-center gap-3 mb-3">
                <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Question Title"
                    style={{ flex: 1 }}
                />
                <Form.Select
                    value="fill-in-blank"
                    disabled
                    style={{ width: "200px" }}
                >
                    <option value="fill-in-blank">Fill In the Blank</option>
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
                Enter your question text, then define all possible correct answers for the blank.
            </p>

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

            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Answers:</Form.Label>
                {formData.possibleAnswers.map((answer, index) => (
                    <div key={index} className="d-flex align-items-center gap-2 mb-2">
                        <span className="text-muted" style={{ minWidth: "120px" }}>
                            Possible Answer
                        </span>
                        <Form.Control
                            type="text"
                            value={answer}
                            onChange={(e) => updateAnswer(index, e.target.value)}
                            placeholder="Enter possible answer"
                        />
                        {formData.possibleAnswers.length > 1 && (
                            <Button
                                variant="link"
                                className="text-danger"
                                onClick={() => removeAnswer(index)}
                            >
                                <FaTrash />
                            </Button>
                        )}
                    </div>
                ))}
                <Button
                    variant="link"
                    className="text-danger p-0 mt-2"
                    onClick={addAnswer}
                >
                    + Add Another Answer
                </Button>
            </Form.Group>

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