/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.aceternity.com',
                port: '',
                pathname: '/demos/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                // Match any path after the domain
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'unsplash.com',
                port: '',
                pathname: '/photos/**',
            }
        ]
    },
    // Acccess env variables in client side
    // reactStrictMode: true,
    // env: {
    //     BASE_URL: process.env.BASE_URL,
    // },
};

export default nextConfig;
