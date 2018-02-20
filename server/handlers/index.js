const jwt = require('jsonwebtoken');
const sigUtil = require('eth-sig-util');
const db = require('../mongo');
const SECRET_KEY = process.env.SECRET_KEY || 'somethingsecret';

const handlers = {
  async find(req, res) {
    if (req.params.id) {
      const doc = await db.findById('lists', req.params.id);
      if (doc) {
        res.json(doc);
      } else {
        res.status(404).json({});
      }
    } else {
      // TODO: sanitize query
      const docs = await db.find(
        'lists',
        JSON.parse(req.query.query || {}),
        JSON.parse(req.query.options || {})
      );
      res.json(docs);
    }
  },
  async create(req, res) {
    const attrs = Object.assign(req.body, { user: req.user });
    const doc = await db.create('lists', attrs);
    res.json(doc);
  },
  async update(req, res) {
    // let attrs = req.body;
    // // prevent input hackery
    // delete attrs.addr;
    // let user = db[req.user];
    // if (user) {
    //   user = Object.assign(user, attrs);
    //   return res.json(user);
    // } else {
    //   res.status(404).json({ error: 'User not found' });
    // }
  },
  auth(req, res) {
    const { data, sig, addr } = req.body;

    const recovered = sigUtil.recoverTypedSignature({
      data,
      sig
    });

    if (recovered.toLowerCase() === addr.toLowerCase()) {
      console.info('Verified. signer:', addr);
      const token = jwt.sign({ user: addr }, SECRET_KEY, {
        expiresIn: '2d'
      });
      res.json({ token });
    } else {
      console.error('Failed. result:', recovered);
      res.status(500).json({ error: 'Signature did not match.' });
    }
  }
};

module.exports = handlers;
