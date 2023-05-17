const mongoose = require('mongoose');

const connectDatabase = () => {
  const env = process.env.NODE_ENV;
  const db =
    env === 'PRODUCTION'
      ? process.env.MONGO_PROD_URL
      : process.env.DB_LOCAl_URI;

  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      if (env.match('DEVELOPMENT')) {
        console.log(
          `Connected to MongoDB with Host: ${con.connection.host}:${con.connection.port}`
        );
      }
      if (env.match('PRODUCTION')) {
        console.log('Connected to MongoDB in Production environment');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDatabase;
