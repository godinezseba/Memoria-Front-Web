// https://stackoverflow.com/questions/63067555/how-to-make-an-import-shortcut-alias-in-create-react-app
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '$': path.resolve(__dirname, './src'),
      '$atoms': path.resolve(__dirname, './src/atoms'),
      '$components': path.resolve(__dirname, './src/components'),
      '$layout': path.resolve(__dirname, './src/layout'),
      '$services': path.resolve(__dirname, './src/services'),
      '$store': path.resolve(__dirname, './src/store'),
      '$utils': path.resolve(__dirname, './src/utils'),
      '$views': path.resolve(__dirname, './src/views'),
    }
  },
};
