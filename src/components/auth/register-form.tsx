import { CardWrapper } from "@/components/auth/card-wrapper";
import { CredentialRegister } from "@/components/auth/register-credential";
export const RegisterForm = () => {
  return (
    <CardWrapper
      headerLabel="Create a account"
      backButtonHref="/login"
      backButtonLabel="Already have an account?"
      showSocial
    >
      <CredentialRegister />
    </CardWrapper>
  );
};
