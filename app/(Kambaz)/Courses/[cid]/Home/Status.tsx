import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { FaHome } from "react-icons/fa";
import { RiBarChart2Fill } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoMdNotifications } from "react-icons/io";
import { Button } from "react-bootstrap";
const Empty = MdDoNotDisturbAlt as React.ElementType;
const CheckCircle = FaCheckCircle as React.ElementType;
const Import = BiImport as React.ElementType;
const OtherImport = LiaFileImportSolid as React.ElementType;
const Home = FaHome as React.ElementType;
const Chart = RiBarChart2Fill as React.ElementType;
const Announcement = TfiAnnouncement as React.ElementType;
const Notifications = IoMdNotifications as React.ElementType;

{/* Find more icons */ }
export default function CourseStatus() {
    return (
        <div id="wd-course-status" style={{ width: "350px" }}>
            <h2>Course Status</h2>
            <div className="d-flex">
                <div className="w-50 pe-1">
                    <Button variant="secondary" size="lg" className="w-100 text-nowrap ">
                        <Empty className="me-2 fs-5" /> Unpublish </Button> </div>
                <div className="w-50">
                    <Button variant="success" size="lg" className="w-100">
                        <CheckCircle className="me-2 fs-5" /> Publish </Button> </div>
            </div>
            <br />
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <Import className="me-2 fs-5" /> Import Existing Content </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <OtherImport className="me-2 fs-5" /> Import from Commons </Button>
            {/* Complete the rest of the buttons */}
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <Home className="me-2 fs-5" /> Choose Home Page </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <Chart className="me-2 fs-5" /> View Course Screen </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <Announcement className="me-2 fs-5" /> New Announcement </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <Chart className="me-2 fs-5" /> New Analytics </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <Notifications className="me-2 fs-5" /> View Course Notifications </Button>
        </div>);
}