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
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
export const LoginForm = () => {

type FormValues = z.infer<typeof LoginSchema>

  const  form  = useForm< FormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  function onSubmit(data : FormValues) {
    console.log(data)
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have a account"
      backButtonHref="/register"
      showSocial
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet >
        <FieldGroup>
            <Controller name="email" control={form.control} render={({field, fieldState}) => {
<Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input {...field} placeholder="some@email.com" />
            <FieldDescription>Put your email on your account.</FieldDescription>
          </Field>

            }}/>
          
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <Input
              
              type="password"
              placeholder="••••••••"
            />
        
          </Field >

            <Field orientation="vertical">
              <LoginButton mode="redirect" onClick="">

  <Button className="w-full" variant="outline"  size="lg" type="reset">
    Reset
  </Button>
</LoginButton>
<LoginButton mode="redirect" onClick="">

  <Button className="w-full" size="lg" type="submit">
    Log in
  </Button>
</LoginButton>

            </Field>
        </FieldGroup>
      </FieldSet>


      </form>
    </CardWrapper>
  );
};
