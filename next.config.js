/** @type {import('next').NextConfig} */

// Before defining your Security Headers
// add Content Security Policy directives using a template string.

const nextConfig = {
    output: "standalone",
    async headers() {
        return [
            {
                source: '/(.*)?', // Matches all pages
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
