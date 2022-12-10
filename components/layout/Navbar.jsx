"use client";
import { useContext } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { UserEmailProvider } from "../../context/UserEmailContext";

import "./Navbar.scss";

const Navbar = () => {
  const { status, data } = useSession();
  const userEmail = useContext(UserEmailProvider);
  console.log("userEmail", userEmail);
  console.log(data);

  
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
        <button onClick={() => signIn()}>Zaloguj się</button>
      )}
      <hr />
    </div>
  );
};

export default Navbar;
