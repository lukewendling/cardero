import base from './base';

function ListFactory() {
  const attrs = {
    title: '',
    slug: '',
    desc: '',
    private: false
  };

  let list = Object.create(base, {
    attrs: { value: attrs, writable: true },
    _name: { value: 'lists' }
  });

  return list;
}

export default ListFactory;
