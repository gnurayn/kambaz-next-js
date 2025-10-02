import React from 'react';
import './index.css';
import { FaCalendar, FaEnvelopeOpenText, FaRegClock }
    from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBookBible } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";

const AccountIcon = VscAccount as React.ElementType;
const DashboardIcon = AiOutlineDashboard as React.ElementType;
const BookBibleIcon = FaBookBible as React.ElementType;
const CalendarIcon = FaCalendar as React.ElementType;
const EnvelopeOpenTextIcon = FaEnvelopeOpenText as React.ElementType;
const RegClockIcon = FaRegClock as React.ElementType;


export default function ReactIconsSampler() {
    return (

        <div id="wd-react-icons-sampler" className="mb-4">
            <h3>React Icons Sampler</h3>
            <div className="d-flex">
                <AccountIcon className="fs-3 text" />
                <DashboardIcon className="fs-3 text" />
                <BookBibleIcon className="fs-3 text" />
                <CalendarIcon className="fs-3 text" />
                <EnvelopeOpenTextIcon className="fs-3 text" />
                <RegClockIcon className="fs-3 text" />
            </div>
        </div>


    );
}