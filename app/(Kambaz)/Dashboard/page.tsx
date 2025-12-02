"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import * as client from "../Courses/client";
import { setUser, enrollCourse, unenrollCourse } from "../Account/enrollmentReducer";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrolledCourses } = useSelector((state: any) => state.enrollmentReducer);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const fetchCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEnrollments = async (userId: string) => {
    try {
      const data = await client.findEnrollmentsForUser(userId);

      dispatch(setUser(userId));

      const courseIds = data.map((e: any) => e.course);
      courseIds.forEach((id: string) => dispatch(enrollCourse(id)));
    } catch (err) {
      console.error("Error loading enrollments:", err);
    }
  };
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };
  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course: { _id: string; }) => course._id !== courseId)));
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c: { _id: any; }) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    })));
  };


  useEffect(() => {
    if (currentUser) {
      fetchCourses();
      fetchEnrollments(currentUser._id);
    }
  }, [currentUser?._id]);

  useEffect(() => {

  }, [enrolledCourses])

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => enrolledCourses.includes(c._id));

  const isEnrolled = (courseId: string) => enrolledCourses.includes(courseId);

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    await client.enrollIntoCourse(currentUser._id, courseId);
    dispatch(enrollCourse(courseId));
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    await client.unenrollFromCourse(currentUser._id, courseId);
    dispatch(unenrollCourse(courseId));
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex align-items-center justify-content-between">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button variant="primary" onClick={() => setShowAllCourses(!showAllCourses)}>
          {showAllCourses ? "Enrollments" : "Enrollments"}
        </Button>
      </div>
      <hr />
      <h5>New Course
        <button className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={onAddNewCourse} > Add </button>
        <button className="btn btn-warning float-end me-2"
          onClick={onUpdateCourse} id="wd-update-course-click">
          Update </button>
      </h5><br />
      <FormControl value={course.name} className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
      <FormControl value={course.description} as="textarea" rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course: any) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "375px" }}>
              <Card>
                <Link href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src={course.image} variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </CardText>


                    <Button variant="primary"> Go </Button>

                    <button onClick={(event) => {
                      event.preventDefault();
                      onDeleteCourse(course._id);
                    }} className="btn btn-danger float-end"
                      id="wd-delete-course-click">
                      Delete
                    </button>

                    <button id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end" >
                      Edit
                    </button>

                    {isEnrolled(course._id) ? (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          handleUnenroll(course._id);
                        }}
                        className="btn btn-danger me-2 float-end"
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          handleEnroll(course._id);
                        }}
                        className="btn btn-success me-2 float-end"
                      >
                        Enroll
                      </button>
                    )}

                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}