import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

export default class PageHeader extends React.Component {
  render() {
    return (
      <Header as="h3" icon textAlign="center">
        <Icon name={this.props.icon} circular />{' '}
        <Header.Content>{this.props.title}</Header.Content>
      </Header>
    );
  }
}
