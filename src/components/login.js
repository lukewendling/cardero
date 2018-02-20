import React from 'react';
import web3 from '../lib/web3';
import { Button } from 'semantic-ui-react';
import apiClient from '../lib/api-client';

export default class Login extends React.Component {
  state = { error: '', loading: false };

  async login() {
    const accounts = await web3.eth.getAccounts();
    const addr = accounts[0];
    const data = [{ type: 'string', name: 'Message', value: 'Log me in' }];

    web3.currentProvider.sendAsync(
      {
        method: 'eth_signTypedData',
        params: [data, addr],
        addr
      },
      async (err, result) => {
        if (err) {
          return this.setState({ error: err.message });
        }
        if (result.error) {
          console.error(result.error.message);
          return this.setState({ error: 'Are you logged into Metamask?' });
        }

        this.setState({ loading: true });

        try {
          await apiClient.auth({ addr, sig: result.result, data });
          this.props.go('new-list');
        } catch (err) {
          this.setState({ error: err.message });
        }
        this.setState({ loading: false });
      }
    );
  }

  maybeRenderError() {
    if (this.state.error) {
      return <div className="ui error message">{this.state.error}</div>;
    } else {
      return <div className="ui info message">Log in with MetaMask</div>;
    }
  }

  render() {
    return (
      <div>
        {this.maybeRenderError()}
        <Button
          icon="sign in"
          size="massive"
          content="Log in"
          loading={this.state.loading}
          primary
          fluid
          onClick={() => this.login()}
        />
      </div>
    );
  }
}
