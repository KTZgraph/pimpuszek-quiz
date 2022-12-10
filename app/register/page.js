"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


const Register = () => {
  const [data, setData] = useState({
    email: "test@test.com",
    password: "password",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const encryptedPassword = "DSfsd";

    console.log(data.email);
    console.log(encryptedPassword);

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
      <button type="submit">Zarejestruj</button>
    </form>
  );
};

export default Register;
