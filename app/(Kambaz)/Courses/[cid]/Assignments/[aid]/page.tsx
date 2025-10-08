import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaRegCalendarAlt } from "react-icons/fa";

const Calendar = FaRegCalendarAlt as React.ElementType;

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <div className="d-flex flex-column">
                <span>Assignment Name</span>
                <div className="position-relative mt-2" style={{ width: "500px" }}>
                    <Form.Control
                        type="text"
                        defaultValue="A1"
                        className="ps-3"
                        style={{
                            color: "black",
                            fontWeight: "normal",
                        }}
                    />
                </div><br />

                <div style={{ width: "500px" }}>
                    <Form.Control
                        as="textarea"
                        defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kambaz application
- Links to all relevant source code repositories

The Kambaz application should include a link to navigate back to the landing page.`}
                        style={{
                            minHeight: "275px",
                            fontSize: "14px",
                            lineHeight: "1.5",
                            whiteSpace: "pre-wrap",
                        }}
                    />

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px", gap: "8px" }}>
                        <span>Points</span>
                        <Form.Control
                            type="text"
                            defaultValue="100"
                            style={{ width: "350px" }}
                        />
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px", gap: "8px" }}>
                        <span>Assignment Group</span>
                        <Form.Select style={{ width: "350px" }}>
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        </Form.Select>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px", gap: "8px" }}>
                        <span>Display Grade</span>
                        <Form.Select style={{ width: "350px" }}>
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="LETTER">Letter</option>
                        </Form.Select>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px", gap: "8px" }}>
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

                            <div style={{ fontWeight: "bold", color: "black", marginBottom: "15px" }}>
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
                                    <Form.Check type="checkbox" label={label} name="submission-options" style={{ marginBottom: "15px" }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px", gap: "8px" }}>
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
                            <div style={{ fontWeight: "bold", color: "black", marginBottom: "5px" }}>
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

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        backgroundColor: "#e9ecef",
                                        borderRadius: "0.25rem",
                                        padding: "3px 25px",
                                        fontSize: "1rem",
                                    }}
                                >
                                    Everyone
                                    <span style={{ marginLeft: "6px", fontWeight: "normal", fontSize: "1.3rem", lineHeight: "1", cursor: "default", }}>×</span>
                                </div>

                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    style={{ border: "none", boxShadow: "none", flex: 1, minWidth: "60px" }}
                                />
                            </div>

                            <div style={{ fontWeight: "bold", color: "black", marginTop: "15px" }}>
                                Due
                            </div>

                            <div style={{ position: "relative", marginTop: "5px" }}>
                                <Form.Control
                                    type="date"
                                    defaultValue="2024-05-13"
                                    style={{ paddingRight: "40px" }}
                                />

                            </div>

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
                                <Form.Control type="date" defaultValue="2024-05-06" style={{ width: "200px" }} />
                                <Form.Control type="date" defaultValue="2024-05-20" style={{ width: "200px" }} />
                            </div>



                        </div>
                    </div>

                    <hr
                        style={{
                            marginTop: "15px",
                            marginBottom: "15px",
                            border: "none",
                            height: "1px",
                            backgroundColor: "rgba(0,0,0,0.9)",
                            width: "100%",
                        }}
                    />

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "5px", marginTop: "5px" }}>
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
                        <Button variant="danger">Save</Button>
                    </div>

                </div>

            </div>

        </div>
    );
}
