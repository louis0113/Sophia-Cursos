"use client";

import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have a account"
      backButtonHref="/register"
      showSocial
    >
      <FieldSet onSubmit={handleSubmit(() => {})}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input {...register("email")} placeholder="some@email.com" />
            {errors.email && <p>{errors.email.message}</p>}
            <FieldDescription>Put your email on your account.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <Input
              {...register("password")}
              type="password"
              placeholder="••••••••"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </CardWrapper>
  );
};
