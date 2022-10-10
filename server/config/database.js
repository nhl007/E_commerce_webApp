const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `Connected to MongoDB with Host: ${con.connection.host}:${con.connection.port}`
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDatabase;
