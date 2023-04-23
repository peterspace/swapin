import modalConnectors from '@web3modal/ethereum';
import walletConnectProvider from '@web3modal/ethereum';
import EthereumClient from '@web3modal/ethereum';
import { configureChains, createClient } from 'wagmi';
import {
  arbitrum,
  mainnet,
  polygon,
  polygonMumbai,
  goerli,
  arbitrumGoerli,
  bsc,
} from '@wagmi/chains';

const chains = [
  arbitrum,
  mainnet,
  polygon,
  polygonMumbai,
  goerli,
  arbitrumGoerli,
  bsc,
];

console.info('pid', process.env.REACT_APP_WEB3_PROJECT_ID);

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: process.env.REACT_APP_WEB3_PROJECT_ID }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'Go', chains }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

export { wagmiClient, ethereumClient, chains };
