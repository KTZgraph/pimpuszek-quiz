"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// https://next-auth.js.org/getting-started/client#signin
// https://youtu.be/S1D9IQM8bFA?t=1370 SESJA
import { signIn, getSession } from "next-auth/react";
import { useStore } from "../../context";
import { authConstants } from "../../context/constants";

const Login = () => {
  const [state, dispatch] = useStore();
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const [data, setData] = useState({
    email: "test@test.com",
    password: "password",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logowanie poczatek");
    const nextAuthPayload = { email: data.email, password: data.password };
    // https://next-auth.js.org/getting-started/client#signin

    dispatch({ type: authConstants.LOGIN_REQUEST });

    try {
      // WARNING credentials z małej litery - NIE pookrywa się z nazwą z a [...nextauth].js

      const result = await signIn("credentials", {
        ...nextAuthPayload,
        redirect: false,
        // callbackUrl: "/lessons",
      });

      //   error z pimpuszek-quiz\context\index.js
      //   https://youtu.be/Yq9xyZ63Fgc?t=479
      if (!result.error) {
        // https://youtu.be/Yq9xyZ63Fgc?t=554
        const session = await getSession();
        dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
        // przekierowanie jak sie wszystko uda
        router.push("/lessons");
      } else {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: result.error,
        });

        console.setAuthError(result.error);
        console.log("bład z logowania!!! ");
        console.log(result.err);
        router.push("/error-page");
      }
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
