module.exports = {
    chainWebpack: config => {
      config.resolve
          .symlinks(true)
      return config
    },
    configureWebpack: {
      performance: {
          hints: false,
          maxEntrypointSize: 512000,
          maxAssetSize: 512000
      },
    },
    pwa: {
      workboxOptions: {
        exclude: [
          /\.map$/,
          /img\/icons\//,
          /favicon\.ico$/,
          /manifest\.json$/,
          /\/__\/auth\//,
          /\/login\//,
          /\/logout\//,
          /\/admin\//,
        ],
      }
    }
}
