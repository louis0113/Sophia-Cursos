"use client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectRole = () => {
  const [role, setRole] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-[180px] animate-pulse rounded-md bg-muted" />;
  }

  return (
    <Select
      value={role}
      onValueChange={(role) => {
        setRole(role);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="aluno">Aluno</SelectItem>
        <SelectItem value="instrutor">Instrutor</SelectItem>
      </SelectContent>
      <p>{role}</p>
    </Select>
  );
};
