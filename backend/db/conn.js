require('dotenv').config()
const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, client) {
        if (client) {
            dbConnection = client.db("bellusDB");
            console.log("Successfully connected to MongoDB.");
        }
        return callback(err);
    });
  },

  getDb: function () {
    return dbConnection;
  },
};