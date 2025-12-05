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
import { useSession } from "next-auth/react";

export default function RoleSelect() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();
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
      Role(data).then((result) => {
        if (result?.success) {
          setSuccess(result.success);
          setTimeout(() => {
            router.push(DEFAULT_LOGIN_REDIRECT);
          }, 500);
        } else if (result?.error) {
          setError(result.error);
        }
      });
    });
  }

  if (status === "loading") {
    return (
      <CardWrapper
        headerLabel="Loading..."
        backButtonLabel="Back to login"
        backButtonHref="/login"
      >
        <div className="flex items-center justify-center p-6">
          <p className="text-muted-foreground">Loading session...</p>
        </div>
      </CardWrapper>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
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

            {error && (
              <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
                <p>{success}</p>
              </div>
            )}

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
