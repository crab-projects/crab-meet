const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@assets': 'src/assets',
    '@components': 'src/components',
    '@pages': 'src/pages',
    '@styles': 'src/styles'
  })(config);

  return config;
};
