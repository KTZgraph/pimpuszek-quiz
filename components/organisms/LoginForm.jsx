"use client";
import { useState } from "react";
import FormInput from "../atoms/FormInput";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const handleChange = (e) => {
    // WARNING e.target.name to name z "name" z inputa
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("--------- handleLogin ------------");
    console.log(data);
    try {
      setLoading(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Logowanie</h2>
      <form onSubmit={handleLogin}>
        <FormInput
          label="Prawdziwy email"
          name="userEmail"
          type="email"
          value={data.userEmail}
          onChange={handleChange}
        />
        <FormInput
          label="Hasło"
          name="userPassword"
          type="password"
          value={data.userPassword}
          onChange={handleChange}
        />
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
};

export default LoginForm;
