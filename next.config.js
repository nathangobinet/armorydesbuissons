const withOptimizedImages = require('next-optimized-images');
const withVideos = require('next-videos');

module.exports = withOptimizedImages(withVideos({
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        {
          key: 'Referrer-Policy',
          value: 'no-referrer-when-downgrade',
        },
      ],
    }];
  },
  assetDirectory: 'static',
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav|mpe?g)$/i,
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
}));
