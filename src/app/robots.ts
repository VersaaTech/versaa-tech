import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/auth/',
        '/api/',
        '/knowledge-base/',
      ],
    },
    sitemap: 'https://www.versaatech.com/sitemap.xml',
  }
}
