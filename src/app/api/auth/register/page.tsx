import { SignInButton } from "@/components/sign-in-button";
export default function Register() {
  return (
    <div className="bg-green-500 p-10">
      <h3>Register with us</h3>
      <form>
        <label>
          Username
          <input name="username" type="text" />
        </label>
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
      <SignInButton />
    </div>
  );
}
