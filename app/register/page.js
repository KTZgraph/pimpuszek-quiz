"use client";
import supabase from "../../services/supabase/connector";
import { useState } from "react";
import FormInput from "../../components/atoms/FormInput";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    userEmail: "ciociagrazynka9@gmail.com",
    userPassword: "39WYs62%rmb^39WYs62%rmb^",
    userPasswordConfirm: "39WYs62%rmb^39WYs62%rmb^",
  });

  const handleChange = (e) => {
    // WARNING e.target.name to name z "name" z inputa
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("--------- handleSubmit ------------");
    console.log(userData);
    if (userData.userPassword !== userData.userPasswordConfirm) {
      console.error("Hasła się nie zgadzają!");
      return;
    }

    try {
      setLoading(true);
      //   https://supabase.com/docs/reference/javascript/auth-signup
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      console.log("DATA: ", data);

      if (error) throw error;
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
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Prawdziwy email"
          name="userEmail"
          type="email"
          value={userData.userEmail}
          onChange={handleChange}
        />
        <FormInput
          label="Hasło"
          name="userPassword"
          type="password"
          value={userData.userPassword}
          onChange={handleChange}
        />
        <FormInput
          label="Powtórz Hasło"
          name="userPasswordConfirm"
          type="password"
          value={userData.userPasswordConfirm}
          onChange={handleChange}
        />
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default RegisterPage;
