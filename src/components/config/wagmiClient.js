import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { useEffect, useState } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  mainnet,
  optimism,
  polygon,
  aurora,
  polygonMumbai,
  goerli,
  // arbitrumGoerli,
} from 'wagmi/chains';
// import '../styles.css';
// import './wagmiStyleswagmiStyles.css';

// 1. Get projectID at https://cloud.walletconnect.com
if (!import.meta.env.VITE_WEB3_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable');
}
const projectId = import.meta.env.VITE_WEB3_PROJECT_ID;

// 2. Configure wagmi client
const chains = [
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  bsc,
  optimism,
  fantom,
  aurora,
];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 2, chains, projectId }),
  provider,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export { wagmiClient, ethereumClient, chains };
