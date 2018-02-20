import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // use MetaMask or other injected provider.
  web3 = new Web3(window.web3.currentProvider);
} else {
  throw new Error('MetaMask must be installed');
}

export { web3 as default };
