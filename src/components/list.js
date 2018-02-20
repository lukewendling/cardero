import React, { Fragment } from 'react';
import {
  Segment,
  Card,
  Header,
  Icon,
  Form,
  Input,
  TextArea
} from 'semantic-ui-react';
import ListFactory from '../models/list';

export default class List extends React.Component {
  state = { list: null, newComment: ListFactory().attrs.comments[0] };

  async componentDidMount() {
    const list = await ListFactory.findById(this.props.id);
    console.info(list);
    this.setState({ list });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.loadingWrapper(this.addComment.bind(this));
  };

  handleInputChange = (e, { name, value }) => {
    const newComment = this.state.newComment;
    newComment[name] = value;
    this.setState({ newComment });
  };

  addComment() {
    const list = this.state.list;
    list.comments.push(this.state.newComment);
    this.setState({ list, newComment: null });
  }

  renderLinkSection(url, content) {
    return (
      <Fragment>
        <Icon name="linkify" />
        <a href={url} target="_blank">
          {content}
        </a>
      </Fragment>
    );
  }

  renderItems() {
    const list = this.state.list;
    const items = list.items.map(item => ({
      header: item.title,
      description: item.desc,
      extra: this.renderLinkSection(item.url, 'Learn more'),
      key: item.url
    }));

    return (
      <Fragment>
        <Header content="List details" icon="list" />
        <Card
          fluid
          raised
          header={list.title}
          description={list.desc}
          extra={this.renderLinkSection(`/#todo`, 'Preview')}
        />
        <Header content="List items" />
        <Card.Group items={items} />
      </Fragment>
    );
  }

  renderPastComments() {
    const comments = this.state.list.comments.map(comment => ({
      header: comment.name,
      description: comment.body,
      key: comment.url,
      meta: new Date(comment.created).toLocaleDateString(),
      fluid: true
    }));

    if (!comments.length) return null;

    return (
      <Segment>
        <Card.Group items={comments} />
      </Segment>
    );
  }

  renderNewComment() {
    const newComment = this.state.newComment;
    if (!newComment) return null;
    return (
      <Form onSubmit={this.handleSubmit} loading={this.props.loading}>
        <Header content="Have a comment?" as="h5" />
        <Form.Group>
          <Form.Field required width={6}>
            <label>Name</label>
            <Input
              name="name"
              value={newComment.name}
              onChange={this.handleInputChange}
              autoComplete="off"
              required
            />
          </Form.Field>
          <Form.Field required width={10}>
            <label>Comment</label>
            <TextArea
              name="body"
              value={newComment.body}
              onChange={this.handleInputChange}
              required
            />
          </Form.Field>
        </Form.Group>

        <Form.Button content="Submit" primary />
      </Form>
    );
  }
  renderComments() {
    return (
      <Fragment>
        <Header content="User Comments" icon="talk" />
        {this.renderPastComments()}
        {this.renderNewComment()}
      </Fragment>
    );
  }

  render() {
    const list = this.state.list;
    if (!list) return null;
    return (
      <Fragment>
        <Segment color="olive" raised content={this.renderItems()} />
        <Segment color="blue" raised content={this.renderComments()} />
      </Fragment>
    );
  }
}
