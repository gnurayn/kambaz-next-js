import { MdAssignmentAdd } from "react-icons/md";
import { BsGripVertical } from "react-icons/bs";
const GripVertical = BsGripVertical as React.ElementType;
const Assignment = MdAssignmentAdd as React.ElementType;
export default function AssignmentIcons() {
    return (
        <div className="d-flex align-items-center gap-2">
            <GripVertical className="fs-3" />
            <Assignment className="text-success"/>
        </div>);
}