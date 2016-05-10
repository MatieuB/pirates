// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/pirates',
    pool: {
      min:2,
      max: 10
    }
  },
  seeds: {
    directory: './seeds/'
  }
};
