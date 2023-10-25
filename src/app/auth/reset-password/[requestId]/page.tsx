"use client";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";

interface ResetPasswordProps {
  params: { requestId: string };
}

const ResetPassword = ({ params }: ResetPasswordProps) => {
  return <ResetPasswordForm requestId={params.requestId} />;
};

export default ResetPassword;
