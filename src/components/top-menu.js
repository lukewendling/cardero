import React from 'react';
import { Menu, Input } from 'semantic-ui-react';

export default class TopMenu extends React.Component {
  state = { activeItem: 'login' };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.go(name);
  };

  render() {
    const { activeItem } = this.props;
    return (
      <Menu pointing inverted>
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="new-list"
          active={activeItem === 'new-list'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="messages"
          active={activeItem === 'messages'}
          // onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
