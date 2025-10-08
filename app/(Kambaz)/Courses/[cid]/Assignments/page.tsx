import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from 'react-icons/bs';
import { MdArrowDropDown } from "react-icons/md";
import AssignmentControls from "./AssignmentControls";
import AssignmentDetails from "./AssignmentDetails";
import AssignmentIcons from "./AssignmentIcons";
import AssignmentControlButtons from "./AssignmentControlButtons";

const GripVertical = BsGripVertical as React.ElementType;
const ArrowDown = MdArrowDropDown as React.ElementType;

export default function Assignments({ params }: { params: { cid: string } }) {
  const { cid } = params;

  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 my-gray">
            <GripVertical className="fs-3" /> <ArrowDown className="fs-3" /> ASSIGNMENTS <AssignmentDetails />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <AssignmentIcons />

              <div className="d-flex flex-column text-start mx-2 flex-grow-1">
                <Link href={`/Courses/${cid}/Assignments/123`} className="text-dark text-decoration-none">
                  A1
                </Link>
                <small style={{ fontSize: "14px" }}>
                  <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                  <span style={{ fontWeight: "bold" }}>Not available until</span> May 6 at 12:00 am |
                </small>
                <small style={{ fontSize: "14px", color: "black" }}>
                  <span style={{ fontWeight: "bold" }}>Due</span> May 13 at 11:59 pm | 100 pts
                </small>
              </div>

              <AssignmentControlButtons />
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <AssignmentIcons />
              <div className="d-flex flex-column text-start mx-2 flex-grow-1">
                <Link href={`/Courses/${cid}/Assignments/123`} className="text-dark text-decoration-none">
                  A2
                </Link>
                <small style={{ fontSize: "14px" }}>
                  <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                  <span style={{ fontWeight: "bold" }}>Not available until</span> May 13 at 12:00 am |
                </small>
                <small style={{ fontSize: "14px", color: "black" }}>
                  <span style={{ fontWeight: "bold" }}>Due</span> May 20 at 11:59 pm | 100 pts
                </small>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <AssignmentIcons />
              <div className="d-flex flex-column text-start mx-2 flex-grow-1">
                <Link href={`/Courses/${cid}/Assignments/123`} className="text-dark text-decoration-none">
                  A3
                </Link>
                <small style={{ fontSize: "14px" }}>
                  <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                  <span style={{ fontWeight: "bold" }}>Not available until</span> May 20 at 12:00 am |
                </small>
                <small style={{ fontSize: "14px", color: "black" }}>
                  <span style={{ fontWeight: "bold" }}>Due</span> May 27 at 11:59 pm | 100 pts
                </small>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
