const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: "./src/index.js"
    ,"index-web": "./src/index-web.js"
    ,"index-node": "./src/index-node.js"
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/
        ,include: []
        ,loader: 'babel-loader'
        ,options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  optimization: {}
};
