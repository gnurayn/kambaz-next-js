export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label> <br /><br />
            <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
                The assignment is available online Submit a link to the landing page
                of your Web application running on Netlify. The landing page should
                include the following: Your full name and section Links to each of
                the lab assignments Link to the Kanbaz application Links to all relevant
                source code repositories The Kanbaz application should include a link
                to navigate back to the landing page.
            </textarea>
            <br />
            <table>
                <div style={{ height: "20px" }} />  { }
                <tr>
                    <td>
                        <label htmlFor="wd-points">Points</label>&nbsp;
                        <input id="wd-points" defaultValue={100} />
                    </td>
                </tr>

                <div style={{ height: "20px" }} />  { }
                <tr>
                    <td>
                        <label htmlFor="wd-display-grade">Display Grade as</label>&nbsp;
                        <select id="wd-display-grade">
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="LETTER">Letter</option>
                        </select>
                    </td>
                </tr>
                <div style={{ height: "20px" }} />  { }
                <tr>
                    <td>
                        <label htmlFor="wd-submission-type">Submission Type</label>&nbsp;
                        <select id="wd-submission-type">
                            <option value="ONLINE">Online</option>
                        </select>
                    </td>
                </tr>

                <div style={{ height: "20px" }} />  { }
                <tr>
                    <td>
                        <label>Online Entry Options</label><br />
                        <input type="checkbox" name="check-option" id="wd-chkbox-text-entry" />
                        <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br />

                        <input type="checkbox" name="check-option" id="wd-chkbox-website-url" />
                        <label htmlFor="wd-chkbox-website-url">Website URL</label><br />

                        <input type="checkbox" name="check-option" id="wd-media-recordings" />
                        <label htmlFor="wd-chkbox-media-recordings">Media Recordings</label><br />

                        <input type="checkbox" name="check-option" id="wd-chkbox-student-annotation" />
                        <label htmlFor="wd-chkbox-student-annotation">Student Annotation</label><br />

                        <input type="checkbox" name="check-option" id="wd-chkbox-file-uploads" />
                        <label htmlFor="wd-chkbox-file-uploads">File Uploads</label>
                    </td>
                </tr>
                <div style={{ height: "20px" }} />  { }
                <tr>
                    <td align="left" valign="top">
                        <label htmlFor="wd-assign">Assign to</label><br />
                        <input id="wd-assign" value="Everyone" />
                    </td>
                </tr>
                <div style={{ height: "20px" }} />  { }
                <tr>
                    <td align="left" valign="top">
                        <label htmlFor="wd-due"> Due </label><br />
                        <input type="date" value="2024-05-13" id="wd-due" /><br />
                    </td>
                </tr>

                <tr>
                    <td align="left" valign="top">
                        <div style={{ height: "20px" }} />  { }
                        <label htmlFor="wd-available"> Available from </label> &nbsp; &nbsp; &nbsp; &nbsp;
                        <label htmlFor="wd-until"> Until </label><br />
                        <input type="date"
                            value="2024-05-06"
                            id="wd-available" />&nbsp;
                        <input type="date"
                            value="2024-05-20"
                            id="wd-until" /><br />
                    </td>
                </tr>
            </table>

            {/* Line */}
            <hr style={{ width: "675px", margin: "20px 0" }} />

            {/* Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "3px" }}>
                <button id="wd-cancel">Cancel</button>
                <button id="wd-save">Save</button>
            </div>

        </div>
    );
}
