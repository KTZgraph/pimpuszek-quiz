"use client";
import supabase from "../../services/supabase/connector";
import { useState } from "react";
import FormInput from "../atoms/FormInput";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    userEmail: "",
    userPassword: "",
    userPasswordConfirm: "",
  });

  const handleChange = (e) => {
    // WARNING e.target.name to name z "name" z inputa
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("--------- handleRegister ------------");
    console.log(data);
    if (data.userPassword !== data.userPasswordConfirm) {
      console.error("Hasła się nie zgadzają!");
      return;
    }

    try {
      setLoading(true);
      // https://supabase.com/docs/reference/javascript/v1/auth-signin
      const { user, session, error } = await supabase.auth.signIn({
        email: data.userEmail,
        password: data.userPassword,
      });

      if (error) throw error;
      alert("Chack your emailfor the login link");
    } catch (error) {
      console.error(error);
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <form onSubmit={handleRegister}>
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
        <FormInput
          label="Powtórz Hasło"
          name="userPasswordConfirm"
          type="password"
          value={data.userPasswordConfirm}
          onChange={handleChange}
        />
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default RegisterForm;
