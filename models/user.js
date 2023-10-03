const { getDb } = require("../util/database");
const mongodb = require("mongodb");

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => console.log("USER CREATED!"))
      .catch((err) => console.log(err));
  }

  findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(id) })
      .next();
  }
}

module.exports = User;
