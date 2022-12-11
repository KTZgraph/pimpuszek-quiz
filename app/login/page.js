"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// https://www.youtube.com/watch?v=Avfa7RrPx_Q
import jwt from "jwt-decode";
import Cookies from "universal-cookie";

// https://next-auth.js.org/getting-started/client#signin
// https://youtu.be/S1D9IQM8bFA?t=1370 SESJA
import { signIn, getSession } from "next-auth/react";
import { useStore } from "../../context";
import { authConstants } from "../../context/constants";

const Login = () => {
  const cookies = new Cookies();
  const [userLogin, setUserLogin] = useState(null);

  const [state, dispatch] = useStore();
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const [data, setData] = useState({
    email: "test@test.com",
    password: "password",
  });

  const handleLogout = () => {
    setUserLogin(null);
    cookies.remove("jwt_authorization");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
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

      console.log("LOGIN result ", result);

      //   error z pimpuszek-quiz\context\index.js
      //   https://youtu.be/Yq9xyZ63Fgc?t=479
      if (!result.error) {
        // https://youtu.be/Yq9xyZ63Fgc?t=554
        const session = await getSession();
        setUserLogin(session);

        cookies.set("chyba_jti", session.jti);

        console.log("LOIGN session: ", session);
        dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
        // przekierowanie jak sie wszystko uda

        const MOJ_JWT_TOKEN_NA_SZTYWNO =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        const decoded = jwt(MOJ_JWT_TOKEN_NA_SZTYWNO);
        setUserLogin(decoded);
        cookies.set("jwt_authorization", MOJ_JWT_TOKEN_NA_SZTYWNO, {
          // cook ie jest w milisekundach
          expires: new Date(decoded.exp * 10000000000),
        });

        // router.push("/lessons");
      } else {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: result.error,
        });

        setAuthError(result.error);
        console.log("bład z logowania!!! ");
        console.log(result.error);
        router.push("/error-page");
      }
    } catch (err) {
      console.log(
        `signIn("credentials", { ...nextAuthPayload, redirect: false });")`
      );
      console.log(err);
    }
  };

  return (
    <>
      <h1>userLogin: {JSON.stringify(userLogin)}</h1>

      <form onSubmit={handleLogin}>
        <h1>LOGIN page</h1>
        <p>{data.email}</p>
        <p>{data.password}</p>
        <button type="submit">Zaloguj się</button>
        <p>authError:{authError}</p>
      </form>
      <hr />

      <button onClick={handleLogout}>Wyloguj się JWT</button>
    </>
  );
};

export default Login;
