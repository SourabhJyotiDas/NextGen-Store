"use client";

import React from "react";
import { signIn } from "next-auth/react";

export default function page() {
  const handleSubmit = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      email: "test1@gmail.com",
      password: "Sourabh226",
    });
    console.log("Workign fine from homepage")
    console.log(result)
  };

  return (
    <div>
      Homepage
      <button onClick={handleSubmit}>Click me</button>
    </div>
  );
}
