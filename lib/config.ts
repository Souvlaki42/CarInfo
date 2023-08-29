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
    "Ένα εργαλείο για τους μηχανικούς αυτοκινήτων για να διαχειρίζονται τα δεδομένα των πελατών τους με μια εύχρηστη διεπαφή.",
  mainNav: [
    {
      title: "Αρχική",
      href: "/",
    },
    {
      title: "Προσθήκη",
      href: "/add-car",
    },
  ],
  links: {
    twitter: "https://twitter.com/souvlaki42",
    github: "https://github.com/souvlaki42",
  },
};

export const siteConfig = siteConfigSchema.parse(siteConfigData);

