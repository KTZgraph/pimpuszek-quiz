"use client";
import { useEffect, useState } from "react";
import QuizCreate from "../../../components/organisms/QuizCreate";
import { useStore } from "../../../context";

const SingleLesson = ({ params: { lessonName } }) => {
  const [state, dispatch] = useStore();
  const [userEmail, setUserEmail] = useState(state.user.email);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        setUserEmail(state.user.email);
      } catch (err) {
        setUserEmail("");
      }
    };

    fetchUserEmail();
  }, [state.user.authenticated]);

  if (!userEmail) return <p>...Loading</p>;

  return (
    <div>
      userEmail: {userEmail}
      <h2>Pojedyncza lekcja : {lessonName}</h2>
      <p>Lista wuizów najpeirw</p>
      <hr />
      <h3>lista QUIZów do lekcji</h3>
      <QuizCreate lessonName={lessonName} emailOwner={userEmail} />
    </div>
  );
};

export default SingleLesson;
