/* Load env vars */
require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const port = process.env.PORT || 8000;
const handlers = require('./handlers');
const auth = require('./middleware/auth');

/* Middleware */
app.use(express.json());
app.use(cors());

/* Routes */
app.post('/auth', handlers.auth);

router.get('/:id?', handlers.find);

router.post('/', handlers.create);

router.put('/:id', handlers.update);

/* Namespaces */
app.use('/api/lists', auth, router);

app.listen(port, () => console.info('Listening on port', port));
