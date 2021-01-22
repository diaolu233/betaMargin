const withLess = require('@zeit/next-less')
// require('events').EventEmitter.defaultMaxListeners = 0
module.exports = withLess({
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            // img 路径名称.hash.ext
            // 比如 1.png 路径名称为
            // _next/static/1.29fef1d3301a37127e326ea4c1543df5.png
            name: '[name].[contenthash].[ext]',
            // 硬盘路径
            outputPath: 'static',
            // 网站路径是
            publicPath: '_next/static'
          }
        },
      //   {
      //     loader: 'babel-loader',
      //     options: {
      //         plugins: ["@babel/plugin-transform-runtime"]
      //     }
      // }
      ]
    })
    return config
  }
  // async redirects() {
  //   return [
  //     {
  //       source: '/farm',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // }
})

  