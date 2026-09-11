import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.emham.my.id';
  const adminSecretPath = process.env.ADMIN_SECRET_PATH || '/adminham-kece-secret-login';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin-internal',
        '/admin-internal/',
        adminSecretPath,
        `${adminSecretPath}/`,
        '/api/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
