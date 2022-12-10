"use client";
import { useEffect, useState } from "react";
import { useContext } from "react";

import { useSession } from "next-auth/react";
import { UserEmailProvider } from "../../context/UserEmailContext";

const Lessons = () => {
  const [userEmail, setUserEmail] = useState("");
  const { data } = useSession();
  const czyNiePuste = useContext(UserEmailProvider);
  console.log("czyNiePuste", czyNiePuste);

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
    </div>
  );
};

export default Lessons;
