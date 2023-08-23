import { z } from "zod";

const siteConfigSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  mainNav: z
    .object({
      title: z.string().nonempty(),
      href: z.string().nonempty(),
    })
    .array(),
  links: z.object({
    twitter: z.string().nonempty(),
    github: z.string().nonempty(),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

const siteConfigData: SiteConfig = {
  name: "Car Info",
  description:
    "A tool for car mechanics to manage their clients' data with an easy to use interface.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Create",
      href: "/add-car",
    },
  ],
  links: {
    twitter: "https://twitter.com/souvlaki42",
    github: "https://github.com/souvlaki42",
  },
};

export const siteConfig = siteConfigSchema.parse(siteConfigData);

