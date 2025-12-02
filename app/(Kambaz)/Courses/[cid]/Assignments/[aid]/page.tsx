"use client";

import { useParams, useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments, updateAssignment } from "../reducer";
import Link from "next/link";
import * as client from "../../../client";
import { useAuth } from "../../../../Account/useAuth";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { canEditCourse } = useAuth();

    const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
    const foundAssignment = assignments.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: any) => a._id === aid
    );
    const isEditing = !!foundAssignment;

    useEffect(() => {
        if (!canEditCourse) {
            alert("Only Faculty and Admin can edit assignments");
            router.push(`/Courses/${cid}/Assignments`);
        }
    }, [canEditCourse, router, cid]);

    if (!canEditCourse) {
        return (
            <div className="alert alert-danger">
                Access denied. Only Faculty and Admin can edit assignments.
            </div>
        );
    }

    const fieldRowStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "500px",
        marginTop: "12px",
        gap: "8px",
    };

    const months: Record<string, string> = {
        Jan: "01", Feb: "02", Mar: "03", Apr: "04",
        May: "05", Jun: "06", Jul: "07", Aug: "08",
        Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    };

    const stripHtml = (html: string) => {
        if (!html) return "";
        return html.replace(/<[^>]*>/g, "");
    };

    const blankAssignment = {
        _id: "",
        title: "",
        description: "",
        points: "",
        dueDateDate: "",
        availableFromDate: "",
        availableUntilDate: "11:59 pm",
        dueDateTime: "11:59 pm",
        availableFromTime: "12:00 am",
        availableUntilTime: "11:59 pm",
        course: cid,
        module: "Multiple Modules",
    };

    const [assignment, setAssignment] = useState(
        isEditing
            ? { ...foundAssignment, description: stripHtml(foundAssignment.description) }
            : { ...blankAssignment }
    );

    const onCreateAssignmentForCourse = async (newAssignmentData: any) => {
        if (!cid) return;
        const assignment = await client.createAssignmentForCourse(cid as string, newAssignmentData);
        dispatch(setAssignments([...assignments, assignment]));
    };

    const onUpdateAssignment = async (assignment: any) => {
        await client.updateAssignment(assignment);
        const newAssignments = assignments.map((a: any) => a._id === assignment._id ? assignment : a);
        dispatch(setAssignments(newAssignments));
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAssignment((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (isEditing) {
            await onUpdateAssignment({ ...assignment, editing: false })
        } else {
            await onCreateAssignmentForCourse(assignment);
        }
        router.push(`/Courses/${cid}/Assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="d-flex flex-column">
            <div style={{ width: "500px", marginTop: "10px" }}>
                <span>Assignment Name</span>
                <Form.Control
                    type="text"
                    name="title"
                    value={assignment.title}
                    className="ps-3 mt-2"
                    onChange={handleChange}
                    style={{
                        color: "black",
                        fontWeight: "normal",
                    }}
                />
            </div>

            <div style={{ width: "500px", marginTop: "15px" }}>
                <label>Description</label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="description"
                    value={assignment.description}
                    onChange={handleChange}
                    style={{
                        fontSize: "14px",
                        lineHeight: "1.5",
                        whiteSpace: "normal",
                        border: "1px solid #dee2e6",
                        borderRadius: ".25rem",
                        padding: "10px",
                        backgroundColor: "white",
                        color: "black",
                    }}
                />
            </div>

            <div style={fieldRowStyle}>
                <span>Points</span>
                <Form.Control
                    type="text"
                    name="points"
                    value={assignment.points}
                    onChange={handleChange}
                    style={{ width: "350px" }}
                />
            </div>

            <div style={fieldRowStyle}>
                <span>Assignment Group</span>
                <Form.Select style={{ width: "350px" }}>
                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                </Form.Select>
            </div>

            <div style={fieldRowStyle}>
                <span>Display Grade</span>
                <Form.Select style={{ width: "350px" }}>
                    <option value="PERCENTAGE">Percentage</option>
                    <option value="LETTER">Letter</option>
                </Form.Select>
            </div>

            <div style={fieldRowStyle}>
                <span>Submission Type</span>
                <div
                    style={{
                        border: "1px solid #ced4da",
                        borderRadius: ".25rem",
                        padding: "10px",
                        width: "350px",
                        background: "white",
                    }}
                >
                    <Form.Select style={{ marginBottom: "15px" }}>
                        <option>Online</option>
                    </Form.Select>

                    <div
                        style={{
                            fontWeight: "bold",
                            color: "black",
                            marginBottom: "15px",
                        }}
                    >
                        Online Entry Options
                    </div>

                    {[
                        "Text Entry",
                        "Website URL",
                        "Media Recordings",
                        "Student Annotation",
                        "File Uploads",
                    ].map((label) => (
                        <div key={label}>
                            <Form.Check
                                type="checkbox"
                                label={label}
                                name="submission-options"
                                style={{ marginBottom: "10px" }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div style={fieldRowStyle}>
                <span>Assign</span>
                <div
                    style={{
                        border: "1px solid #ced4da",
                        borderRadius: ".25rem",
                        padding: "10px",
                        width: "350px",
                        background: "white",
                    }}
                >
                    <div
                        style={{
                            fontWeight: "bold",
                            color: "black",
                            marginBottom: "5px",
                        }}
                    >
                        Assign to
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            border: "1px solid #ced4da",
                            borderRadius: ".25rem",
                            padding: "5px",
                            minHeight: "38px",
                            gap: "5px",
                            justifyContent: "flex-start",
                        }}
                    >

                        <Form.Control
                            type="text"
                            placeholder=""
                            style={{
                                border: "none",
                                boxShadow: "none",
                                flex: 1,
                                minWidth: "60px",
                            }}
                        />
                    </div>

                    <div
                        style={{
                            fontWeight: "bold",
                            color: "black",
                            marginTop: "15px",
                        }}
                    >
                        Due
                    </div>
                    <Form.Control
                        type="date"
                        name="dueDate"
                        value={assignment.dueDateDate}
                        onChange={(e) =>
                            setAssignment((prev: any) => ({ ...prev, dueDateDate: e.target.value }))
                        }
                        style={{ marginTop: "5px" }}
                    />

                    <div
                        style={{
                            fontWeight: "bold",
                            color: "black",
                            marginTop: "15px",
                            display: "flex",
                            gap: "60px",
                        }}
                    >
                        <span>Available from</span>
                        <span>Until</span>
                    </div>

                    <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                        <Form.Control
                            type="date"
                            name="availableFrom"
                            value={assignment.availableFromDate}
                            onChange={(e) =>
                                setAssignment((prev: any) => ({ ...prev, availableFromDate: e.target.value }))
                            }
                            style={{ width: "200px" }}
                        />
                        <Form.Control
                            type="date"
                            name="availableUntil"
                            value={assignment.availableUntilDate}
                            onChange={(e) =>
                                setAssignment((prev: any) => ({ ...prev, availableUntilDate: e.target.value }))
                            }
                            style={{ width: "200px" }}
                        />
                    </div>
                </div>
            </div>

            <hr
                style={{
                    marginTop: "20px",
                    marginBottom: "15px",
                    border: "none",
                    height: "1px",
                    backgroundColor: "rgba(0,0,0,0.9)",
                    width: "500px",
                }}
            />

            <div
                style={{
                    width: "500px",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "5px",
                }}
            >
                <Link href={`/Courses/${cid}/Assignments`}>
                    <Button
                        variant="light"
                        style={{
                            backgroundColor: "#e9ecef",
                            border: "1px solid #888",
                            color: "#444",
                        }}
                    >
                        Cancel
                    </Button>
                </Link>

                <Button variant="danger" onClick={handleSave}>Save</Button>

            </div>
        </div>
    );
}
