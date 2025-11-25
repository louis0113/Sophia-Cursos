"use client";
import { SignInButton } from "@/components/sign-in-button";
import Form from "next/form";
import { signup } from "@/app/lib/actions/auth";
export function SignupForm() {
  return (
    <div className="bg-green-200 p-20">
      <Form className="bg-blue-100 m-4" action={signup}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
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
        <button type="submit">Sign Up</button>
      </Form>
      <SignInButton />
    </div>
  );
}
