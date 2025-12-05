"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { SelectRole } from "@/schemas";
import * as z from "zod";
import { useTransition, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Role } from "@/app/lib/actions/role";
import {
  Field,
  FieldDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function RoleSelect() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  type FormValues = z.infer<typeof SelectRole>;
  const form = useForm<FormValues>({
    resolver: zodResolver(SelectRole),
    defaultValues: {
      role: undefined,
    },
  });

  function onSubmit(data: FormValues) {
    setError("");
    setSuccess("");
    startTransition(() => {
      Role(data).then((data) => {});
    });
    router.push(DEFAULT_LOGIN_REDIRECT);
  }

  return (
    <CardWrapper
      headerLabel="Select your role!"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
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
                  <FieldDescription>
                    Select your role in the platform
                  </FieldDescription>
                </Field>
              )}
            />
            <Field orientation="vertical">
              <Button
                disabled={isPending}
                className="w-full"
                size="lg"
                type="submit"
              >
                Confirm role
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </CardWrapper>
  );
}
