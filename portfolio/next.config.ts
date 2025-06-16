/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mantine/core', '@mantine/hooks', '@mantine/form', '@mantine/notifications'],
};

module.exports = nextConfig;