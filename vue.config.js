module.exports = {
  publicPath: "/",
  devServer: {
    https: false,
    proxy: {
      '/weather': {
        target: 'https://wis.qq.com',
        changeOrigin: true
      }
    }
  }
};