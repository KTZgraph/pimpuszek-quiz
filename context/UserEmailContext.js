// https://www.youtube.com/watch?v=3yrMcx02jXs
import { createContext, useState } from "react";

const UserEmailContext = createContext();

export function UserEmailProvider({ children }) {
  return (
    <UserEmailContext.Provider value={{ userEmail: "email@TerazNasztywno" }}>
      {children}
    </UserEmailContext.Provider>
  );
}
