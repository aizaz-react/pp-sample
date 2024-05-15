/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
    }
  },
  transpilePackages: ['@mui/system', '@mui/material', '@mui/icons-material']
};

module.exports = nextConfig;
