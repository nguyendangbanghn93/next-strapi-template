module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        // client: 'mongo',
        // host: env('DATABASE_HOST', '127.0.0.1'),
        // port: env.int('DATABASE_PORT', 27017),
        // database: env('DATABASE_NAME', 'strapi'),
        // srv: env.bool('DATABASE_SRV', true),
        uri: env(
          'DATABASE_URI',
          "mongodb://128.199.138.254:30001/ecommerce?replicaSet=rs0"
        ),
        // username: env('DATABASE_USERNAME', 'strapi'),
        // password: env('DATABASE_PASSWORD', 'strapi'),
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE"),
        ssl: env("DATABASE_SSL"),
      },
    },
  },
});









