"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const [data, setData] = useState({
    email: "test@test.com",
    password: "password",
    passwordConfirm: "password",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (data.password !== data.passwordConfirm) {
      console.error("Hasła się nie zgadzaja");
      return;
    }

    const response = await axios.post("/api/user-register", {
      email: data.email,
      password: data.password,
    });

    console.log("response: ", response);
  };

  return (
    <form onSubmit={handleRegister}>
      <p>{data.email}</p>
      <p>{data.password}</p>
      <p>{data.passwordConfirm}</p>
      <button type="submit">Zarejestruj</button>
    </form>
  );
};

export default Register;
