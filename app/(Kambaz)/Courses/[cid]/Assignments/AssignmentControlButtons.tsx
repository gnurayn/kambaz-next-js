import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
const EllipsisVertical = IoEllipsisVertical as React.ElementType;
export default function AssignmentControlButtons() {
  return (
    <div className="float-end d-flex align-items-center gap-1">
      <GreenCheckmark />
      <EllipsisVertical className="fs-4" />
    </div> );}