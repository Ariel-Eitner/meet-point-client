import React from "react";

export default function Profile() {
  return (
    <div>
      <a
        href="/api/auth/logout"
        className="font-semibold text-gray-900 cursor-pointer"
      >
        Logout
      </a>
    </div>
  );
}
