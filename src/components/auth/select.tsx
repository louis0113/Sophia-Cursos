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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-[180px] animate-pulse rounded-md bg-muted" />;
  }

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="aluno">Aluno</SelectItem>
        <SelectItem value="instrutor">Instrutor</SelectItem>
      </SelectContent>
    </Select>
  );
};
