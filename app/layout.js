// tu dopatrzeć wrapper na protected route
import { usePathname } from "next/navigation";

import Providers from "./providers";
import Header from "../components/layout/Header";

const noAuthRequiredPageList = ["/login", "/signup"];

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
          <Header />
          <main className="layout__main">{children}</main>
          {/* <main className="layout__main">
            {noAuthRequiredPageList.includes(pathname) ? (
              children
            ) : (
              // sprawdzm logowanie dopiero gdy jest to potrzebne
              <ProtectedRoute>{children}</ProtectedRoute>
            )}
          </main> */}
        </Providers>
      </body>
    </html>
  );
}
