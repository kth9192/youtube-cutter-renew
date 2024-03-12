/** @type {import('next').NextConfig} */
const nextConfig = { removeConsole: process.env.NODE_ENV === 'production' };

module.exports = nextConfig;
