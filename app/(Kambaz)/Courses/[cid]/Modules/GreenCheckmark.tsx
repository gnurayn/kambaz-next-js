import React from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
const CheckCircle = FaCheckCircle as React.ElementType;
const Circle = FaCircle as React.ElementType;

export default function GreenCheckmark() {
    return (
        <span className="me-1 position-relative">
            <CheckCircle style={{ top: "2px" }} className="text-success me-1 position-absolute fs-5" />
            <Circle className="text-white me-1 fs-6" />
        </span>);
}