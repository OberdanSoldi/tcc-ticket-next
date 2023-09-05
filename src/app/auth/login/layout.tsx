import { headers } from "next/headers";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
