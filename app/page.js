"use client";
import supabase from "../services/supabase/connector";
import React, { useEffect, useState } from "react";
import ProfileForm from "../components/organisms/ProfileForm";
// import LoginForm from "../components/organisms/LoginForm";
import RegisterForm from "../components/organisms/RegisterForm";

const Home = () => {
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    try {
      const session = supabase.auth.session();
      setUserSession(session);

      // https://supabase.com/docs/reference/javascript/v1/auth-session
      // https://youtu.be/HMXY4FfyGD4?t=2339
      // supabase.auth.onAuthStateChange((_event, session) => {
      //   setSession(session);
      // });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="home-page">
      <h1>Hello z app directory</h1>
      {!userSession ? (
        // <LoginForm />
        <RegisterForm />
      ) : (
        // <ProfileForm key={session.user.id} session={session} />
        <p>Profil</p>
      )}

      {/* {!session ? <p>Nie ma sesji ;/ </p> : <p>Jest sesja :)</p>} */}
    </div>
  );
};

export default Home;
