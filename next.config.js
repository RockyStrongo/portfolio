/** @type {import('next').NextConfig} */

// Before defining your Security Headers
// add Content Security Policy directives using a template string.

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  style-src 'self';
  font-src 'self';
`

const nextConfig = {
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
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
