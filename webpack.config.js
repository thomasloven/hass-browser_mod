const path = require('path');

module.exports = {
  entry: './js/main.js',
  mode: 'production',
  output: {
    filename: 'custom_components/browser_mod/browser_mod.js',
    path: path.resolve(__dirname)
  }
};
