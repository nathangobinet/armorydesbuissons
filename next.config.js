const withOptimizedImages = require('next-optimized-images');
const withVideos = require('next-videos');
const compose = require('next-compose');

module.exports = compose([
  [withOptimizedImages, withVideos({
    assetDirectory: 'static',
    webpack(config) {
      return config;
    },
  })],
  {
    webpack(config) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash].[ext]',
            },
          },
        ],
      });
      return config;
    },
  },
]);
