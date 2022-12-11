"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import QuizCreate from "../../../components/organisms/QuizCreate";

const SingleLesson = ({ params: { lessonName } }) => {
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
      <h2>Pojedyncza lekcja : {lessonName}</h2>
      <p>Lista wuizów najpeirw</p>
      <hr />
      <h3>lista QUIZów do lekcji</h3>
      <QuizCreate lessonName={lessonName} emailOwner={userEmail} />
    </div>
  );
};

export default SingleLesson;
