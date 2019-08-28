module.exports = {
    chainWebpack: config => {
      config.resolve
          .symlinks(true)
      return config
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
