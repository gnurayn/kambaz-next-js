import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
const Plus = FaPlus as React.ElementType;
const EllipsisVertical = IoEllipsisVertical as React.ElementType;
export default function AssignmentDetails() {
    return (
        <div className="float-end d-flex align-items-center gap-2">
            <span
                className="px-3 rounded-pill border-white d-flex align-items-center"
                style={{ border: "1.5px solid", height: "fit-content" }}
            >
                40% of Total
            </span>

            <Plus className="d-flex align-self-center" />
            <EllipsisVertical className="fs-4 d-flex align-self-center" />
        </div>);
}