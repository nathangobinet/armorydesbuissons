const withImages = require('next-images');
const withVideos = require('next-videos');

module.exports = withImages(withVideos({
  assetDirectory: 'static',
  webpack(config) {
    return config;
  },
}));
