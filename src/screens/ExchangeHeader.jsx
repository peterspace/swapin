import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Web3Button } from '@web3modal/react';
import { useAccount, useNetwork } from 'wagmi';
import { useDisconnect } from 'wagmi';
import { networksOptions } from '../constants';

const ExchangeHeader = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [sticky, setSticky] = useState(false);
  const { disconnect } = useDisconnect();

  const [activeNetwork, setActiveNetwork] = useState();

  useEffect(() => {
    updateNetwork();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  async function updateNetwork() {
    for (let i = 0; i < networksOptions.length; i++) {
      if (networksOptions[i]?.id === chain?.id) {
        setActiveNetwork(networksOptions[i]);
      }
    }
  }

  // function copyToClipboard() {
  //   if (isConnected) {
  //     navigator.clipboard.writeText(address);
  //   }
  // }

  const showNavigation = () => (
    <nav className="flex flex-row items-center">
      <div className="ml-4 w-[32px] h-[32px]">
        <Link to="/">
          <span className="text-2xl text-white">Horiza</span>
        </Link>
      </div>

      <div className="mx-6 py-1 w-full flex flex-row justify-center items-center text-sm text-gray-300"></div>
    </nav>
  );

  return (
    <header
      id="header"
      className={`z-20 h-[50px] flex w-full items-center font-poppins ${
        sticky
          ? 'sticky top-0 transition-all duration-300 bg-black bg-opacity-80 filter backdrop-blur-md backdrop-saturate-200'
          : 'bg-black'
      }`}
    >
      <div>{showNavigation()}</div>
      <div className="mx-6 flex w-full justify-end gap-2">
        <div className="flex flex-row gap-2 items-center">
          {chain ? (
            <div
              className="px-2.5 py-1.5 rounded-lg cursor-pointer 
        active:bg-black text-primaryText bg-primaryFill
     outline outline-secondaryFillLight hover:outline-secondaryText shadow-lg ml-2"
            >
              {activeNetwork?.chainSymbol}
            </div>
          ) : null}
        </div>

        <div className="flex flex-row gap-2 items-center">
          {isConnected === true && (
            <button
              className="px-2.5 py-1.5 rounded-lg cursor-pointer 
          active:bg-black text-primaryText bg-primaryFill
       outline outline-secondaryFillLight hover:outline-secondaryText shadow-lg ml-2"
              // onClick={address === undefined ? null : copyToClipboard()}
            >
              {address.substring(0, 10) + '...'}
            </button>
          )}
        </div>
        <div className="flex flex-row gap-2 items-center">
          {isConnected ? (
            <button
              className="px-4 py-1 success-hover rounded-md bg-blue-500 cursor-pointer text-gray-200 hover:bg-blue-700"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          ) : (
            <Web3Button />
          )}
        </div>
      </div>
    </header>
  );
};

export default ExchangeHeader;
