/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        NEXT_PUBLIC_API_GATEWAY: process.env.NEXT_PUBLIC_API_GATEWAY
    }
};

export default nextConfig;
