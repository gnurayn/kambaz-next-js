import Link from "next/link";

export default function Assignments({ params }: { params: { cid: string } }) {
  const { cid } = params;

  const assignments = [
    { id: "123", title: "A1 - ENV + HTML", due: "May 13", available: "May 6" },
    { id: "124", title: "A2 - CSS + BOOTSTRAP", due: "May 20", available: "May 13" },
    { id: "125", title: "A3 - JAVASCRIPT + REACT", due: "May 27", available: "May 20" },
  ];

  return (
    <div id="wd-assignments">
      <div style={{ display: "flex", gap: "4px" }}>
        <input placeholder="Search for Assignments" id="wd-search-assignment" />
        <button id="wd-add-assignment-group">+ Group</button>
        <button id="wd-add-assignment">+ Assignment</button>
      </div>
      <h3 id="wd-assignments-title">ASSIGNMENTS 40% of Total <button>+</button></h3>
      <ul id="wd-assignment-list">
        {assignments.map(a => (
          <li key={a.id} className="wd-assignment-list-item">
            <Link href={`/Courses/${cid}/Assignments/${a.id}`} className="wd-assignment-link">
              {a.title}
            </Link>
            <div>
              Multiple Modules | <strong>Not available until</strong> {a.available} |
              <strong>Due</strong> {a.due} | 100 pts
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
