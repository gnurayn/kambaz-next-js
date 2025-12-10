"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import AssignmentControls from "./AssignmentControls";
import AssignmentDetails from "./AssignmentDetails";
import AssignmentIcons from "./AssignmentIcons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments, deleteAssignment } from "./reducer";
import * as client from "../../client";
import { useEffect } from "react";
import { useAuth } from "../../../Account/useAuth";

/* eslint-disable @typescript-eslint/no-explicit-any */

const GripVertical = BsGripVertical as React.ElementType;
const ArrowDown = MdArrowDropDown as React.ElementType;

export default function Assignments() {
  const { cid } = useParams();
  const { canEditCourse } = useAuth();

  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );

  const courseAssignments = assignments;
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  const onRemoveAssignment = async (assignmentId: string) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const result = await client.deleteAssignment(assignmentId);

      const newAssignments = assignments.filter((a: any) => a._id !== assignmentId);

      dispatch(setAssignments(newAssignments));
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDeleteAssignment = (assignmentId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this assignment?");
    if (confirmed) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  function formatDate(dateString?: string) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  }

  return (
    <div id="wd-assignments">
      {canEditCourse && <AssignmentControls />}

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
                    {formatDate(assignment.availableFromDate)} {assignment.availableFromTime} |
                  </small>

                  <small style={{ fontSize: "14px", color: "black" }}>
                    <span style={{ fontWeight: "bold" }}>Due</span>{" "}
                    {formatDate(assignment.dueDateDate)} {assignment.dueDateTime} | {assignment.points} pts
                  </small>
                </div>

                {canEditCourse && (
                  <AssignmentControlButtons
                    assignmentId={assignment._id}
                    deleteAssignment={(assignmentId) => onRemoveAssignment(assignmentId)}
                  />
                )}
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}