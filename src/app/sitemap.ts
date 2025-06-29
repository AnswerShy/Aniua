import { getAllAnimeSlugs } from '@/utils';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllAnimeSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: 'https://aniua.vip',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://aniua.vip/list',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `https://aniua.vip/anime/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
