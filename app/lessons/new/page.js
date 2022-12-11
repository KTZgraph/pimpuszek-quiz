"use client";
import { useState } from "react";
import LessonCreate from "../../../components/organisms/LessonCreate";

const NewLesson = () => {
  const [userEmail, setUserEmail] = useState("emailNaszttywni z NewLesson");

  if (!userEmail) return <p>...Loading</p>;

  return (
    <div>
      Lessons
      {userEmail}
      <LessonCreate userEmail={userEmail} />
    </div>
  );
};

export default NewLesson;
