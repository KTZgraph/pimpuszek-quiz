"use client";
import { useEffect, useState } from "react";
import { useContext } from "react";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { UserEmailProvider } from "../../context/UserEmailContext";
import LessonList from "../../components/organisms/LessonList";

const Lessons = () => {
  const [userEmail, setUserEmail] = useState("");
  const { data } = useSession();
  const czyNiePuste = useContext(UserEmailProvider);

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
      {/* <LessonCreate userEmail={userEmail} /> */}
      <Link href="/lessons/new">dodaj nową lekcję</Link>
      <LessonList emailOwner={userEmail} />
    </div>
  );
};

export default Lessons;
