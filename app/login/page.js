"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// https://next-auth.js.org/getting-started/client#signin
import { signIn } from "next-auth/react";

const Login = () => {
  const [data, setData] = useState({
    email: "test@test.com",
    password: "password",
  });

  const handleLogin = async (e) => {
    // BUG - e.preventDefault(); PSUJE
    e.preventDefault();
    console.log("Logowanie poczatek");
    const nextAuthPayload = { email: data.email, password: data.password };
    // https://next-auth.js.org/getting-started/client#signin
    try {
      signIn("credentials", {
        ...nextAuthPayload,
        // redirect: false,
        callbackUrl: "/",
      });
    } catch (err) {
      console.log(
        `signIn("credentials", { ...nextAuthPayload, redirect: false });")`
      );
      console.log(err);
    }
    console.log("Logowanie koniec");

    // console.log("response: ", response);
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>LOGIN page</h1>
      <p>{data.email}</p>
      <p>{data.password}</p>
      <button type="submit">Zaloguj się</button>
    </form>
  );
};

export default Login;
