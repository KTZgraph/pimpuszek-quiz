"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useStore } from "../../context";
import { authConstants } from "../../context/constants";

const Login = () => {
  const [userLogin, setUserLogin] = useState(null);

  const [state, dispatch] = useStore();
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const [data, setData] = useState({
    email: "test@test.com",
    password: "password",
  });

  const handleLogout = async () => {
    const logoutResponse = await axios.get("/api/auth/logout");

    console.log("LOGUT RESPONSE: ", logoutResponse);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch({ type: authConstants.LOGIN_REQUEST });
    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      payload: {
        email: "testEmail@test.com",
        JWT: "jakiś niby Jwt token",
      },
    });

    console.log("robie axiosa");
    const loginResponse = await axios.post(
      "/api/auth/login",
      {
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    );

    console.log("LOGIN RESPONSE: ", loginResponse);

    // dispatch({
    //   type: authConstants.LOGIN_FAILURE,
    //   payload: "Jakiś bład na sztywno",
    // });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h1>LOGIN page</h1>
        <p>{data.email}</p>
        <p>{data.password}</p>
        <button type="submit">Zaloguj się</button>
      </form>
      <hr />

      <button onClick={handleLogout}>Wyloguj się JWT</button>
    </>
  );
};

export default Login;
