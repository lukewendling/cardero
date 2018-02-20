const { MongoClient, ObjectID } = require('mongodb');
const { db: { uri, name: dbName } } = require('./conf');
const _ = require('lodash');

const actions = {
  async findById(collName, id) {
    return this.exec(async db => {
      const doc = await db.collection(collName).findOne({ _id: ObjectID(id) });
      // append dev-friendly 'id' attribute.
      doc.id = doc._id;
      return doc;
    });
  },

  async find(collName, query = {}, options = {}) {
    // apply sane restrictions.
    options.limit = _.min([options.limit, 250]);
    return this.exec(async db => {
      let results = await db.collection(collName).find(query, options);
      return results.toArray();
    });
  },

  async create(collName, attrs) {
    return this.exec(async db => {
      const res = await db.collection(collName).insertOne(attrs);
      // append dev-friendly 'id' attribute.
      return Object.assign(attrs, { id: res.insertedId });
    });
  },

  async exec(action) {
    let client;

    try {
      client = await MongoClient.connect(uri);
      const db = client.db(dbName);
      const res = await action(db);
      client.close();
      return res;
    } catch (err) {
      console.error(err.stack);
      client.close();
      return { error: err.message };
    }
  }
};

module.exports = actions;
