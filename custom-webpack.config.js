const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        RESCUEGROUPS_KEY: JSON.stringify(process.env.RESCUEGROUPS_KEY),
        GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY)
      }
    })
  ]
}
