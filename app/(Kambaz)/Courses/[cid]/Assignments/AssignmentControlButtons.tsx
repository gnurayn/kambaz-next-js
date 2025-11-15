import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
const EllipsisVertical = IoEllipsisVertical as React.ElementType;
export default function AssignmentControlButtons({ assignmentId, deleteAssignment }: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) {
  return (
    <div className="float-end d-flex align-items-center gap-1">
      <FaTrash className="text-danger me-2 mb-1" onClick={() => {
        deleteAssignment(assignmentId)
      }} />
      <GreenCheckmark />
      <EllipsisVertical className="fs-4" />
    </div>);
}