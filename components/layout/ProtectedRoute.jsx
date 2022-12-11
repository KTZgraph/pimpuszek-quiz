import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useStore } from "../../context";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  const [state, dispatch] = useStore();

  useEffect(() => {
    if (!state.user.authenticated) {
      router.push("/");
    }
  }, [router, state.user.authenticated]);

  if (!state.user.authenticated) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
