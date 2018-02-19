const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'somethingsecret';

// in-memory db
let db = {};

const handlers = {
  find(req, res) {
    const user = db[req.user];
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({});
    }
  },
  create(req, res) {
    db[req.user] = req.body;
    res.json(db[req.user]);
  },
  update(req, res) {
    let attrs = req.body;
    // prevent input hackery
    delete attrs.addr;
    let user = db[req.user];
    if (user) {
      user = Object.assign(user, attrs);
      return res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
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
