const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    // отримуємо доступ до нашої db
    const db = getDb();
    // Кажемо в якій collection ми хочемо праацювати. Якщо колекції не існує , то вона створиться коли ми перший раз внесемо якісь дані
    return db
      .collection("products")
      .insertOne(this)
      .then(result)
      .catch((err) => console.log(err));
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
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
