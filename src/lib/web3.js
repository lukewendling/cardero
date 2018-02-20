import Web3 from 'web3';

let web3;
// websockets for event subscription.
const wsProvider = new Web3.providers.WebsocketProvider(
  'wss://rinkeby.infura.io/ws'
);
const wsWeb3 = new Web3(wsProvider);

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // use MetaMask or other injected provider.
  web3 = new Web3(window.web3.currentProvider);
} else {
  throw new Error('MetaMask must be installed');
}

export { web3 as default, wsWeb3 };
