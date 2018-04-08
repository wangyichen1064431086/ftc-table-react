const path = require('path');
const webpack = require('webpack');
const sassLoader = 'style-loader!css-loader?modules&importLoaders&localIdentName=[name]__[local]__[hash:base64:5]!sass-loader?sourceMap=true&sourceMapContents=true';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const cssnano = require('cssnano');

module.exports = {
  mode:'production',
  devtool: 'source-map',
  entry:{
    index:['./js/index.js'],
    vendors:['react', 'react-dom', 'react-router']
  },
  output:{
    path: path.resolve(__dirname, 'build'),
    filename:'[name].js',
    library:'MyFtcTable',
    libraryTarget:'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test:/\.jsx?$/,//匹配.js和.jsx结尾的文件
      include: [
        path.resolve(__dirname, 'js')
      ],
      loaders: ['babel-loader']//Rule.loaders is an alias to Rule.use.
    }, {
      test: /\.scss$/,
      include: [
        path.resolve(__dirname, 'css'),
        //path.resolve(__dirname, 'node_modules')
      ],
      loader: sassLoader
    }]
  },
  resolve: { 
    //Configure how modules are resolved.
    extensions: [
      //Enables users to leave off the extension when importing.(省略引入文件的后缀)
      '.js', '.jsx','.scss','.css'
    ]
  },
  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all'
            }
        }
    },
    minimize:true
 },
  plugins: [
   // new webpack.optizimation.splitChunks('vendors','vendors.js'),
    //new webpack.optimize.DedupePlugin(),
    /*
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: false
    }),
    new ExtractTextPlugin('ftctable.css', {
      allChunks: true
    }),
    
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        unused: true,
        dead_code:true
      }
    })
    */
  ]


}