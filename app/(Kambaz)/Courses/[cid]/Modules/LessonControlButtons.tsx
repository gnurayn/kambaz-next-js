import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
const EllipsisVertical = IoEllipsisVertical as React.ElementType;
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <EllipsisVertical className="fs-4" />
    </div> );}