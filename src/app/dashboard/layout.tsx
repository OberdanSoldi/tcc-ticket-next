"use client";

import { useSsr } from "@/hooks/useSsr";
import { userService } from "@/services/user-service";
import { isLoggedIn } from "@/utils/is-logged";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isBrowser } = useSsr();
  const { push } = useRouter();

  if (isBrowser && !isLoggedIn()) {
    push("/auth/login");
    return;
  }

  userService.getUserRole();

  return <main>{children}</main>;
}
