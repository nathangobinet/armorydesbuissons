const withOptimizedImages = require('next-optimized-images');
const withVideos = require('next-videos');

module.exports = withOptimizedImages(withVideos({
  assetDirectory: 'static',
  webpack(config) {
    return config;
  },
}));
