const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

// Спочатку вона пуста.
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://dima:Rtnx1jd5pR@nodejs.osjaq0b.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      // якшо зєданння успішне тоді ми зберігаємо це зєднання до _db
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

// Цю функцію ми будемо викликати , коли нам буде потібний доступ до db
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("No database found!");
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
