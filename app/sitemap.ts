import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.onbecoming.co.nz',            changeFrequency: 'weekly',  priority: 1.0 },
    { url: 'https://www.onbecoming.co.nz/episodes',   changeFrequency: 'weekly',  priority: 0.9 },
    { url: 'https://www.onbecoming.co.nz/about',      changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.onbecoming.co.nz/newsletter', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.onbecoming.co.nz/contact',    changeFrequency: 'monthly', priority: 0.6 },
  ]
}
