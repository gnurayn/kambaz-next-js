import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Profile() {
  return (
    <div
      id="wd-profile-screen"
      style={{
        maxWidth: "400px",
        margin: "50px 0 0 50px",
        padding: "20px",
        textAlign: "left",
      }}
    >
      <h1>Profile</h1>

      <FormControl
        id="wd-username"
        placeholder="alice"
        className="mb-2"
      />

      <FormControl
        id="wd-password"
        placeholder="123"
        className="mb-2"
      />

      <FormControl
        id="wd-firstname"
        placeholder="Alice"
        className="mb-2"
      />

      <FormControl
        id="wd-lastname"
        placeholder="Wonderland"
        className="mb-2"
      />

      {/* Calendar / Date Picker after last name */}
      <FormControl
        id="wd-birthday"
        type="date"
        className="mb-2"
      />

      <FormControl
        id="wd-email"
        placeholder="alice@wonderland.com"
        type="email"
        className="mb-2"
      />

      <FormControl
        id="wd-user"
        placeholder="User"
        className="mb-2"
      />

      <Link
        id="wd-signout-btn"
        href="/Account/Signin"
        className="btn btn-danger w-100 mb-2"
      >
        Signout
      </Link>
    </div>
  );
}
