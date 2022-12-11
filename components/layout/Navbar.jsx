"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import "./Navbar.scss";
import { useStore } from "../../context/index";

const Navbar = () => {
  const [state, dispatch] = useStore();
  console.log("useStore navbars:", { state });
  // const user = getValue

  return (
    <div>
      {JSON.stringify(state)}

      <div>
        {state.user.authenticated && <Link href="/lessons">lessons link</Link>}
        {state.user.authenticated && (
          <button onClick={() => signOut()}>Wyloguj ZALOGOWANY</button>
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
