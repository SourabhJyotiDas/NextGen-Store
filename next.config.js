/** @type {import('next').NextConfig} */
const nextI18NextConfig = require("./next-i18next.config.js"); // Use require() to import

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  i18n: nextI18NextConfig.i18n, // Correct way to include i18n settings
};

module.exports = nextConfig; // Export using CommonJS
