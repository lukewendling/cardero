import React from 'react';
import * as Components from '.';
import routes from '../routes';

// hash over pushstate:
// partly from http://jamesknelson.com/push-state-vs-hash-based-routing-with-react-js/
export default class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'login',
      loading: false
    };

    this.go = this.go.bind(this);
    this.updateRoute = this.updateRoute.bind(this);
    // this.handlePopState = this.handlePopState.bind(this)
    this.handleHashChange = this.handleHashChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange, false);
    // window.addEventListener('popstate', this.handlePopState, false)
    // load route from hash or load default route
    const route =
      this.getCurrentRoute(window.location.href) || this.state.route;
    this.go(route);
    this.updateRoute(route);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange, false);
    // window.removeEventListener('popstate', this.handlePopState, false)
  }

  updateRoute(route) {
    route = route.replace(/^#/, '');
    this.setState((prevState, props) => {
      return { route };
    });
  }

  go(route) {
    route = route.replace(/^#/, '');
    window.location.hash = `#${route}`;
  }

  handleHashChange(event) {
    const newURL = event.newURL;
    const route = this.getCurrentRoute(newURL);
    console.info('New route', route);
    this.updateRoute(route);
  }

  // get current route from either hashchange event or from window location
  getCurrentRoute(url) {
    if (url.indexOf('#') === -1) return;
    return url.substring(url.indexOf('#'));
  }

  // turn config into component with props + children
  materialize(conf, props) {
    console.info('Trying to create element with conf', conf);
    if (conf) {
      return React.createElement(
        Components[conf.type],
        Object.assign(
          {
            go: this.go,
            loadingWrapper: this.loadingWrapper.bind(this),
            loading: this.state.loading
          },
          conf.props,
          props
        ),
        conf.children
      );
    } else {
      return null;
    }
  }

  // member route -> "resource/12345".
  // collection route lacks ID part.
  parseRoute(route) {
    const parts = route.split('/'),
      resourceType = parts[0].toLowerCase(),
      resourceID = parts[1];
    return [resourceType, resourceID];
  }

  async loadingWrapper(wrappedFunc, ...args) {
    this.setState({ loading: true });
    const retVal = await wrappedFunc(...args);
    this.setState({ loading: false });
    return retVal;
  }

  render() {
    const [resourceType, resourceID] = this.parseRoute(this.state.route);
    const layout = routes[resourceType].layout;
    const props = resourceID ? { id: resourceID } : {};
    const layoutProps = {
      header: this.materialize(layout.header, props),
      main: this.materialize(layout.main, props)
    };

    // React.__spread deprecated but reactify still outputs, so longhand for now
    return (
      <Components.Layout
        header={layoutProps.header}
        main={layoutProps.main}
        activeMenuItem={resourceType}
        go={this.go}
        loadingWrapper={this.loadingWrapper.bind(this)}
        loading={this.state.loading}
      />
    );
  }
}
