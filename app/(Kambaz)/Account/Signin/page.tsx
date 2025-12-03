"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      const response = await client.signin(credentials);
      if (!response) return;

      // Extract user and token from response
      const { user, token } = response;

      // Store user in Redux
      dispatch(setCurrentUser(user));

      // Store both user and token in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', token);

      console.log("✅ Signed in as:", user.username, "Role:", user.role);

      // Redirect to dashboard
      router.push("/Dashboard");
    } catch (error) {
      console.error("❌ Signin failed:", error);
      alert("Signin failed. Please check your credentials.");
    }
  };

  return (
    <div
      id="wd-signin-screen"
      style={{
        maxWidth: "400px",
        margin: "50px 0 0 50px",
        padding: "20px",
        textAlign: "left",
      }}
    >
      <h1>Sign in</h1>
      <FormControl
        value={credentials.username || ""}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />
      <FormControl
        value={credentials.password || ""}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in
      </Button>
      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}