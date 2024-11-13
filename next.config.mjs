/** @type {import('next').NextConfig} */
import withVideos from 'next-videos';
import withPWA from '@ducanh2912/next-pwa';

const nextConfig = withVideos(
  withPWA({
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.gqindia.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'encrypted-tbn0.gstatic.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'mitribu.s3.eu-north-1.amazonaws.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'i.ibb.co',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'mitribu.s3.us-east-2.amazonaws.com',
          pathname: '/**',
        },
      ],
    },
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
      
      manifestPath: '/manifest.json',
      fallbacks: {
        image: '/static/images/fallback.png'
      }
    },
  })
);

export default nextConfig