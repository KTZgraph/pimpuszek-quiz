"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (status === "unauthenticated")
    return (
      <div>
        <h1>
          Hello jesteś niezalogowany - aby w pełni skorzystać z plikacji zaloguj
          się
        </h1>
      </div>
    );

  return (
    <div>
      <h1>Hello strona główna aplikacji</h1>
    </div>
  );
};

export default page;
