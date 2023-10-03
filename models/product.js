const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class Product {
  constructor(title, price, description, imageUrl, id) {
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    // отримуємо доступ до нашої db
    const db = getDb();
    // Робимо так щоб потім зробити на ньому then().catch() а не на кожній операції окремо один і той самий код
    let dbOperation;

    if (this._id) {
      // перший аргумет цей в якому обєкті ми хочемо update, другий це шо саме ми хочемо замінити
      dbOperation = db
        .collection("products")
        // також використовується $set: {}
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOperation = db.collection("products").insertOne(this);
    }
    // Ось тут цей then().cathc()
    return dbOperation.then().catch((err) => console.log(err));
  }

  static findById(id) {
    const db = getDb();
    return (
      db
        .collection("products")
        // MongoDB зберігає id як _id і використовує обєкт як id
        // тому миколи шукаємо наш id ми повинні використовувати ObjectId()
        .find({ _id: new mongodb.ObjectId(id) })
        .next()
        .then((product) => product)
        .catch((err) => console.log(err))
    );
  }

  static fetchAll() {
    const db = getDb();
    // find поветає курсор. Це такий обʼєкт в mongoDB.
    // toArray потрібно використовувати якшо у нас не більше 100 items, в іншому випадку поітбно буде використовувати пагінацію.
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }

  static delete(id) {
    const db = getDb();
    return db.collection("products").deleteOne({ _id: new mongodb.ObjectId(id) });
  }
}

module.exports = Product;
