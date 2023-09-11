"use client";

import { useSsr } from "@/hooks/useSsr";
import { isLoggedIn } from "@/utils/is-logged";
import { useRouter } from "next/navigation";

import style from "./style.module.scss";
import { NavBar } from "@/components/common/NavBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isBrowser } = useSsr();
  const { push } = useRouter();

  React.useEffect(() => {
    if (!isLoggedIn()) {
      push("/auth/login");
    }
  }, [isBrowser]);

  return (
    <main className={style.dashboard}>
      <NavBar />
      {children}
    </main>
  );
}
