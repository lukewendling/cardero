import base from './base';
import _ from 'lodash';

function ListFactory() {
  const attrs = {
    title: '',
    slug: '',
    desc: '',
    private: false,
    items: [
      {
        title: '',
        url: '',
        desc: ''
      }
    ]
  };

  let list = Object.create(base, {
    attrs: { value: attrs, writable: true },
    _name: { value: 'lists' }
  });

  list.create = function() {
    // remove empty items (those with no title)
    this.attrs.items = this.attrs.items.filter(
      item => !_.isEmpty(item.title.trim())
    );
    return base.create.bind(this)();
  };
  return list;
}

// add static methods
ListFactory._name = 'lists';
ListFactory.findById = base.findById.bind(ListFactory);
ListFactory.find = base.find.bind(ListFactory);

export default ListFactory;
