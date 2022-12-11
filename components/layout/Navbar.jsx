"use client";
import Link from "next/link";

import "./Navbar.scss";
import { useStore } from "../../context/index";

const Navbar = () => {
  const [state, dispatch] = useStore();

  const handleLogout = (e) => {
    console.log("Wylogowywanie");
  };

  return (
    <div>
      {JSON.stringify(state)}

      <div>
        {state.user.authenticated && <Link href="/lessons">lessons link</Link>}
        {state.user.authenticated && (
          <button onClick={(e) => handleLogout(e)}>Wyloguj ZALOGOWANY</button>
        )}
      </div>
      {!state.user.authenticated && (
        <Link href="/login">zaloguj się NIEZALOGOWANY</Link>
      )}

      <hr />
    </div>
  );
};

export default Navbar;
