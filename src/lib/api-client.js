// def: Wraps calls to API actions.

const API_ROOT = process.env.API_ROOT || 'http://localhost:8000';
const TOKEN_NAME = 'auth-token';
const _ = require('lodash');

const actions = {
  // async create(addr) {
  //   console.info('create called', addr);
  //   return this.fetch('api/counter', 'POST', { addr, count: 0 });
  // },
  // async update(addr, attrs) {
  //   console.info('update called', addr, attrs);
  //   return this.fetch(`api/counter/${addr}`, 'PUT', attrs);
  // },
  // async find(addr) {
  //   console.info('find called', addr);
  //   return this.fetch(`api/counter/${addr}`, 'GET');
  // },
  // async findOrCreate(addr) {
  //   console.info('findorcreate called', addr);
  //   let user = await this.find(addr);
  //   if (_.isEmpty(user)) {
  //     user = await this.create(addr);
  //   }
  //   return user;
  // },
  async auth({ addr, sig, data }) {
    return this.fetch('auth', 'POST', { addr, sig, data }).then(res => {
      localStorage.setItem(TOKEN_NAME, res.token);
    });
  },
  async fetch(path, method, body = {}) {
    return window
      .fetch(`${API_ROOT}/${path}`, {
        method,
        body: _.isEmpty(body) ? null : JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem(TOKEN_NAME)
        }
      })
      .then(res => res.json())
      .then(res => {
        // trigger error handlers in callers.
        if (res.error) throw new Error(res.error);
        return res;
      });
  }
};

export default actions;
