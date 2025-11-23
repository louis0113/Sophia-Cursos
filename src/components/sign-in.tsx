import { signIn } from "@/auth";
export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <label>
        Aluno
        <input type="radio" id="aluno" value={"aluno"} name="mycheckboxes" />
      </label>
      <label>
        {" "}
        Instrutor
        <input
          type="radio"
          id="instrutor"
          value={"instrutor"}
          name="mycheckboxes"
        />
      </label>
      <button>Sign In</button>
    </form>
  );
}
