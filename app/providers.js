"use client";
import { StoreProvider } from "../context";

export default function Providers({ children }) {
  return <StoreProvider>{children}</StoreProvider>;
}
