"use client";

import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "../context";
import { UserEmailProvider } from "../context/UserEmailContext";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <StoreProvider>
        <UserEmailProvider>{children}</UserEmailProvider>
        {/* {children} */}
      </StoreProvider>
    </SessionProvider>
  );
}
