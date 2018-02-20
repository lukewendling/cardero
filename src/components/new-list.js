import React from 'react';
import { Input, Form, TextArea } from 'semantic-ui-react';
import ListFactory from '../models/list';

export default class NewList extends React.Component {
  state = ListFactory().attrs;

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.loadingWrapper(this.create.bind(this));
  };

  async create() {
    try {
      const newList = ListFactory();
      newList.attrs = this.state;
      const list = await newList.create();
      this.props.go(`list/${list.id}`);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} loading={this.props.loading}>
        <Form.Field required>
          <label>Title</label>
          <Input
            name="title"
            value={this.state.title}
            onChange={this.handleInputChange}
            autoComplete="off"
            required
          />
        </Form.Field>
        <Form.Field required>
          <label>Slug</label>
          <Input
            name="slug"
            value={this.state.slug}
            onChange={this.handleInputChange}
            autoComplete="off"
            required
          />
        </Form.Field>
        <Form.Field required>
          <label>Description</label>
          <TextArea
            name="desc"
            value={this.state.desc}
            onChange={this.handleInputChange}
            autoComplete="off"
            required
          />
        </Form.Field>

        <Form.Button content="Create" primary />
      </Form>
    );
  }
}
