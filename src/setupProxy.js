
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://art-of-your-mixtape.herokuapp.com/',
      changeOrigin: true,
      router: {
        'dev.localhost:3000': 'http://localhost:3000',
      }
    })
  )

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://accounts.spotify.com/',
      changeOrigin: true,
      router: {
        'dev.localhost:3000': 'http://localhost:3000',
      }
    })
  )

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.spotify.com/v1/playlists/',
      changeOrigin: true,
      router: {
        'dev.localhost:3000': 'http://localhost:3000',
      }
    })
  )
};
