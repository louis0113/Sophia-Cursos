import { signIn } from "@/auth";
import Form from "next/form";
export function SignIn() {
  const signInBack = async (formData: any) => {
    "use server";
    await signIn("credentials", formData);
  };

  return (
    <Form action={signInBack}>
      <div>
        <label>Email</label>
        <input name="email" type="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <div>
        <input type="radio" id="aluno" value={"aluno"} name="mycheckboxes" />
        <label className="m-1">Aluno</label>
      </div>
      <div>
        <input
          type="radio"
          id="instrutor"
          value={"instrutor"}
          name="mycheckboxes"
        />
        <label className="m-1">Instrutor</label>
      </div>
      <button>Sign In</button>
    </Form>
  );
}
