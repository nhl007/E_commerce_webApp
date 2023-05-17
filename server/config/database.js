const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_PROD_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      const env = process.env.NODE_ENV;
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
