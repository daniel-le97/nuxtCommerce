const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      connectionString: env('POSTGRE_STRING')
    },
    useNullAsDefault: true,
  },
});
