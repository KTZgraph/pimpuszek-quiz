"use client";

import { SessionProvider } from "next-auth/react";
import { UserEmailProvider } from "../context/UserEmailContext";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <UserEmailProvider>{children}</UserEmailProvider>
      {/* {children} */}
    </SessionProvider>
  );
}
