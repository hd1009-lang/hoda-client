/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        // NEXTAUTH_URL: 'https://hodathefood.vercel.app',
        NEXTAUTH_URL: 'http://localhost:8000',
    },
    images: {
        domains: ['i.pinimg.com', 'drive.google.com', 'res.cloudinary.com'],
    },
};

module.exports = nextConfig;
