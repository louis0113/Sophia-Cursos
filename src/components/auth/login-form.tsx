import { CardWrapper } from "@/components/auth/card-wrapper";
import { CredentialLogin } from "@/components/auth/login-credential";
export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have a account?"
      backButtonHref="/register"
      showSocial
    >
      <CredentialLogin />
    </CardWrapper>
  );
};
