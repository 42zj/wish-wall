const config = {
  DEBUG: true,
  MYSQL: {
    host: 'localhost',
    database: 'wish',
    username: 'root',
    password: '123456',
  },
};

if (process.env.NODE_ENV === 'production') {
  config.MYSQL = {
    host: 'localhost',
    database: 'wish',
    username: 'root',
    password: '123456',
  };
}

module.exports = config;
