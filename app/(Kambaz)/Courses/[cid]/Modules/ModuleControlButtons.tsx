import React from "react";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
const EllipsisVertical = IoEllipsisVertical as React.ElementType;
const Plus = BsPlus as React.ElementType;
export default function ModuleControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <Plus className="fs-1" />
            <EllipsisVertical className="fs-4" />
        </div>);
}