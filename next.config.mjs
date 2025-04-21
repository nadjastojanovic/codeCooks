/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/login", destination: "/pages/login" },
      { source: "/signup", destination: "/pages/signup" },
      { source: "/favorites", destination: "/pages/favorites" },
      { source: "/my-recipes", destination: "/pages/my-recipes" },
      { source: "/recipe/:id", destination: "/pages/recipe/:id" },
    ];
  },
};

export default nextConfig;
