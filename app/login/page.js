"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// https://next-auth.js.org/getting-started/client#signin
// https://youtu.be/S1D9IQM8bFA?t=1370 SESJA
import { signIn, getSession } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const [data, setData] = useState({
    email: "test@test.com",
    password: "password123",
  });

  const handleLogin = async (e) => {
    // BUG - e.preventDefault(); PSUJE
    e.preventDefault();
    console.log("Logowanie poczatek");
    const nextAuthPayload = { email: data.email, password: data.password };
    // https://next-auth.js.org/getting-started/client#signin
    try {
      // WARNING credentials z małej litery - NIE poorywa się z nazwą z a [...nextauth].js
      //   signIn("credentials", {
      //     ...nextAuthPayload,
      //     // redirect: false,
      //     callbackUrl: "/lessons",
      //   });

      //   https://youtu.be/S1D9IQM8bFA?t=1576

      const result = await signIn("credentials", {
        ...nextAuthPayload,
        redirect: false,
        // callbackUrl: "/lessons",
      });

      if (result.err) {
        setAuthError(result.err);
        console.log("bład z logowania!!! ");
        console.log(result.err);
        router.push("/error-page");
      }

      const sessionUser = await getSession();
      console.log("sessionUser z page login ", sessionUser);
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
      <p>authError:{authError}</p>
    </form>
  );
};

export default Login;
