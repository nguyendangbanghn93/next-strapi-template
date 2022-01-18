module.exports = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60,
    loader: "cloudinary",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: 'https://res.cloudinary.com/nguyendangbang/'
  },
};
