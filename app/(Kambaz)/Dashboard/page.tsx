import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div className="wd-dashboard-course">
                <Link href="/Courses/1234" className="wd-dashboard-course-link">
                    <Image src="/images/reactjs.jpg" width={200} height={150} alt={""} />
                    <div>
                        <h5> CS1234 React JS </h5>
                        <p className="wd-dashboard-course-title">
                            Full Stack software developer
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>&nbsp;

            <div className="wd-dashboard-course">
                <Link href="/Courses/2345" className="wd-dashboard-course-link">
                    <Image src="/images/nodejs.jpg" width={200} height={150} alt={""} />
                    <div>
                        <h5> CS2345 Node.js </h5>
                        <p className="wd-dashboard-course-title">
                            Backend Development
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>&nbsp;

            <div className="wd-dashboard-course">
                <Link href="/Courses/3456" className="wd-dashboard-course-link">
                    <Image src="/images/python.jpg" width={200} height={150} alt={""} />
                    <div>
                        <h5> CS3456 Python </h5>
                        <p className="wd-dashboard-course-title">
                            Foundations of Data Science
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>&nbsp;

            <div className="wd-dashboard-course">
                <Link href="/Courses/4567" className="wd-dashboard-course-link">
                    <Image src="/images/r.jpg" width={200} height={150} alt={""} />
                    <div>
                        <h5> CS4567 R </h5>
                        <p className="wd-dashboard-course-title">
                            Database Design
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>&nbsp;

            <div className="wd-dashboard-course">
                <Link href="/Courses/5678" className="wd-dashboard-course-link">
                    <Image src="/images/java.jpg" width={200} height={150} alt={""} />
                    <div>
                        <h5> CS5678 Java </h5>
                        <p className="wd-dashboard-course-title">
                            Object Oriented Design
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>&nbsp;

            <div className="wd-dashboard-course">
                <Link href="/Courses/6789" className="wd-dashboard-course-link">
                    <Image src="/images/c++.jpg" width={200} height={150} alt={""} />
                    <div>
                        <h5> CS6789 C++ </h5>
                        <p className="wd-dashboard-course-title">
                            Systems
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>&nbsp;

            <div className="wd-dashboard-course">
                <Link href="/Courses/2800" className="wd-dashboard-course-link">
                    <Image src="/images/drracket.jpg" width={200} height={150} alt={""} />
                    <div>
                        <h5> CS2800 Dr. Racket </h5>
                        <p className="wd-dashboard-course-title">
                            Logic and Computation
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>&nbsp;

            <div className="wd-dashboard-course">
                <Link href="/Courses/4550" className="wd-dashboard-course-link">
                    <Image src="/images/html.jpg" width={200} height={150} alt={""} />
                    <div>
                        <h5> CS2800 Dr. Racket </h5>
                        <p className="wd-dashboard-course-title">
                            Web Development
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>&nbsp;

        </div>
    );
}