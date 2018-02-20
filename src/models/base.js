import apiClient from '../lib/api-client';

// TODO: base model doesn't have clear distinction b/n instance
// and static methods.
const base = {
  _name: 'base', // overwritten by inheritors
  attrs: {},
  // uses instance props
  create() {
    return apiClient.create(this._name, this.attrs);
  },
  // implicitly static
  find(id) {
    return apiClient.find(this._name, id);
  }
  // expects static usage but should be instance
  // patch(query, updates = {}) {
  //   return apiClient.patch(null, updates, { query, headers });
  // }
};

export default base;
