/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
    REACT_APP_STROAGE_BUCKET: process.env.REACT_APP_STROAGE_BUCKET,
    REACT_APP_MESSAING_SENDER_ID: process.env.REACT_APP_MESSAING_SENDER_ID,
    REACT_APP_ID: process.env.REACT_APP_ID,
  },
}

module.exports = nextConfig
