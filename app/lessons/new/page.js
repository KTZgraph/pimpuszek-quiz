"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LessonCreate from "../../../components/organisms/LessonCreate";

const NewLesson = () => {
  const [userEmail, setUserEmail] = useState("");
  const { data } = useSession();
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        setUserEmail(data?.user?.email);
      } catch (err) {
        console.log(err);
        setUserEmail("");
      }
    };

    fetchUserEmail();
  }, [data]);

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
