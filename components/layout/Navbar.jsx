"use client";
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import "./Navbar.scss";

const Navbar = () => {
  const { status } = useSession();
  return (
    <div>
      {status === "authenticated" && (
        <div>
          <Link href="/lessons">lessons link</Link>
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
