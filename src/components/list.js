import React from 'react';
import { Label, Card } from 'semantic-ui-react';
import ListFactory from '../models/list';

export default class List extends React.Component {
  state = { list: null };

  async componentDidMount() {
    const list = await ListFactory().find(this.props.id);
    console.info(list);
    this.setState({ list });
  }

  render() {
    const list = this.state.list;
    if (!list) return null;
    return <Card raised header={list.title} description={list.desc} />;
  }
}
