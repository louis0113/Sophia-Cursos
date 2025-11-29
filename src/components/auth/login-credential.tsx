"use client";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Login } from "@/app/lib/actions/login";
import { FormError } from "@/components/form-error";
import { useSearchParams } from "next/navigation";
import { FormSucess } from "@/components/form-sucess";
import { useTransition, useState } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CredentialLogin = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with diferent provider!"
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: undefined,
    },
  });

  type FormValues = z.infer<typeof LoginSchema>;

  function onSubmit(data: FormValues) {
    setError("");
    setSuccess("");
    startTransition(() => {
      Login(data).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup className="items-center">
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
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
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

          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aluno">Aluno</SelectItem>
                    <SelectItem value="instrutor">Instrutor</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.error?.message && (
                  <FieldError
                    errors={[{ message: fieldState.error.message }]}
                  />
                )}
              </Field>
            )}
          />

          <FormError message={error || urlError} />
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
              Log in
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
