import React from 'react';
import { Outlet } from 'react-router-dom';
import { wagmiClient, ethereumClient }  from './components/config/wagmiClient';
import { WagmiConfig } from 'wagmi';
import { Web3Modal } from '@web3modal/react';
import ExchangeHeader from './screens/ExchangeHeader'

export default function Layout() {
  console.info('web3 id', import.meta.env.VITE_WEB3_PROJECT_ID);
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <section className="relative z-20">

          <ExchangeHeader />
        </section>
        <Outlet />
      </WagmiConfig>

      <Web3Modal
        projectId={import.meta.env.VITE_WEB3_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
