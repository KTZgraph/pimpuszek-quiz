"use client";
import { useState } from "react";
import Link from "next/link";

import LessonList from "../../components/organisms/LessonList";

const Lessons = () => {
  const [userEmail, setUserEmail] = useState("email na sztynwo z Lessons page");

  if (!userEmail) return <p>...Loading</p>;
  return (
    <div>
      Lessons
      {userEmail}
      {/* <LessonCreate userEmail={userEmail} /> */}
      <Link href="/lessons/new">dodaj nową lekcję</Link>
      <LessonList emailOwner={userEmail} />
    </div>
  );
};

export default Lessons;
