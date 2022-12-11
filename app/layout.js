"use client";

// https://beta.nextjs.org/docs/api-reference/use-pathname
import { usePathname } from "next/navigation";

import Providers from "./providers";
import Navbar from "../components/layout/Navbar";
import ProtectedRoute from "../components/layout/ProtectedRoute";
const noAuthRequiredPageList = ["/", "/register", "/login", "/protected-jwt"];

// tu trzeba zimportować style
import "../styles/globals.css";
import "./layout.scss";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html>
      <head />
      <body>
        <Providers>
          <Navbar />
          <main className="layout__main">
            {noAuthRequiredPageList.includes(pathname) ? (
              children
            ) : (
              <ProtectedRoute>{children}</ProtectedRoute>
            )}
          </main>
        </Providers>
      </body>
    </html>
  );
}
