import React, { Fragment } from 'react';
import { Segment, Card, Header, Icon } from 'semantic-ui-react';
import ListFactory from '../models/list';

export default class List extends React.Component {
  state = { list: null };

  async componentDidMount() {
    const list = await ListFactory().find(this.props.id);
    console.info(list);
    this.setState({ list });
  }

  renderItems() {
    const list = this.state.list;
    const items = list.items.map(item => ({
      header: item.title,
      description: item.desc,
      extra: (
        <div>
          <Icon name="linkify" />
          <a href={item.url} target="_blank">
            Learn more
          </a>
        </div>
      ),
      key: item.url
    }));

    return (
      <Fragment>
        <Header content="List details" />
        <Card fluid raised header={list.title} description={list.desc} />
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
