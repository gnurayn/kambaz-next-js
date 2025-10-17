"use client";

import { useParams } from "next/navigation";
import * as db from "../../../Database";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import AssignmentControls from "./AssignmentControls";
import AssignmentDetails from "./AssignmentDetails";
import AssignmentIcons from "./AssignmentIcons";
import AssignmentControlButtons from "./AssignmentControlButtons";

const GripVertical = BsGripVertical as React.ElementType;
const ArrowDown = MdArrowDropDown as React.ElementType;

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  const courseAssignments = assignments.filter(
    (assignment: any) => assignment.course === cid
  );

  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 my-gray">
            <GripVertical className="fs-3" />{" "}
            <ArrowDown className="fs-3" /> ASSIGNMENTS <AssignmentDetails />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {courseAssignments.map((assignment: any) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
              >
                <AssignmentIcons />

                <div className="d-flex flex-column text-start mx-2 flex-grow-1">
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="text-dark text-decoration-none"
                  >
                    {assignment.title}
                  </Link>

                  <small style={{ fontSize: "14px" }}>
                    <span style={{ color: "red" }}>{assignment.module}</span> |{" "}
                    <span style={{ fontWeight: "bold" }}>
                      Not available until
                    </span>{" "}
                    {assignment.availableFrom} |
                  </small>

                  <small style={{ fontSize: "14px", color: "black" }}>
                    <span style={{ fontWeight: "bold" }}>Due</span>{" "}
                    {assignment.dueDate} | {assignment.points} pts
                  </small>
                </div>

                <AssignmentControlButtons />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
