import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import configuration from "@/config.json";
import { object, string, array } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const configurationSchema = object({
  name: string(),
  description: string(),
  mainNav: array(
    object({
      title: string(),
      href: string(),
    })
  ),
  links: object({
    twitter: string(),
    github: string(),
  }),
});

export const config = configurationSchema.parse(configuration);
export type Config = typeof config;