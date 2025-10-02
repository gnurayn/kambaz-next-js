import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
const Plus = FaPlus as React.ElementType;
const Empty = FaBan as React.ElementType;

export default function ModulesControls() {
    return (
        <div id="wd-modules-controls" className="d-flex justify-content-end gap-1 mb-3 flex-row-reverse">
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                <Plus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </Button>
            <Dropdown className="float-end me-1">
                <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
                    <GreenCheckmark /> Publish All
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem id="wd-publish-all-modules-and-items">
                        <GreenCheckmark /> Publish all modules and items
                    </DropdownItem>
                    <DropdownItem id="wd-publish-modules-only">
                        <GreenCheckmark /> Publish modules only
                    </DropdownItem>
                    {/* Create two more items with IDs wd-unpublish-all-modules-and-items and wd-unpublish-modules-only with
             labels Unpublish all modules and items and Unpublish modules only */}
                    <DropdownItem id="wd-unpublish-all-modules-and-items">
                        <Empty className="text-dark me-1 fs-6" /> Unpublish all modules and items
                    </DropdownItem>
                    <DropdownItem id="wd-unpublish-modules-only">
                        <Empty className="text-dark me-1 fs-6" /> Unpublish modules only
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */}
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress">
                <Plus className="position-relative me-2" style={{ bottom: "1px" }} />
                View Progress
            </Button>
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-collapse-all">
                <Plus className="position-relative me-2" style={{ bottom: "1px" }} />
                Collapse All
            </Button>
        </div>
    );
}