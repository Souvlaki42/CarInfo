import { MetadataRoute } from "next";

const baseUrl = "https://carinfo.souvlaki.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/add-car`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/unauthorized`,
      lastModified: new Date(),
    },
  ];
}
