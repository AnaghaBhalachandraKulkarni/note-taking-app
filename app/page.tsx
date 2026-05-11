"use client";

import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.push(user ? "/dashboard" : "/auth");
    }
  }, [user, loading]);

  return <div>Loading...</div>;
}
