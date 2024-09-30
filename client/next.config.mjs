/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        NEXT_PUBLIC_API_GATEWAY: '/api/v1',
        API_GATEWAY: '/api/v1',
    }
};

export default nextConfig;
