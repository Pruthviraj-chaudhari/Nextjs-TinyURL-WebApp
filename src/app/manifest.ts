import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TinyURL.io',
    short_name: 'TinyURL',
    description: 'Open-source URL shortener with real-time analytics, Easily create short, branded links for your business.',
    start_url: '/',
    display: 'standalone', 
    categories: ['utilities', 'productivity'],
  };
}
