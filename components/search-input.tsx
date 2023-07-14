"use client";

import { useState, KeyboardEvent } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export const SearchInput = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const checkSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const encoded = encodeURI(query);
    router.push(`?s=${encoded}`);
    // Continue searching system
  }

  return <Input placeholder="What are you looking?" type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={checkSubmit}/>
}