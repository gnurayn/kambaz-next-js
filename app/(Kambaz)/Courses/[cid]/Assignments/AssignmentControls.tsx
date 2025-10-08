import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import React from "react";
import { Button, Form } from "react-bootstrap";

const Plus = FaPlus as React.ElementType;
const Search = FaSearch as React.ElementType;

export default function AssignmentControls() {
    return (
        <div
            id="wd-assignment-controls"
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
                    placeholder="Search..."
                    className="ps-5"
                />
            </div>

            <div className="d-flex gap-2 ms-auto">
                <Button variant="secondary" size="lg" id="wd-add-group-btn">
                    <Plus className="position-relative me-2" style={{ bottom: ".75px" }} />
                    Group
                </Button>

                <Button variant="danger" size="lg" id="wd-add-assignment-btn">
                    <Plus className="position-relative me-2" style={{ bottom: ".75px" }} />
                    Assignment
                </Button>
            </div>
        </div>
    );
}
