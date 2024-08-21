module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MY_ENV': 'hi'
    })
  ]
}