import React, { Fragment } from 'react';
import { Segment, Card, Header, Icon } from 'semantic-ui-react';
import ListFactory from '../models/list';

export default class List extends React.Component {
  state = { list: null };

  async componentDidMount() {
    const list = await ListFactory.findById(this.props.id);
    console.info(list);
    this.setState({ list });
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
        <Header content="List details" />
        <Card
          fluid
          raised
          header={list.title}
          description={list.desc}
          extra={this.renderLinkSection(`/#s/${list.slug}`, 'Preview')}
        />
        <Header content="List items" />
        <Card.Group items={items} />
      </Fragment>
    );
  }

  render() {
    const list = this.state.list;
    if (!list) return null;
    return <Segment color="olive" raised content={this.renderItems()} />;
  }
}
