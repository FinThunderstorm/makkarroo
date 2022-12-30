/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [['next-superjson-plugin', {}]],
        appDir: false
    }
}

module.exports = nextConfig
