import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/api/'], // Example disallowed paths
        },
        sitemap: 'https://velvet-directory.example.com/sitemap.xml',
    };
}
