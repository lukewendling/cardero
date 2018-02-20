import React from 'react';
import { Container, Loader, Grid } from 'semantic-ui-react';
import TopMenu from './top-menu';

export default class Layout extends React.Component {
  render() {
    return (
      <Container>
        <Loader content="Loading" active={this.props.loading} />
        <TopMenu activeItem={this.props.activeMenuItem} go={this.props.go} />
        <Grid columns={1}>
          <Grid.Row>
            <Grid.Column>{this.props.header}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>{this.props.main}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
