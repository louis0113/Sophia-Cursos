import { CardWrapper } from "@/components/auth/card-wrapper";
import { AlertTriangle } from "lucide-react";
export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full items-center justify-center flex">
        <AlertTriangle className="tetx-destructive" />
      </div>
    </CardWrapper>
  );
};
