const express = require('express');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const PORT = process.env.PORT || '3000';

const app = express();

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./build/webpack.dev.conf');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('listening on ' + PORT);
});
