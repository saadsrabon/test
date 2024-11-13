/** @type {import('next').NextConfig} */
import withVideos from 'next-videos';
import withPWA from '@ducanh2912/next-pwa';

const nextConfig = {
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
};

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
 
  workboxOptions: {
    disableDevLogs: true,
    cleanupOutdatedCaches: true,
    maximumFileSizeToCacheInBytes: 5000000,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/mitribu\.s3\.us-east-2\.amazonaws\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
        },
      },
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offline-cache',
          networkTimeoutSeconds: 10,
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
});
// Apply both withPWA and withVideos
export default withVideos(withPWAConfig(nextConfig));