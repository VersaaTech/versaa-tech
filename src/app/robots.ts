import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/',
        '/auth/',
        '/api/',
        '/n8n.versaatech.com/',
        '/knowledge-base/',
      ],
    },
    sitemap: 'https://www.versaatech.com/sitemap.xml',
  }
}
