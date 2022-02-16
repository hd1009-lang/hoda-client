/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXTAUTH_URL: 'https://hodathefood.vercel.app',
        // URI_SERVER: 'http://localhost:8000',
    },
};

module.exports = nextConfig;
