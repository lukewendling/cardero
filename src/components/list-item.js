import React, { Fragment } from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ListItem extends React.Component {
  handleRemoveItem = e => {
    e.preventDefault();
    this.props.removeItem(this.props.index);
  };

  maybeShowRemove() {
    if (this.props.index === 0) return null;
    return (
      <Button
        icon="trash outline"
        circular
        color="red"
        title="Remove this item"
        onClick={this.handleRemoveItem}
      />
    );
  }
  render() {
    const item = this.props.item;
    const onChange = this.props.handleInputChange;
    return (
      <Fragment>
        <Form.Group>
          <Form.Field required width={5}>
            <label>Title</label>
            <Input
              name={`items[${this.props.index}].title`}
              value={item.title}
              onChange={onChange}
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field required width={5}>
            <label>URL</label>
            <Input
              name={`items[${this.props.index}].url`}
              value={item.url}
              onChange={onChange}
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field required width={6}>
            <label>Description</label>
            <TextArea
              name={`items[${this.props.index}].desc`}
              value={item.desc}
              onChange={onChange}
              autoComplete="off"
            />
          </Form.Field>
        </Form.Group>

        {this.maybeShowRemove(item)}
      </Fragment>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number,
  handleInputChange: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default ListItem;
