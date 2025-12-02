"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button, Form } from "react-bootstrap";
import * as client from "../client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/Account/Profile");
  };
  return (
    <div className="wd-signup-screen"
      style={{
        maxWidth: "400px",
        margin: "50px 0 0 50px",
        padding: "20px",
        textAlign: "left",
      }}>
      <h1>Sign up</h1>
      <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username mb-2" placeholder="username" />
      <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-3" placeholder="password" type="password" />
      <Form.Group className="mb-3">
        <Form.Select
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          className="wd-role"
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </Form.Select>
      </Form.Group>
      <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />
      <Link href="/Account/Signin" className="wd-signin-link">Sign in</Link>
    </div>
  );
}
