import React from 'react';
import {
  Segment,
  Input,
  Form,
  TextArea,
  Header,
  Button
} from 'semantic-ui-react';
import ListFactory from '../models/list';
import ListItem from './list-item';
import _ from 'lodash';

export default class NewList extends React.Component {
  state = { list: ListFactory().attrs };

  handleInputChange = (e, { name, value }) => {
    const list = this.state.list;
    _.set(list, name, value);
    this.setState({ list });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.loadingWrapper(this.create.bind(this));
  };

  handleAddItem = e => {
    e.preventDefault();
    const list = this.state.list;
    list.items.push(ListFactory().attrs.items[0]);
    this.setState({ list });
  };

  removeItem(index) {
    const list = this.state.list;
    list.items.splice(index, 1);
    this.setState({ list });
  }

  async create() {
    try {
      const newList = ListFactory();
      newList.attrs = this.state.list;
      const list = await newList.create();
      this.props.go(`list/${list.id}`);
    } catch (err) {
      console.error(err);
    }
  }

  renderItems(list) {
    const items = list.items.map((item, i) => (
      <ListItem
        key={i}
        item={item}
        index={i}
        handleInputChange={this.handleInputChange}
        removeItem={this.removeItem.bind(this)}
      />
    ));
    return (
      <Segment clearing inverted raised>
        <Header content="Items" />
        {items}
        <Button
          inverted
          onClick={this.handleAddItem}
          floated="right"
          content="Add"
          basic
          icon="add"
        />
      </Segment>
    );
  }

  render() {
    const list = this.state.list;
    return (
      <Form onSubmit={this.handleSubmit} loading={this.props.loading}>
        <Form.Field required>
          <label>Title</label>
          <Input
            name="title"
            value={list.title}
            onChange={this.handleInputChange}
            autoComplete="off"
            required
          />
        </Form.Field>
        <Form.Field required>
          <label>Slug</label>
          <Input
            name="slug"
            value={list.slug}
            onChange={this.handleInputChange}
            autoComplete="off"
            required
          />
        </Form.Field>
        <Form.Field required>
          <label>Description</label>
          <TextArea
            name="desc"
            value={list.desc}
            onChange={this.handleInputChange}
            autoComplete="off"
            required
          />
        </Form.Field>

        {this.renderItems(list)}
        <Form.Button content="Create" primary fluid size="huge" />
      </Form>
    );
  }
}
