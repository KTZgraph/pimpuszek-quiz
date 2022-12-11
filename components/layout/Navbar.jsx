"use client";
import { useContext } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { UserEmailProvider } from "../../context/UserEmailContext";

import "./Navbar.scss";
import { useStore } from "../../context/index";

const Navbar = () => {
  const { status, data } = useSession();
  const userEmail = useContext(UserEmailProvider);
  // console.log(data);

  try {
    const [state, dispatch] = useStore();
    console.log({ state });
  } catch (err) {
    console.log("ERROR navbars: ", err);
  }

  return (
    <div>
      {status === "authenticated" && (
        <div>
          <Link href="/lessons">lessons link</Link>
          <p>Zalogowano jako {data.user.email}</p>
          <span>userEmail:{userEmail} _______________</span>
          <button onClick={() => signOut()}>Wyloguj</button>
        </div>
      )}
      {status === "unauthenticated" && (
        // <button onClick={() => signIn()}>Zaloguj się</button>
        <Link href="/login">zaloguj się</Link>
      )}
      <hr />
    </div>
  );
};

export default Navbar;
