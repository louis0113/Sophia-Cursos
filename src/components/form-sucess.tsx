import { CheckCircleIcon } from "lucide-react";

interface FormSucessProps {
  message?: string;
}

export const FormSucess = ({ message }: FormSucessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-medium flex items-center gap-x-2 text-sdm text-emerald-500 ">
      <CheckCircleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
