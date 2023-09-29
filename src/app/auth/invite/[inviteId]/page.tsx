"use client";
import { AcceptInviteForm } from "@/components/AcceptInviteForm";
import type { InviteProps } from "./types";

const Invite = ({ params }: InviteProps) => {
  return <AcceptInviteForm inviteId={params.inviteId} />;
};

export default Invite;
