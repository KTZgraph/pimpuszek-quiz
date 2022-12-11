"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import "./Navbar.scss";
import { useStore } from "../../context/index";

const Navbar = () => {
  const [state, dispatch] = useStore();
  console.log("useStore navbars:", { state });

  return (
    <div>
      <div>
        {state.authenticated && <Link href="/lessons">lessons link</Link>}
        {state.authenticated && (
          <button onClick={() => signOut()}>Wyloguj ZALOGOWANY</button>
        )}
      </div>
      {!state.authenticated && (
        <Link href="/login">zaloguj się NIEZALOGOWANY</Link>
      )}

      <hr />
    </div>
  );
};

export default Navbar;
