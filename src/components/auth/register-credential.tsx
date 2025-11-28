"use client";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useTransition, useState } from "react";
import { Register } from "@/app/lib/actions/register";
import { SelectRole } from "@/components/auth/select";
import { FormError } from "@/components/form-error";
import { FormSucess } from "@/components/form-sucess";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

export const CredentialRegister = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  type FormValues = z.infer<typeof RegisterSchema>;

  function onSubmit(data: FormValues) {
    setError("");
    setSuccess("");
    startTransition(() => {
      Register(data).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup className="items-center">
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  {...field}
                  disabled={isPending}
                  id="username"
                  placeholder="your-username"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error?.message && (
                  <FieldError
                    errors={[{ message: fieldState.error.message }]}
                  />
                )}
                <FieldDescription>Put your username</FieldDescription>
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  disabled={isPending}
                  id="email"
                  placeholder="some@email.com"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error?.message && (
                  <FieldError
                    errors={[{ message: fieldState.error.message }]}
                  />
                )}
                <FieldDescription>
                  Put your email on your account.
                </FieldDescription>
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                <Input
                  {...field}
                  disabled={isPending}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error?.message && (
                  <FieldError
                    errors={[{ message: fieldState.error.message }]}
                  />
                )}
              </Field>
            )}
          />
          <SelectRole />
          <FormError message={error} />
          <FormSucess message={success} />
          <Field orientation="vertical">
            <Button
              className="w-full"
              variant="outline"
              size="lg"
              type="button"
              onClick={() => {
                form.reset();
                setSuccess("");
                setError("");
              }}
            >
              Reset
            </Button>
            <Button
              disabled={isPending}
              className="w-full"
              size="lg"
              type="submit"
            >
              Register
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
