import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BiDownArrowAlt } from 'react-icons/bi';
import { MdLocalGasStation } from 'react-icons/md';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { FaDotCircle } from 'react-icons/fa';
import Modal from './Modal';
import { ethers } from 'ethers';
import { networksOptions } from '../../constants';

import { formatUnits, parseUnits } from '@ethersproject/units';

//=============={Using wallet Connect}======================
import { useAccount, useSwitchNetwork, useSigner, useBalance } from 'wagmi';
import erc20ABI from '../engine/erc20.json';

import { useDispatch, useSelector } from 'react-redux';

//======================================={OLD BLOCK ENDS}===============================================
//======================================={OLD BLOCK ENDS}===============================================
//======================================={OLD BLOCK ENDS}===============================================

import TokenComponent from './TokenComponent';
import FavoriteTokenComponent from './FavoriteTokenComponent';
import TokenListButton from './TokenListButton';
import ActiveTokenComponent from './ActiveTokenComponent';
import ActiveChainComponent from './ActiveChainComponent';
import {
  getFromUSDPrice,
  getToUSDPrice,
  getPriceCompare,
  resetState,
  getChainUSDPrice,
  connectedChainInfo,
} from '../../redux/features/swap/swapSlice';

const slippages = ['0.1', '0.5', '1', '1.5', '2', '3'];
const style = {
  parentBgColor: `bg-sky-900/10`,
  swapBorderColor: `border-4 border-[#030a1d]`,
  inputSectionColor: `bg-primary`,
  inputSection: `h-[60px] flex flex-row items-center rounded-2xl transition-all duration-500
        outline-none focus-within:outline-1 focus-within:outline-sky-600`,
  input:
    'pl-4 h-full w-[70%] font-leaner font-bold text-4xl outline-none text-gray-400 bg-transparent selection:bg-sky-400/40 selection:text-white',
};

const receiversWallet = ['my wallet', 'new wallet']; //
const FrameSwapConnect = () => {
  const dispatch = useDispatch();
  const fromPriceData = useSelector((state) => state?.swap?.swapFromUSDPrice);
  //console.log({ ReduxFromPriceData: fromPriceData });
  // console.log({fromPriceData: fromPriceData})
  const toPriceData = useSelector((state) => state?.swap?.swapToUSDPrice);
  //console.log({ ReduxToPriceData: toPriceData });

  const exchangeRateData = useSelector(
    (state) => state?.swap?.swapExchangeRate
  );
  //console.log({ ReduxExchangeRate: exchangeRateData });

  const chainPriceData = useSelector((state) => state?.swap?.swapChainUSDPrice);
  //console.log({ ReduxChainPriceData: chainPriceData });

  //======================================={OLD BLOCK BEGINS}===============================================
  //======================================={OLD BLOCK BEGINS}===============================================
  //======================================={OLD BLOCK BEGINS}===============================================

  const signer = useSigner();
  const { address, isConnected } = useAccount();
  const walletAddress = address;
  const { switchNetwork } = useSwitchNetwork();

  const [swapRoutes, setSwapRoutes] = useState([]);
  const [activeProtocols, setActiveProtocols] = useState([]);
  // const [protocols, setProtocols] = useState('');
  const [protocols, setProtocols] = useState('');
  console.log({ protocols: protocols });
  const [validationOwner, setValidationOwner] = useState(false);
  const [validationReceiver, setValidationReceiver] = useState(false);
  //========={Tokens}===============================
  const [allTokens, setAllTokens] = useState();
  const [fValue, setFromValue] = useState(0.0);
  const [tValue, setToValue] = useState(0.0);
  const [tValueFormatted, setToValueFormatted] = useState(0.0);
  //console.log({ tValueFormatted: tValueFormatted });
  //console.log({ tValueFormattedType: typeof tValueFormatted });

  //const { data, isLoading, error, refetch } = useTransaction({ hash })

  const [isCalculating, setIsCalculating] = useState(false);
  const [fToken, setFromToken] = useState();
  // console.log({ fToken: fToken });
  const [tToken, setToToken] = useState();
  const [isFromCurrencyModalVisible, setIsFromCurrencyModalVisible] =
    useState(false);
  const [isToCurrencyModalVisible, setIsToCurrencyModalVisible] =
    useState(false);
  const [filteredfTokens, setFilteredfTokens] = useState();
  const [filteredtTokens, setFilteredtTokens] = useState();
  const [estimatedGas, setEstimatedGas] = useState(0);
  const [validatedValue, setValidatedValue] = useState(0.0);

  const [receiver, setReceiver] = useState('');
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [slippage, setSlippage] = useState(slippages[1]); // default slippage is 0.5% // meaning the user will loss  0.5 percent of their asset if you cancel a transaction
  const [toAnotherWallet, setToAnotherWallet] = useState(false); // true or false state
  //console.log({ toAnotherWallet: toAnotherWallet });
  const [swapStatus, setSwapStatus] = useState({ status: '', message: '' });
  // console.log({ receiver: receiver });

  let axiosCancelToken = useRef(null);

  const [receiverWallet, setReceiverWallet] = useState(receiversWallet[0]);

  //====================={Prices}===============================
  const [fPrice, setFromPrice] = useState('');
  const [tPrice, setToPrice] = useState('');

  const [fTotalPrice, setTotalFromPrice] = useState(0.0);
  const [fTotalPriceEth, setTotalFromPriceEth] = useState(0.0);
  const [tTotalPrice, setToTotalPrice] = useState(0.0);
  const [favoriteTokens, setFavoriteTokens] = useState([]);
  const [favoriteTokensTwo, setFavoriteTokensTwo] = useState([]);
  const [favoriteToken1, setFavoriteToken1] = useState({});
  const [favoriteToken2, setFavoriteToken2] = useState({});
  const [favoriteToken3, setFavoriteToken3] = useState({});
  const [favoriteToken4, setFavoriteToken4] = useState({});
  const [favoriteToken5, setFavoriteToken5] = useState({});
  const [favoriteToken6, setFavoriteToken6] = useState({});
  const [favoriteToken7, setFavoriteToken7] = useState({});
  const [favoriteToken8, setFavoriteToken8] = useState({});
  const [swapPriceInfo, setswapPriceInfo] = useState();

  const [chain, setChain] = useState(networksOptions[0]);
  const [chainId, setChainId] = useState(networksOptions[0]?.id);
  const [isChainModalVisible, setIsChainModalVisible] = useState(false);
  const [isChainChange, setIsChainChange] = useState(false);
  const [balance, setBalance] = useState('');

  //==========={Connection}=============
  // const [isConnected, setIsConnected] = useState(true);
  const [isCaution, setIsCaution] = useState(false);
  //==========={Connection}=============
  const [isCustom, setIsCustom] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isLowSlippage, setIsLowSlippage] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [fromBalance, setFromBalance] = useState('');
  // console.log('fromBalance:', fromBalance);
  const [toBalance, setToBalance] = useState('');
  // console.log('toBalance:', toBalance);
  const [totalCost, setTotalCost] = useState();
  // console.log({ totalCost: totalCost });
  const [spender, setSpender] = useState();
  //==========={Favorite List}=============
  const [token, setToken] = useState();

  const { data } = useBalance({
    address: walletAddress,
    chainId: chain?.id,
    watch: true,
  });

  const [swapFullData, setSwapFullData] = useState(); //Rate: To From/ USD
  // console.log({ swapFullData: swapFullData });

  const [isApproved, setIsApproved] = useState(false);
  const [networksUSDBalance, setNetworksUSDBalance] = useState(0.0);
  const [isNetworkBalance, setIsNetworkBalance] = useState(false);

  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);

  const fee = import.meta.env.VITE_SWAP_FEE;
  const dexAddress = import.meta.env.VITE_DEX_ADDRESS;

  // =========={swap readyness}=========================================

  // const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [info, setInfo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [usdtToken, setUsdtToken] = useState();

  const [isTransactionMessage, setIsTransactionMessage] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');

  const [isApproval, setIsApproval] = useState();

  //console.log({ trasanctionGas: trasanctionGas });

  // const gasGweiForm = parseFloat(formatUnits(estimatedGas, 'gwei'));
  // console.log({ gasGweiForm: gasGweiForm });

  // const gasEthForm = parseFloat(formatUnits(estimatedGas, 'ether'));
  // console.log({ gasEthForm: gasEthForm });

  // console.log({ usdtToken: usdtToken });

  // =========={swap readyness}=========================================

  useEffect(() => {
    if (isProcessing === true) {
      setTimeout(() => {
        setIsProcessing(false);
      }, 10000);
    }
  });

  useEffect(() => {
    if (isConnected) {
      const tokenbal = Number(data?.formatted).toFixed(3);
      setBalance(tokenbal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, balance, isConnected]);

  useEffect(() => {
    fetchSpender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spender, chainId]);

  async function fetchSpender() {
    const getSpender = await axios.get(
      `https://api.1inch.io/v5.0/${chainId}/approve/spender`
    );

    if (getSpender.data) {
      setSpender(getSpender.data.address);
    }
  }
  //================={Slippage controller}===============
  useEffect(() => {
    let slippageValue = Number(slippage);
    if (slippage !== null && slippageValue > 0 && slippageValue < 0.09) {
      setIsLowSlippage(true);
    }

    if (slippageValue > 3) {
      setIsWarning(true);
    }

    if (slippage !== null && slippageValue > 0.09 && slippageValue <= 3) {
      setIsLowSlippage(false);
      setIsWarning(false);
    }

    if (slippage === null || undefined) {
      setIsLowSlippage(false);
      setIsWarning(false);
    }
    if (slippage === '') {
      setIsLowSlippage(false);
      setIsWarning(false);
    }
  }, [slippage, isWarning, isLowSlippage]);

  //================={Get Liquidity providers}===============

  async function fetchChainData() {
    axios
      .get(`https://api.1inch.io/v5.0/${chainId}/tokens`)
      .then((response) => {
        let allTokenKeys = Object.keys(response.data.tokens);
        let allTs = allTokenKeys.map((key) => response.data.tokens[key]);
        setAllTokens(allTs);
      });
  }

  useEffect(() => {
    fetchChainData();
    if (isChainChange === true) {
      setTimeout(() => {
        fetchChainData();
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  //=====================================================================================

  // fetch favoriteTokenList
  useEffect(() => {
    if (allTokens !== null || undefined) {
      getFavorites();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokens]);

  async function getFavorites() {
    // await Promise?.allSettled?(
    allTokens?.map(async (b) => {
      // let favoriteList = [];
      // if (b.address === fromToken.address) {
      if (b.symbol === 'WBTC') {
        setFavoriteToken1(b);
      }
      if (b.symbol === 'USDC') {
        setFavoriteToken2(b);
      }
      // if (b.symbol === 'TONCOIN') {
      //   setFavoriteToken3(b);
      // }

      if (b.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        setFavoriteToken3(b);
      }
      if (b.symbol === 'USDT') {
        setFavoriteToken4(b);
      }
      if (b.symbol === 'BUSD') {
        setFavoriteToken5(b);
      }
      if (b.symbol === 'MATIC') {
        setFavoriteToken6(b);
      }
      if (b.symbol === 'DAI') {
        setFavoriteToken7(b);
      }
      if (b.symbol === 'UNI') {
        setFavoriteToken8(b);
      }
    });
    // )
  }

  useEffect(() => {
    if (allTokens !== null || undefined) {
      let newTokens = [];
      let newTokensTwo = [];

      newTokens.push(
        favoriteToken1,
        favoriteToken2,
        favoriteToken3,
        favoriteToken4
      );

      newTokensTwo.push(
        favoriteToken5,
        favoriteToken6,
        favoriteToken7,
        favoriteToken8
      );
      console.log({ newTokensOnly: newTokens });
      setFavoriteTokens(newTokens);

      setFavoriteTokensTwo(newTokensTwo);
    }
  }, [
    allTokens,
    favoriteToken1,
    favoriteToken2,
    favoriteToken3,
    favoriteToken4,
    favoriteToken5,
    favoriteToken6,
    favoriteToken7,
    favoriteToken8,
  ]);

  //==============={useEffect Blocks}=================================

  useEffect(() => {
    if (allTokens !== undefined) {
      setFromToken(allTokens[0]);
      setToToken(allTokens[1]);
      setSlippage(slippages[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokens]);

  useEffect(() => {
    fToken !== undefined && filterFTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken]);

  useEffect(() => {
    tToken !== undefined && filterTTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken]);

  useEffect(() => {
    setIsCalculating(true); // show calculating

    fValue !== 0 && getPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken, fValue, slippage]);

  useEffect(() => {
    updateProtocols();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProtocols]); //======================================={OLD BLOCK BEGINS}===============================================

  function filterFTokens() {
    let filteredFTokens = allTokens.filter((filter) => {
      return filter.symbol.toLowerCase() !== tToken.symbol.toLowerCase();
    });
    setFilteredfTokens(filteredFTokens);
  }

  function filterTTokens() {
    let filteredTTokens = allTokens.filter((filter) => {
      return filter.symbol.toLowerCase() !== fToken.symbol.toLowerCase();
    });
    setFilteredtTokens(filteredTTokens);
  }

  function onFromValueChanged(e) {
    if (e.target.validity.valid) {
      setToValue(0);
      setFromValue(e.target.value);

      let parsed = parseUnits(e.target.value, fToken?.decimals.toString());
      // eslint-disable-next-line no-undef
      let validBigNumber = BigInt(parsed).toString();
      setValidatedValue(validBigNumber);
    }
  }

  async function getPrice() {
    setSwapStatus({ status: 'inprogress', message: 'Calculating' });

    if (fValue === '0' || Number(fValue) === 0 || fValue.length <= 0) {
      //* since fValue is a string
      setToValue(0);
      setSwapRoutes([]);
      setSwapStatus({ status: '', message: '' });

      return;
    }

    if (axiosCancelToken.current) {
      axiosCancelToken.current.cancel();
      console.warn('request cancelled');
    }

    axiosCancelToken.current = axios.CancelToken.source();

    if (!fToken?.address || !tToken?.address || !fValue || !fee) {
      console.log('Please fill in the required fields');
    }

    if (fToken?.address !== undefined || null) {
      try {
        // axios.get(`https://api.1inch.io/v4.0/1/quote?fromTokenAddress=${fToken?.address}&toTokenAddress=${tToken?.address}&amount=${validatedValue}&fee=${fee}&slippage=${slippage}`).then((response)=>{
        axios
          .get(
            `https://api.1inch.exchange/v5.0/${chainId}/quote?fromTokenAddress=${fToken?.address}&toTokenAddress=${tToken?.address}&amount=${validatedValue}&fee=${fee}&gasLimit=3000000`,
            // `https://api.1inch.io/v5.0/${chainId}/quote?fromTokenAddress=${fToken?.address}&toTokenAddress=${tToken?.address}&amount=${validatedValue}&fee=${fee}&slippage=${slippage}`,
            { cancelToken: axiosCancelToken.current.token }
          )
          .then((response) => {
            // setQoute(response.data);
            // // qoute?.protocols?.[0].map((route)=>console.info('route',route[0].name))
            //* routing display
            let routes = [];
            response.data?.protocols?.[0].forEach((route) => {
              routes.push(route);
              // console.log('rr',route)
            });
            setswapPriceInfo(response);
            setSwapRoutes(routes); // send the routes to the SwapRoute component through Layout

            //================{SET AUTOMATIC PROTOCOL}===================
            if (routes.length > 0) {
              console.info({ aroute: routes[0] });
              let newRoute = routes[0];

              let autoRoute = newRoute?.map((l) => {
                const activeRoute = l.name;
                return activeRoute;
              });
              let pRoute = autoRoute.toString();
              setProtocols(pRoute);
            }

            // console.info('swapQouteData', response.data);
            let rawValue = response.data.toTokenAmount;
            //    let value = rawValue.toFixed(4);
            // eslint-disable-next-line no-undef
            let value = rawValue / 10 ** tToken.decimals;
            let valueFormatted = value.toString();

            let newValue = Number(valueFormatted).toFixed(3);
            setToValue(newValue);

            setToValueFormatted(newValue);

            let gas = response.data.estimatedGas;
            setEstimatedGas(gas);
          })
          .catch((error) => {
            console.log({ estimateError: error });
          });
        setIsCalculating(false); // show calculating
      } catch (error) {
        setIsCalculating(false); // show calculating

        // console.log(error);
      }
    }

    setTimeout(() => {
      axiosCancelToken.current = null;
    }, 1500);
  }

  useEffect(() => {
    if (allTokens !== null || undefined) {
      getUsdtToken();
      console.log({ usdtToken: usdtToken });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokens, chainId]);

  async function getUsdtToken() {
    // await Promise?.allSettled?(
    allTokens?.map(async (b) => {
      if (b.symbol === 'USDT') {
        setUsdtToken(b);
        // console.log({usdtToken: usdtToken})
      }
    });
  }

  /*
 ====================================================================
        The Swap function
 ====================================================================
*/

  /*
 ====================================================================
        Swap Owner
 ====================================================================
*/

  useEffect(() => {
    setTimeout(() => {
      validateSwapOwner();
      if (validationOwner === true) {
        setInfo('');
        setIsCaution(false);
      }
    }, 1000);
  });

  useEffect(() => {
    setTimeout(() => {
      if (toAnotherWallet) {
        validateSwapReceiver();
        if (validationReceiver === true) {
          setInfo('');
          setIsCaution(false);
        }
      }
    }, 1000);
  });

  useEffect(() => {
    resetProtocolsValidation();
  }, [fValue, fToken, tToken, chainId]);

  async function resetProtocolsValidation() {
    setProtocols('');
    setInfo('No routes available');
    setIsCaution(true);

    setValidationOwner(false);
  }

  useEffect(() => {
    setTimeout(() => {
      validateSwapOwner();
      if (fromBalance <= fValue) {
        setValidationOwner(false);
        setInfo('Insufficient token balance');
        setIsCaution(true);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue, fToken, tToken, chainId, protocols, fromBalance]);

  async function validateSwapOwner() {
    setValidationOwner(false);

    if (!walletAddress) {
      setInfo('Wallet not connected');
      setIsCaution(true);

      setValidationOwner(false);
    } else if (!fValue) {
      setInfo('Please enter amount');
      setIsCaution(true);

      setValidationOwner(false);
    } else if (balance <= 0) {
      setInfo('Insufficient funds to cover gas fees');
      setIsCaution(true);

      setValidationOwner(false);
    } else if (fromBalance <= fValue) {
      setInfo('Insufficient token balance');
      setIsCaution(true);

      setValidationOwner(false);
    } else if (!protocols) {
      setInfo('No routes available');
      setIsCaution(true);

      setValidationOwner(false);
    } else {
      setValidationOwner(true);
    }
  }

  // send for approval from backend
  async function approve() {
    setTransactionMessage('Approval in progress...');
    setIsTransactionMessage(true);
    setTimeout(() => {
      setIsTransactionMessage(false);
    }, 5000);

    setIsProcessing(true);
    try {
      const response = await axios.get(
        `https://api.1inch.exchange/v5.0/${chainId}/approve/transaction?tokenAddress=${fToken?.address}&amount=${validatedValue}`
      );
      if (response.data) {
        let tx = response.data;

        let wallet = signer.data;
        const approval = wallet.sendTransaction(tx);
        console.log({ approvalReward: approval });

        await approval.wait();
        setIsProcessing(false);
        return approval;
        // console.log({ approvalData: approval });
        // if (approval) {
        //   setIsProcessing(false);
        //   return approval;
        // } else {
        //   console.log({
        //     message: 'Network error',
        //   });
        // code: -32000
        // message: "gas required exceeds allowance (15000000)"

        // code: -32603
        // message: "transaction will cause overdraft"

        // code:  4001
        // message :  "MetaMask Tx Signature: User denied transaction signature."
      }
    } catch (error) {
      console.log(error);
      setTransactionMessage(error?.message);
      setTransactionMessage(error?.data?.message);
      setIsTransactionMessage(true);
      console.log({ ApproveError: error });
    }
  }

  // isApproval

  useEffect(() => {
    if (
      fToken?.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' ||
      fToken?.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    ) {
      setIsApproval(false);
    } else {
      setIsApproval(true);
    }
  }, [fToken?.address]);

  //ethers js
  //====================================================

  async function swapOwner() {
    if (validationOwner === true) {
      setIsProcessing(true);
      try {
        setTransactionMessage(
          'Please hold while your transaction is in progress'
        );
        setIsTransactionMessage(true);
        setTimeout(() => {
          setIsTransactionMessage(false);
        }, 5000);
        const response = await axios.get(
          `https://api.1inch.io/v5.0/${chainId}/swap?fromTokenAddress=${fToken?.address}&toTokenAddress=${tToken?.address}&amount=${validatedValue}&fromAddress=${walletAddress}&slippage=${slippage}&protocols=${protocols}&referrerAddress=${dexAddress}&fee=${fee}&disableEstimate=true&allowPartialFill=false&gasLimit=3000000`
        );

        if (response?.data) {
          let tx = {
            data: response.data.tx.data,
            from: response.data.tx.from,
            gasLimit: estimatedGas,
            gasPrice: response.data.tx.gasPrice,
            to: response.data.tx.to,
            value: response.data.tx.value,
          };

          let wallet = signer.data;
          const swapReward = wallet.sendTransaction(tx);

          console.log({ swapReward: swapReward });

          if (swapReward.hash) {
            setIsProcessing(false);
            setIsSuccess(true);
            setTransactionMessage('Swap successful');
            setIsTransactionMessage(true);
            setTimeout(() => {
              setIsTransactionMessage(false);
            }, 5000);
          }
        }
        setIsProcessing(false);
      } catch (error) {
        console.log(error);
        setTransactionMessage('Swap unsuccessful');
        setIsTransactionMessage(true);
        setTimeout(() => {
          setIsTransactionMessage(false);
        }, 5000);
        setIsProcessing(false);
      }
    }
  }

  /*
 ====================================================================
        Swap Receiver
 ====================================================================
*/

  async function validateSwapReceiver() {
    setValidationReceiver(false);

    if (!walletAddress) {
      setInfo('Wallet not connected');
      setIsCaution(true);

      setValidationReceiver(false);
    } else if (!fValue) {
      setInfo('Please enter amount');
      setIsCaution(true);

      setValidationReceiver(false);
    } else if (balance <= 0) {
      setInfo('Insufficient funds to cover gas fees');
      setIsCaution(true);

      setValidationReceiver(false);
    } else if (fromBalance <= fValue) {
      setInfo('Insufficient token balance');
      setIsCaution(true);

      setValidationReceiver(false);
    } else if (!protocols) {
      setInfo('No routes available');
      setIsCaution(true);

      setValidationReceiver(false);
      if (!receiver) {
        setInfo("please enter the receiver's address");
        setIsCaution(true);

        setValidationReceiver(false);
      }
    } else {
      setValidationReceiver(true);
    }
  }

  async function swapReceiver() {
    if (validationReceiver === true) {
      setIsProcessing(true);
      try {
        setTransactionMessage(
          'Please hold while your transaction is in progress'
        );
        setIsTransactionMessage(true);
        setTimeout(() => {
          setIsTransactionMessage(false);
        }, 5000);
        const response = await axios.get(
          `https://api.1inch.io/v5.0/${chainId}/swap?fromTokenAddress=${fToken?.address}&toTokenAddress=${tToken?.address}&amount=${validatedValue}&fromTokenAddress=${walletAddress}&slippage=${slippage}&protocols=${protocols}&destReceiver=${receiver}&referrerAddress=${dexAddress}&fee=${fee}&disableEstimate=true&allowPartialFill=false&gasLimit=3000000`
        );

        if (response?.data) {
          let tx = {
            data: response.data.tx.data,
            from: response.data.tx.from,
            gasLimit: estimatedGas,
            gasPrice: response.data.tx.gasPrice,
            to: response.data.tx.to,
            value: response.data.tx.value,
          };

          let wallet = signer.data;
          const swapReward = wallet.sendTransaction(tx);

          console.log({ swapReward: swapReward });

          if (swapReward.hash) {
            setIsProcessing(false);
            setSuccessMessage('Swap successful');
            setIsSuccess(true);
          }
        }
      } catch (error) {
        console.log(error);
        setTransactionMessage('Swap unsuccessful');
        setIsTransactionMessage(true);
        setTimeout(() => {
          setIsTransactionMessage(false);
        }, 5000);
        setIsProcessing(false);
      }
    }
  }

  function swapValues() {
    let tmpToken = fToken;
    setFromToken(tToken);
    setToToken(tmpToken);
  }

  //================={updateProtocols}===============

  async function updateProtocols() {
    if (activeProtocols.length >= 1) {
      let protocolsList = [];

      for (let i = 0; i < activeProtocols.length; i++) {
        let name = activeProtocols[i].name;
        protocolsList.push(name);
      }

      console.log({ protocolsList: protocolsList });

      const formattedProtocols = protocolsList.toString();
      console.log({ formattedProtocols: formattedProtocols });
      setProtocols(formattedProtocols); // Selected Protocols
    }
  }

  useEffect(() => {
    if (isConnected) {
      fTokenBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, fromBalance]);

  useEffect(() => {
    if (isConnected) {
      tTokenBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken, toBalance]);

  useEffect(() => {
    if (isConnected) {
      setTimeout(() => {
        fTokenBalance();
      }, 6000); // production 2000
    }
  }, [fToken, fromBalance]);

  useEffect(() => {
    if (isConnected) {
      setTimeout(() => {
        tTokenBalance();
      }, 6000); // production 2000
    }
  }, [tToken, toBalance]);

  async function fTokenBalance() {
    let tokenAddress = fToken?.address;
    if (tokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      setFromBalance(balance);
    } else {
      const ERC20Contract = new ethers.Contract(
        tokenAddress,
        erc20ABI,
        signer.data
      );
      const tokenbal = await ERC20Contract.balanceOf(walletAddress);
      const balanceRaw = formatUnits(tokenbal, fToken?.decimals);
      if (Number(balanceRaw) > 0) {
        const formattedBalance = Number(balanceRaw).toFixed(5);
        setFromBalance(formattedBalance);
      } else {
        setFromBalance('0.0');
      }
    }
  }

  async function tTokenBalance() {
    let tokenAddress = tToken?.address;
    if (tokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      setToBalance(balance);
    } else {
      const ERC20Contract = new ethers.Contract(
        tokenAddress,
        erc20ABI,
        signer.data
      );
      const tokenbal = await ERC20Contract.balanceOf(walletAddress);
      const balanceRaw = formatUnits(tokenbal, tToken?.decimals);
      if (Number(balanceRaw) > 0) {
        const formattedBalance = Number(balanceRaw).toFixed(5);
        setToBalance(formattedBalance);
      } else {
        setToBalance('0.0');
        // return;
      }
    }
  }

  //======================================={USD Value Converter}===============================================
  //======================================={USD Value Converter}===============================================

  useEffect(() => {
    if (isChainChange === true) {
      dispatch(resetState());
      setIsChainChange(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, fToken, fValue, dispatch]);

  //======={FROM TOKEN}=================
  useEffect(() => {
    if (isChainChange === false) {
      let userData = { chainId, fToken, fValue, usdtToken };
      dispatch(getFromUSDPrice(userData));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, fToken, fValue, dispatch]);
  //======={TO TOKEN}=================
  useEffect(() => {
    if (isChainChange === false) {
      let userData = { chainId, tToken, tValue, usdtToken };
      dispatch(getToUSDPrice(userData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, tToken, tValue, dispatch]);
  //======={EXCHANGE RATE}=================
  useEffect(() => {
    if (isChainChange === false) {
      let userData = { chainId, fToken, tToken };
      dispatch(getPriceCompare(userData));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, fToken, tToken, tValue, dispatch]);

  //======={CHAIN}=================
  useEffect(() => {
    if (isChainChange === false) {
      let userData = { chainId, chainBalance: balance, usdtToken };
      dispatch(getChainUSDPrice(userData));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, balance, dispatch]);

  // function copyToClipboard() {
  //   if (isConnected) {
  //     navigator.clipboard.writeText(address);

  //   }
  // }

  return (
    <div className="flex flex-col justify-center items-center gap-2 mb-8">
      <div className="w-[480px] px-2 py-2 border border-secondaryFillLight rounded-xl bg-primaryFill shadow-lg mb-8">
        {/* Title:Select a Token */}

        {/* Settings */}
        <section className="mt-4 ml-4 mr-4">
          {/* Select a Chain Button */}
          <div className="flex flex-row justify-between items-center">
            <div className="flex justify-end items-end">
              <span className="text-xl text-primaryText mr-4 mt-2 mb-2">
                Swap
              </span>
            </div>
            <div className="flex gap-1">
              <button
                className="px-2.5 py-1 rounded-lg cursor-pointer 
                active:bg-black text-primaryText bg-primaryFill
             outline outline-secondaryFillLight hover:outline-secondaryText hover:scale-110 ease-in duration-200 shadow-md shadow-infoText/20"
                onClick={() => setIsChainModalVisible(true)}
              >
                Chain
              </button>
              <div>
                {/* Select a Slippage */}
                <div
                  className=" justify-start items-start px-1.5 py-1.5 hover:rounded-full hover:bg-gray-200"
                  onClick={() => setIsSettingsVisible(!isSettingsVisible)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 stroke-secondaryText active:fill-infoText hover:stroke-black"
                  >
                    <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  </svg>
                </div>
              </div>
              <div>
                {/* Select a Profile */}
                <div
                  className=" justify-start items-start px-1.5 py-1.5 hover:rounded-full hover:bg-gray-200"
                  onClick={() => {
                    setIsNetworkBalance(true);
                    setIsProfileVisible(!isProfileVisible);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 stroke-secondaryText active:fill-infoText hover:stroke-black"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="border-b border-secondaryFill m-1 mb-2"></div>
        {/* Select From Token*/}
        <section className="bg-primaryFill rounded-2xl w-[432px] h-[210px] py-4 mt-2 ml-4 mr-4">
          {/* select From Token list section */}
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="flex justify-start items-start ml-4 mr-4">
                <span className="text-xl text-primaryText">Sell</span>
              </div>

              <div className="flex flex-row justify-between items-center">
                <div
                  className="flex flex-row justify-start w-[25%] rounded-lg bg-secondaryFill items-start mb-8 mt-4 ml-4 mr-4"
                  onClick={() => setIsFromCurrencyModalVisible(true)}
                >
                  <div className="px-3 py-2 w-full flex flex-row gap-2 cursor-pointer hover:text-infoText hover:shadow-md rounded-lg hover:bg-secondaryFill">
                    <TokenListButton
                      selectedTokenName={fToken?.symbol}
                      modalVisible={isFromCurrencyModalVisible}
                      toggleModal={setIsFromCurrencyModalVisible}
                      selectedTokenIcon={fToken?.logoURI}
                    />
                    <span className="justify-start items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-3 h-3 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="flex flex-row text-secondaryText text-sm mr-4">
                  <span>
                    Balance: {fromBalance || ''} {fToken?.symbol}
                  </span>
                </div>
              </div>
            </div>

            {/* enter from token value */}
            <div className="flex flex-col ml-4 mr-4">
              {/* <span className="text-3xl font-bold text-primaryText">{`1.567904`}</span> */}
              <span className="text-3xl font-bold text-primaryText">
                <input
                  type="text"
                  className={style.input}
                  pattern="[0-9]*.[0-9]*"
                  placeholder="0.0"
                  value={fValue}
                  onChange={onFromValueChanged}
                />
              </span>
              <span className="text-xs text-secondaryText">
                ~${fromPriceData ? fromPriceData?.fromPrice : ``}
              </span>
              <span className="text-xs text-secondaryText/50">
                ~${fromPriceData ? fromPriceData?.totalFromPrice : ``}
              </span>
            </div>
          </div>
        </section>
        {/* Title:Conversion */}
        <section className="mt-2 ml-4 mr-4">
          <div className="flex flex-row justify-between items-center">
            <div className="justify-start items-start px-1 py-1 rounded-lg bg-secondaryFill mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText ${
                  isProcessing && 'fill-infoText animate-spin'
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-row justify-center items-center w-[344px]">
              <span
                className="px-2.5 py-1.5 rounded-lg cursor-pointer 
                active:bg-black text-primaryText bg-primaryFill
             outline outline-secondaryFillLight shadow-md shadow-infoText/20"
              >{`1 ${fToken?.symbol} = ${
                exchangeRateData ? exchangeRateData?.exchangeRate : '---'
              }  ${tToken?.symbol}`}</span>
            </div>
            {/* switch token direction */}
            <div
              className={`mr-4 top-[40%] left-[50%] rounded-full text-2xl text-gray-400
                                    bg-[#0d2a43] ${style.swapBorderColor}
                                    cursor-pointer transition-transform duration-300 hover:scale-125 hover:rotate-180 hover:text-sky-400`}
              onClick={swapValues}
            >
              <BiDownArrowAlt />
            </div>
          </div>
        </section>

        {/* Select To Token*/}
        <section className="bg-primaryFill rounded-2xl w-[432px] h-[210px] py-4 mt-2 ml-4 mr-4">
          {/* select To Token list section */}
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="flex justify-start items-start ml-4 mr-4">
                <span className="text-xl text-primaryText">Buy</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div
                  className="flex flex-row justify-start w-[25%] rounded-lg bg-secondaryFill items-start mb-8 mt-4 ml-4 mr-4"
                  onClick={() => setIsToCurrencyModalVisible(true)}
                >
                  <div
                    className="px-3 py-2 w-full flex flex-row gap-2 cursor-pointer hover:text-infoText hover:shadow-md rounded-lg hover:bg-secondaryFill "
                    // onClick={() => {
                    //   setSelectedToken(currentItem);
                    // }}
                  >
                    <TokenListButton
                      selectedTokenName={tToken?.symbol}
                      modalVisible={isToCurrencyModalVisible}
                      toggleModal={setIsToCurrencyModalVisible}
                      selectedTokenIcon={tToken?.logoURI}
                    />
                    <span className="justify-start items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-3 h-3 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="flex flex-row text-secondaryText text-sm mr-4">
                  <span>
                    Balance: {toBalance || ''} {tToken?.symbol}
                  </span>
                </div>
              </div>
            </div>
            {/* view to token value */}
            <div className="flex flex-col ml-4 mr-4">
              {/* <span className="text-3xl font-bold text-primaryText">{`1.567904`}</span> */}
              <span className="text-3xl font-bold text-primaryText">
                <input
                  type="text"
                  className={style.input}
                  pattern="[0-9]*.[0-9]*"
                  placeholder="0.0"
                  value={tValue}
                  disabled={true}
                />
              </span>
              <span className="text-xs text-secondaryText">
                ~${toPriceData ? toPriceData?.toPrice : ``}
              </span>
              <span className="text-xs text-secondaryText/50">
                ~${toPriceData ? toPriceData?.totalToPrice : ``}
              </span>
            </div>
          </div>
        </section>

        {/* send to another wallet */}
        <section className="flex flex-row gap-2 justify-between items-center mt-2 ml-4 mr-4">
          <div className="flex flex-row gap-2 py-2">
            <span className="text-sm font-medium text-gray-200/50">
              Send to another wallet
            </span>
            <label
              htmlFor="to-another-wallet"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={toAnotherWallet}
                id="to-another-wallet"
                name="to-another-wallet"
                className="sr-only peer"
              />
              <div
                className="w-11 h-6 bg-gray-200/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"
                onClick={() => setToAnotherWallet((prev) => !prev)}
              ></div>
            </label>
          </div>

          {toAnotherWallet && (
            <div className="flex object-contain ml-2 ">
              <input
                type="text"
                className="ml-2 px-3 py-1.5 rounded-lg w-[150px] object-contain
                active:bg-black active:text-primaryText bg-transparent text-secondaryText
                border border-secondaryFillLight hover:border-secondaryText"
                placeholder="wallet address"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
              />
            </div>
          )}
        </section>

        {/* Conditional rendering of 4 functions on a single dependency "isConnect" */}

        {isConnected && !isCaution ? (
          <section className="flex flex-row gap-2 justify-center items-center button_gradient hover:opacity-90  rounded-2xl w-[432px] py-3 mt-4 ml-4 mr-4">
            {receiverWallet && receiverWallet === 'my wallet' ? (
              <>
                {' '}
                {validationOwner === true && (
                  <button
                    className="py-1 px-4 h-full w-full outline-none text-primaryText"
                    disabled={
                      //walletAddress.length <= 5 || fValue === 0 ? true : false
                      fValue === 0 ? true : false
                    }
                    onClick={() => setIsConfirmation(true)}
                  >
                    Swap
                  </button>
                )}
              </>
            ) : (
              <>
                {validationReceiver === true && toAnotherWallet === true && (
                  <button
                    className="py-1 px-4 h-full w-full outline-none text-primaryText"
                    disabled={
                      //walletAddress.length <= 5 || fValue === 0 ? true : false
                      fValue === 0 ? true : false
                    }
                    onClick={() => setIsConfirmation(true)}
                  >
                    Swap
                  </button>
                )}
              </>
            )}
          </section>
        ) : null}
        {/* Error Messages */}
        {isConnected && isCaution ? (
          <>
            <section className="flex flex-row gap-2 justify-center items-center button_gradient hover:opacity-90  rounded-2xl w-[432px] py-3 mt-4 ml-4 mr-4">
              {receiverWallet && receiverWallet === 'my wallet' ? (
                <button
                  className="py-1 px-4 h-full w-full outline-none text-primaryText"
                  disabled={
                    //walletAddress.length <= 5 || fValue === 0 ? true : false
                    fValue === 0 ? true : false
                  }
                  onClick={() => {
                    if (toAnotherWallet) {
                      setIsConfirmation(true);
                    } else {
                      setIsConfirmation(true);
                    }
                  }}
                >
                  Swap
                </button>
              ) : (
                <button
                  className="py-1 px-4 h-full w-full outline-none text-primaryText"
                  disabled={
                    //walletAddress.length <= 5 || fValue === 0 ? true : false
                    fValue === 0 ? true : false
                  }
                  onClick={() => setIsConfirmation(true)}
                >
                  Swap
                </button>
              )}
            </section>
            <section className="w-fit h-fit flex flex-col gap-2 text-infoText/50 mt-4 ml-4 mr-4">
              <div className="flex flex-row gap-2 justify-center items-center bg-infoFill rounded-xl w-[432px] py-4 outline">
                <div className="p-2 text-sm text-attentionText">{info}</div>
              </div>
            </section>
          </>
        ) : null}

        {/* Profile */}
        <Modal visible={isConfirmation}>
          <>
            {isApproval ? (
              <section className="flex flex-col justify-center items-center gap-2 mb-8">
                <div className="border border-secondaryFillLight rounded-xl bg-primaryFill">
                  {/* View Estimated Cost */}
                  <section className="w-fit h-fit flex flex-col gap-2 text-infoText/50">
                    <div className="flex flex-row gap-2 justify-center items-center bg-infoFill rounded-xl w-[432px] py-4 outline">
                      <div className="p-2 text-sm text-secondaryText flex flex-col">
                        <section className="flex flex-row  gap-[30px] mb-5 mt-4 ml-4 mr-4">
                          {/* Back Button*/}
                          <span
                            className="px-1 py-1 bg-secondaryFill rounded-lg cursor-pointer border border-transparent hover:scale-110 ease-in duration-200"
                            onClick={() => {
                              setIsConfirmation(false);
                              setValidationOwner(false);
                              setValidationReceiver(false);
                              // resetProtocolsValidation();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#FFFFFF"
                              className="w-5 h-5 stroke-secondaryText active:fill-infoText hover:stroke-infoText"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                              />
                            </svg>
                          </span>
                          <div className="text-primaryText text-lg w-[312px] h-[28px] flex justify-center items-center">
                            Confirmation
                          </div>
                        </section>
                        <div className="border-b border-infoText/20 m-1"></div>
                        <section className="overflow-y-auto max-h-[320px] mb-5 ml-4 mt-4 mr-4 flex flex-row justify-between items-center">
                          <div className="flex flex-row w-[312px] gap-2">
                            <span className="py-1 text-sm justify-start items-start text-primaryText">
                              Network
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <ActiveChainComponent currentItem={chain} />
                          </div>
                        </section>
                        <div className="border-b border-infoText/20 m-1"></div>
                        <section className="flex flex-col gap-1 text-primaryText/50 mb-4 mt-4 ml-4 mr-4">
                          <div className="flex justify-between">
                            <span className="py-1 text-sm justify-start items-start text-primaryText">
                              Send:
                            </span>
                            <span
                              className="px-2.5 py-1 cursor-pointer 
                    text-secondaryText"
                            >
                              {fValue ? fValue : 0} {fToken?.symbol}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="py-1 text-sm justify-start items-start text-primaryText">
                              Receive:
                            </span>
                            <span
                              className="px-2.5 py-1 cursor-pointer 
                    text-secondaryText"
                            >
                              {tValue ? tValueFormatted : 0} {tToken?.symbol}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <div className="">
                              <span className="py-1 text-sm justify-start items-start text-primaryText">
                                Gas
                              </span>
                              <span className="ml-1 py-1 text-sm justify-start items-start text-secondaryText">
                                (estimate)
                              </span>
                              <span className="ml-1 py-1 text-sm justify-start items-start text-primaryText">
                                :
                              </span>
                            </div>

                            <span
                              className="px-2.5 py-1 cursor-pointer 
                    text-secondaryText"
                            >
                              {estimatedGas ? estimatedGas / 10 ** 9 : null}{' '}
                              Gwei
                            </span>
                          </div>
                        </section>

                        <div className="border-b border-infoText/20 m-1"></div>
                        <section
                          className="overflow-y-auto py-4 max-h-[320px]  flex flex-row justify-between text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill hover:bg-infoFill
                  outline hover:outline-attentionText shadow-lg  w-[350px] mb-4 mt-8 ml-8 mr-4 hover:scale-105 ease-in duration-200 shadow-infoText/20"
                        >
                          <button
                            className="py-1 px-4 h-full w-full outline-none text-primaryText"
                            disabled={
                              //walletAddress.length <= 5 || fValue === 0 ? true : false
                              fValue === 0 ? true : false
                            }
                            onClick={() => {
                              approve();
                              // setIsConfirmation(false)
                            }}
                          >
                            Approve
                          </button>
                        </section>
                        <section
                          className="overflow-y-auto py-4 max-h-[320px]  flex flex-row justify-between text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill hover:bg-infoFill
                  outline hover:outline-attentionText shadow-lg  w-[350px] mb-8 mt-4 ml-8 mr-4 hover:scale-105 ease-in duration-200 shadow-infoText/20"
                        >
                          {receiverWallet && receiverWallet === 'my wallet' ? (
                            <button
                              className="py-1 px-4 h-full w-full outline-none text-primaryText"
                              disabled={
                                //walletAddress.length <= 5 || fValue === 0 ? true : false
                                fValue === 0 ? true : false
                              }
                              onClick={() => {
                                if (toAnotherWallet) {
                                  swapReceiver();
                                  // setIsConfirmation(false)
                                } else {
                                  swapOwner();
                                  // setIsConfirmation(false)
                                }
                              }}
                            >
                              Swap Now!
                            </button>
                          ) : (
                            <button
                              className="py-1 px-4 h-full w-full outline-none text-primaryText"
                              disabled={
                                //walletAddress.length <= 5 || fValue === 0 ? true : false
                                fValue === 0 ? true : false
                              }
                              onClick={() => {
                                swapReceiver();
                                // setIsConfirmation(false)
                              }}
                            >
                              Swap Now!
                            </button>
                          )}
                        </section>
                        <section
                          className="py-2 mb-2 ml-4 mr-4 flex flex-row text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill
                  shadow-lg"
                        >
                          <div className="text-xs flex flex-row justify-center items-center ml-4">
                            Please note that Gas prices are likely to change on
                            the network
                          </div>
                        </section>

                        {isTransactionMessage ? (
                          <section
                            className="py-2 mb-2 ml-4 mr-4 flex flex-row text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill
                  shadow-lg"
                          >
                            <div className="text-xs flex flex-row justify-center items-center ml-4">
                              {transactionMessage}
                            </div>
                          </section>
                        ) : null}
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            ) : (
              <section className="flex flex-col justify-center items-center gap-2 mb-8">
                <div className="border border-secondaryFillLight rounded-xl bg-primaryFill">
                  {/* View Estimated Cost */}
                  <section className="w-fit h-fit flex flex-col gap-2 text-infoText/50">
                    <div className="flex flex-row gap-2 justify-center items-center bg-infoFill rounded-xl w-[432px] py-4 outline">
                      <div className="p-2 text-sm text-secondaryText flex flex-col">
                        <section className="flex flex-row  gap-[30px] mb-5 mt-4 ml-4 mr-4">
                          {/* Back Button*/}
                          <span
                            className="px-1 py-1 bg-secondaryFill rounded-lg cursor-pointer border border-transparent hover:scale-110 ease-in duration-200"
                            onClick={() => {
                              setIsConfirmation(false);
                              setValidationOwner(false);
                              setValidationReceiver(false);
                              // resetProtocolsValidation();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#FFFFFF"
                              className="w-5 h-5 stroke-secondaryText active:fill-infoText hover:stroke-infoText"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                              />
                            </svg>
                          </span>
                          <div className="text-primaryText text-lg w-[312px] h-[28px] flex justify-center items-center">
                            Confirmation
                          </div>
                        </section>
                        <div className="border-b border-infoText/20 m-1"></div>
                        <section className="overflow-y-auto max-h-[320px] mb-5 ml-4 mt-4 mr-4 flex flex-row justify-between items-center">
                          <div className="flex flex-row w-[312px] gap-2">
                            <span className="py-1 text-sm justify-start items-start text-primaryText">
                              Network
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <ActiveChainComponent currentItem={chain} />
                          </div>
                        </section>
                        <div className="border-b border-infoText/20 m-1"></div>
                        <section className="flex flex-col gap-1 text-primaryText/50 mb-4 mt-4 ml-4 mr-4">
                          <div className="flex justify-between">
                            <span className="py-1 text-sm justify-start items-start text-primaryText">
                              Send:
                            </span>
                            <span
                              className="px-2.5 py-1 cursor-pointer 
                    text-secondaryText"
                            >
                              {fValue ? fValue : 0} {fToken?.symbol}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="py-1 text-sm justify-start items-start text-primaryText">
                              Receive:
                            </span>
                            <span
                              className="px-2.5 py-1 cursor-pointer 
                    text-secondaryText"
                            >
                              {tValue ? tValueFormatted : 0} {tToken?.symbol}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <div className="">
                              <span className="py-1 text-sm justify-start items-start text-primaryText">
                                Gas
                              </span>
                              <span className="ml-1 py-1 text-sm justify-start items-start text-secondaryText">
                                (estimate)
                              </span>
                              <span className="ml-1 py-1 text-sm justify-start items-start text-primaryText">
                                :
                              </span>
                            </div>

                            <span
                              className="px-2.5 py-1 cursor-pointer 
                    text-secondaryText"
                            >
                              {estimatedGas ? estimatedGas / 10 ** 9 : null}{' '}
                              Gwei
                            </span>
                          </div>
                        </section>

                        <div className="border-b border-infoText/20 m-1"></div>
                        <section
                          className="overflow-y-auto py-4 max-h-[320px]  flex flex-row justify-between text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill hover:bg-infoFill
                  outline hover:outline-attentionText shadow-lg  w-[350px] mb-8 mt-4 ml-8 mr-4 hover:scale-105 ease-in duration-200 shadow-infoText/20"
                        >
                          {receiverWallet && receiverWallet === 'my wallet' ? (
                            <button
                              className="py-1 px-4 h-full w-full outline-none text-primaryText"
                              disabled={
                                //walletAddress.length <= 5 || fValue === 0 ? true : false
                                fValue === 0 ? true : false
                              }
                              onClick={() => {
                                if (toAnotherWallet) {
                                  swapReceiver();
                                  // setIsConfirmation(false)
                                } else {
                                  swapOwner();
                                  // setIsConfirmation(false)
                                }
                              }}
                            >
                              Swap Now!
                            </button>
                          ) : (
                            <button
                              className="py-1 px-4 h-full w-full outline-none text-primaryText"
                              disabled={
                                //walletAddress.length <= 5 || fValue === 0 ? true : false
                                fValue === 0 ? true : false
                              }
                              onClick={() => {
                                swapReceiver();
                                // setIsConfirmation(false)
                              }}
                            >
                              Swap Now!
                            </button>
                          )}
                        </section>
                        <section
                          className="py-2 mb-2 ml-4 mr-4 flex flex-row text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill
                  shadow-lg"
                        >
                          <div className="text-xs flex flex-row justify-center items-center ml-4">
                            Please note that Gas prices are likely to change on
                            the network
                          </div>
                        </section>

                        {isTransactionMessage ? (
                          <section
                            className="py-2 mb-2 ml-4 mr-4 flex flex-row text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill
                  shadow-lg"
                          >
                            <div className="text-xs flex flex-row justify-center items-center ml-4">
                              {transactionMessage}
                            </div>
                          </section>
                        ) : null}
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            )}
          </>
        </Modal>

        {!isConnected ? (
          <section className="flex flex-row gap-2 justify-center items-center button_gradient hover:opacity-90  rounded-2xl w-[432px] py-3 mt-4 ml-4 mr-4">
            <button
              className="py-1 px-4 h-full w-full outline-none text-primaryText"
              onClick=""
            >
              Connect Wallet
            </button>
          </section>
        ) : null}

        {/* Title:Select a Token */}
        <section className="mt-4 ml-4 mr-4 mb-8">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs text-secondaryText">Tx cost </span>
              <button
                className="text-xs text-secondaryText hover:text-primaryText active:text-infoText cusor-pointer"
                onClick={() => setIsRouting((prev) => !prev)}
              >
                Route
              </button>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-secondaryText">
                {fValue > 0 && (
                  <section className="flex">
                    <div className="text-xs text-secondaryText">
                      {isCalculating ? (
                        'Fetching best price...'
                      ) : (
                        <span className="flex flex-row gap-3 items-center">
                          <span className="text-xs text-secondaryText">
                            <MdLocalGasStation />
                          </span>
                          <span>
                            {(estimatedGas / 10 ** 9).toString()} Gwei
                          </span>
                        </span>
                      )}
                    </div>
                  </section>
                )}
              </span>
              <span className="text-xs text-secondaryText" onClick={''}>
                {fToken?.symbol} {'>'} {tToken?.symbol}
              </span>
            </div>
          </div>
        </section>

        {/*
            ====================================================================
                From Currency Modals
            ====================================================================
            */}
        <Modal visible={isFromCurrencyModalVisible}>
          <section className="flex flex-col justify-center items-center gap-2 mb-8">
            <div className="w-[480px] px-2 py-2 border border-secondaryFillLight rounded-xl bg-primaryFill shadow-lg mb-8">
              {/* Title:Select a Token */}
              <section className="mb-8 mt-4 ml-4 mr-4">
                <div className="flex flex-row justify-between items-center">
                  <span className="text-sm text-primaryText">
                    Select a token
                  </span>
                  <div>
                    <div
                      className=" justify-start items-start px-1 py-1 rounded-lg bg-secondaryFill mr-4 hover:scale-110 ease-in duration-200 shadow-gray-400 cursor-pointer"
                      onClick={() => setIsFromCurrencyModalVisible(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </section>
              <div className="border-b border-secondaryFill"></div>
              <section className="overflow-y-auto max-h-[320px] mb-4 mt-4 ml-4 mr-4 flex flex-row justify-between items-center">
                <div className="flex flex-row w-[312px] gap-2">
                  <span className="py-1 text-sm justify-start items-start text-primaryText">
                    From Token
                  </span>
                </div>
                <div className="flex flex-row">
                  <ActiveTokenComponent currentItem={fToken} />
                </div>
              </section>
              <div className="border-b border-secondaryFill m-1"></div>
              {/* Search bar */}
              <section className="flex flex-row gap-2 justify-center items-center bg-secondaryFill rounded-lg w-[432px] py-4 mb-5 mt-4 ml-4 mr-4">
                <span className="justify-start items-start ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  className="py-1 px-4 h-full w-full outline-none text-secondaryText placeholder:text-secondaryText bg-transparent"
                  placeholder="Search by name or past address"
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setFilteredfTokens(allTokens);
                      return;
                    }
                    let ffToken = allTokens.filter(({ symbol }) => {
                      return symbol
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase());
                    });
                    if (ffToken !== null) {
                      setFilteredfTokens(ffToken);
                    }
                  }}
                />
              </section>
              {/* Favorite section */}

              <section className="max-h-[320px] mb-8 mt-4 ml-4 mr-4 flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                  {favoriteTokens?.map((token, idx) => (
                    <FavoriteTokenComponent
                      key={idx}
                      currentItem={token}
                      setSelectedToken={setFromToken}
                      setIsTokenModalVisible={setIsFromCurrencyModalVisible}
                    />
                  ))}
                </div>
                <div className="flex flex-row gap-2">
                  {favoriteTokensTwo?.map((token, idx) => (
                    <FavoriteTokenComponent
                      key={idx}
                      currentItem={token}
                      setSelectedToken={setFromToken}
                      setIsTokenModalVisible={setIsFromCurrencyModalVisible}
                    />
                  ))}
                </div>
              </section>
              <div className="border-b border-secondaryFill m-1"></div>

              <section className="overflow-y-auto max-h-[230px]">
                <div className="flex flex-col w-[312px]">
                  {filteredfTokens?.map((token, idx) => (
                    <TokenComponent
                      key={idx}
                      currentItem={token || allTokens[0]}
                      selectedToken={fToken}
                      setSelectedToken={setFromToken}
                      setIsTokenModalVisible={setIsFromCurrencyModalVisible}
                    />
                  ))}
                </div>
              </section>
              {/* Manage Token List */}
              <div className="border-b border-secondaryFill m-1"></div>

              <section
                className="flex flex-row gap-2 justify-center items-center rounded-lg cursor-pointer 
                    text-primaryText bg-secondaryFill/5 hover:bg-secondaryFill
                  outline outline-secondaryFillLight hover:outline-secondaryText shadow-lg w-[400px] py-4 mb-8 mt-4 ml-8 mr-4 hover:scale-105 ease-in duration-200 shadow-infoText/20"
              >
                <button
                  className="py-1 px-4 h-full w-full outline-none text-primaryText"
                  onClick={() => setIsFromCurrencyModalVisible(false)}
                >
                  Back
                </button>
              </section>
            </div>
          </section>
        </Modal>

        {/*
            ====================================================================
                To Currency Modals
            ====================================================================
            */}
        <Modal visible={isToCurrencyModalVisible}>
          <section className="flex flex-col justify-center items-center gap-2 mb-8">
            <div className="w-[480px] px-2 py-2 border border-secondaryFillLight rounded-xl bg-primaryFill shadow-lg mb-8">
              {/* Title:Select a Token */}
              <section className="mb-8 mt-4 ml-4 mr-4">
                <div className="flex flex-row justify-between items-center">
                  <span className="text-sm text-primaryText">
                    Select a token
                  </span>
                  <div>
                    <div
                      className=" justify-start items-start px-1 py-1 rounded-lg bg-secondaryFill mr-4"
                      onClick={() => setIsToCurrencyModalVisible(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </section>
              <div className="border-b border-secondaryFill m-1"></div>
              {/* Search bar */}
              <section className="flex flex-row gap-2 justify-center items-center bg-secondaryFill rounded-lg w-[432px] py-4 mb-5 mt-4 ml-4 mr-4">
                <span className="justify-start items-start ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  className="py-1 px-4 h-full w-full outline-none text-gray-700 placeholder:text-secondaryText bg-transparent"
                  placeholder="Search by name or past address"
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setFilteredtTokens(allTokens);
                      return;
                    }
                    let ttToken = allTokens.filter(({ symbol }) => {
                      return symbol
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase());
                    });
                    if (ttToken !== null) {
                      setFilteredtTokens(ttToken);
                    }
                  }}
                />
              </section>
              {/* Favorite section */}
              <div className="border-b border-secondaryFill m-1"></div>

              <section className="overflow-y-auto max-h-[320px] mb-4 mt-4 ml-4 mr-4 flex flex-row justify-between items-center">
                <div className="flex flex-row w-[312px] gap-2">
                  <span className="py-1 text-sm justify-start items-start text-primaryText">
                    To Token
                  </span>
                </div>
                <div className="flex flex-row">
                  <ActiveTokenComponent currentItem={tToken} />
                </div>
              </section>
              <div className="border-b border-secondaryFill m-1"></div>
              {/* Favorite section */}

              <section className="max-h-[320px] mb-8 mt-4 ml-4 mr-4 flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                  {favoriteTokens?.map((token, idx) => (
                    <FavoriteTokenComponent
                      key={idx}
                      currentItem={token}
                      setSelectedToken={setToToken}
                      setIsTokenModalVisible={setIsToCurrencyModalVisible}
                    />
                  ))}
                </div>
                <div className="flex flex-row gap-2">
                  {favoriteTokensTwo?.map((token, idx) => (
                    <FavoriteTokenComponent
                      key={idx}
                      currentItem={token}
                      setSelectedToken={setToToken}
                      setIsTokenModalVisible={setIsToCurrencyModalVisible}
                    />
                  ))}
                </div>
              </section>
              <div className="border-b border-secondaryFill m-1"></div>

              <section className="overflow-y-auto max-h-[230px]">
                <div className="flex flex-col w-[312px]">
                  {filteredtTokens?.map((token, idx) => (
                    <TokenComponent
                      key={idx}
                      currentItem={token || allTokens[1]}
                      selectedToken={tToken}
                      setSelectedToken={setToToken}
                      setIsTokenModalVisible={setIsToCurrencyModalVisible}
                    />
                  ))}
                </div>
              </section>
              {/* Manage Token List */}
              <div className="border-b border-secondaryFill m-1"></div>
              <section
                className="flex flex-row gap-2 justify-center items-center rounded-lg cursor-pointer 
                    text-primaryText bg-secondaryFill/5 hover:bg-secondaryFill
                  outline outline-secondaryFillLight hover:outline-secondaryText shadow-lg w-[400px] py-4 mb-8 mt-4 ml-8 mr-4 hover:scale-105 ease-in duration-200 shadow-infoText/20"
              >
                <button
                  className="py-1 px-4 h-full w-full outline-none text-primaryText"
                  onClick={() => setIsToCurrencyModalVisible(false)}
                >
                  Back
                </button>
              </section>
            </div>
          </section>
        </Modal>
        {/* Slippage settings*/}
        {/* <ModalSlippage */}
        <Modal visible={isSettingsVisible}>
          <section className="flex flex-col justify-center items-center gap-2 mb-8">
            <div className="w-[480px] px-2 py-2 border border-secondaryFillLight rounded-xl bg-primaryFill">
              {/* Heading */}
              <section className="flex flex-row  gap-[30px] mb-8 mt-4 ml-4 mr-4">
                {/* Back Button*/}
                <span
                  className="px-1 py-1 bg-secondaryFill rounded-lg cursor-pointer border border-transparent hover:scale-110 ease-in duration-200 shadow-gray-400"
                  onClick={() => setIsSettingsVisible(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#FFFFFF"
                    className="w-6 h-6 hover:stroke-infoText active:fill-infoText"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </span>
                <div className="text-primaryText w-[312px] h-[28px] flex justify-center items-center text-xl">
                  Swap Settings
                </div>
              </section>
              <div className="border-b border-secondaryFill m-1"></div>
              {/* slippage section */}
              <section
                className="w-fit h-fit flex flex-col gap-2 text-primaryText/50 mb-8 mt-4 ml-4 mr-4"
                onChange={(e) => {
                  setSlippage(e.target.value || slippages[0]);
                }}
              >
                <div className="flex justify-between">
                  <span className="py-1 text-sm justify-start items-start text-primaryText">
                    Slippage Tolerance:
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-lg cursor-pointer 
                    text-secondaryText
                  border border-secondaryFillLight shadow-lg"
                  >
                    {slippage} %
                  </span>
                </div>

                <div className="flex flex-row gap-2 justify-center items-center bg-secondaryFill rounded-lg w-[432px] py-4 shadow-sm shadow-infoText/50 outline outline-secondaryFillLight/10">
                  {slippages.map((slp) => (
                    <label key={slp}>
                      <input
                        type="radio"
                        id="slippage"
                        name="slippage"
                        value={slp}
                        className="peer sr-only"
                      />
                      <span
                        className={`px-2.5 py-1.5 rounded-lg cursor-pointer ${
                          slp === slippage
                            ? 'bg-black text-primaryText'
                            : 'bg-black/50 text-secondaryText'
                        } border border-transparent peer-hover:border-secondaryText peer-checked:bg-black peer-checked:hover:border-transparent peer-checked:text-primaryText`}
                      >
                        {slp} %
                      </span>
                    </label>
                  ))}
                </div>
              </section>
              {/* custom slippage */}
              <section className="flex flex-row justify-between gap-2 text-primaryText/50 mb-8 mt-4 ml-4 mr-4">
                <span
                  className="px-2.5 py-1.5 rounded-lg cursor-pointer 
                     active:bg-black text-primaryText bg-primaryFill
                  outline outline-secondaryFillLight hover:outline-secondaryText hover:scale-110 ease-in duration-200 shadow-md shadow-infoText/20"
                  onClick={() => setIsCustom((prev) => !prev)}
                >
                  custom
                </span>
                <section className="ml-4 mr-4">
                  {isCustom && (
                    <div className="flex">
                      <label className="text-primaryText py-1.5">%</label>
                      <div className="flex object-contain ml-2">
                        <input
                          type="text"
                          placeholder="0.0"
                          className="ml-2 px-5 py-1.5 rounded-lg w-[70px] object-contain
                active:bg-black active:text-primaryText bg-transparent text-secondaryText
                border border-secondaryFillLight hover:border-secondaryText"
                          value={slippage}
                          onChange={(e) => {
                            setSlippage(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </section>
              </section>

              {/* warning indicator section */}
              {isWarning && (
                <section className="w-fit h-fit flex flex-col gap-2 text-primaryText/50 mb-8 mt-4 ml-4 mr-4">
                  <div className="flex flex-row gap-2 justify-center items-center bg-warningFill rounded-lg w-[432px] py-4">
                    <div className="p-2 text-sm text-warningText">
                      {`You may receive ${slippage}% less with this level of`}{' '}
                      <br /> slippage tolerance
                    </div>
                  </div>
                </section>
              )}

              {/* slippage section */}
              {isLowSlippage && (
                <section className="w-fit h-fit flex flex-col gap-2 text-primaryText/50 mb-8 mt-4 ml-4 mr-4">
                  <div className="flex flex-row gap-2 justify-center items-center bg-attentionFill rounded-lg w-[432px] py-4">
                    <div className="p-2 text-sm text-attentionText">
                      Transaction with extremely low slippage tolerance
                      <br /> might be reverted due to market flunctuations
                    </div>
                  </div>
                </section>
              )}

              <div className="border-b border-secondaryFill m-1 ml-4 mr-4"></div>
              {/* Dealine */}
              <section
                className="w-fit h-fit flex flex-col gap-2 text-primaryText/50 mb-8 mt-4 ml-4 mr-4"
                onChange={(e) => {
                  setSlippage(e.target.value) || slippages[0];
                }}
              >
                <span className="text-sm justify-start items-start text-primaryText">
                  Transaction deadline:
                </span>
                <div className="mt-2 justify-start items-start gap-2  w-[432px] h-[48px]">
                  <span className="px-3 py-2 bg-secondaryFill rounded-lg cursor-pointer border border-transparent">
                    20
                  </span>
                  <span className="px-3 py-2 text-primaryText cursor-pointer border border-transparent">
                    minutes
                  </span>
                </div>
              </section>
            </div>
          </section>
        </Modal>
        {/*
            ====================================================================
                Switch Network Modals
            ====================================================================
            */}
        <Modal visible={isChainModalVisible}>
          <section className="flex flex-col justify-center items-center gap-2 mb-8">
            <div className="w-[480px] px-2 py-2 border border-secondaryFillLight rounded-xl bg-primaryFill shadow-lg mb-8">
              {/* Title:Select a Token */}
              <section className="mb-8 mt-4 ml-4 mr-4">
                <div className="flex flex-row justify-between items-center">
                  <span className="text-base text-primaryText">
                    Select a Network
                  </span>
                  <div>
                    <div
                      className=" justify-start items-start px-1 py-1 rounded-lg bg-secondaryFill mr-4 hover:scale-110 ease-in duration-200 shadow-gray-400 cursor-pointer"
                      onClick={() => setIsChainModalVisible(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </section>
              <div className="border-b border-secondaryFill m-1"></div>

              {/* Favorite section */}

              <section className="overflow-y-auto max-h-[320px] mb-5 mt-5 ml-4 mr-4 flex flex-row justify-between items-center">
                <div className="flex flex-row w-[312px] gap-2">
                  <span className="py-1 text-sm justify-start items-start text-primaryText">
                    Network
                  </span>
                </div>
                <div className="flex flex-col">
                  <ActiveChainComponent currentItem={chain} />
                </div>
              </section>
              <div className="border-b border-secondaryFill m-1"></div>
              {/* //==================={Chains}========================== */}
              <section className="max-h-[440px]">
                <div className="flex flex-col w-[312px]">
                  <section className="w-fit h-fit flex flex-col text-primaryText/50 mb-8 mt-4 ml-4 mr-4">
                    <div className="mt-2 justify-start items-start w-[432px] py-1 rounded-lg border border-secondaryFill hover:border-secondary">
                      {networksOptions?.map((c, idx) => (
                        <div className="flex flex-row justify-between items-center cursor-pointer hover:shadow-md hover:bg-secondaryFill">
                          <div
                            className="px-3 py-2 w-full flex flex-row gap-4"
                            key={idx}
                            onClick={() => {
                              switchNetwork(c.id);
                              setChainId(c.id);
                              setChain(c);
                              setIsChainChange(true);
                              setIsNetworkBalance(true);
                              dispatch(connectedChainInfo(c));
                              setIsChainModalVisible(false);
                              // updateStates();
                            }}
                          >
                            <img
                              src={c.logoURI}
                              alt="logo"
                              className="w-8 h-8"
                            />

                            <div className="flex flex-col">
                              <span className="text-xs text-primaryText">
                                {c?.name}
                              </span>
                              <span className="text-xs text-secondaryText">
                                {/* {c?.nativeCurrency?.symbol} */}
                                {c?.chainSymbol}
                              </span>
                            </div>
                          </div>
                          <span className="justify-start items-start mr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#9D9DA3" //secondaryText
                              className={`w-6 h-6 hover:stroke-infoText active:fill-infoText ${
                                c === chain
                                  ? 'stroke-infoText fill-infoText'
                                  : 'stroke-secondaryText'
                              }`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                              />
                            </svg>
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </section>

              {/* Manage Token List */}
              <div className="border-b border-secondaryFill m-1"></div>
              <section
                className="flex flex-row gap-2 justify-center items-center rounded-lg cursor-pointer 
                    text-primaryText bg-secondaryFill/5 hover:bg-secondaryFill
                  outline outline-secondaryFillLight hover:outline-secondaryText shadow-lg w-[400px] py-4 mb-8 mt-4 ml-8 mr-4 hover:scale-105 ease-in duration-200 shadow-infoText/20"
              >
                <button
                  className="py-1 px-4 h-full w-full outline-none text-primaryText"
                  onClick={() => setIsChainModalVisible(false)}
                >
                  Back
                </button>
              </section>
            </div>
          </section>
        </Modal>
      </div>
      <>
        {/* Swap Routing*/}
        <section className="">
          {isRouting && (
            <>
              <section className="w-[480px] px-2 py-2 border border-secondaryFillLight rounded-xl shadow-lg mb-8">
                <div className="block mt-6 max-w-screen-sm overflow-scroll scrollbar-hide">
                  <div className="w-full h-fit flex flex-col">
                    {/* Heading */}
                    <section className="flex flex-row  gap-[30px] mb-4 mt-4 ml-4 mr-4">
                      {/* Back Button*/}
                      <span
                        className="px-1 py-1 bg-secondaryFill rounded-lg border border-transparent hover:scale-110 ease-in duration-200 shadow-gray-400 cursor-pointer"
                        onClick={() => setIsRouting((prev) => !prev)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#FFFFFF"
                          className="w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                          />
                        </svg>
                      </span>
                      <div className="text-primaryText w-[312px] h-[28px] flex justify-center items-center text-base">
                        Swap Routes{' '}
                        {swapRoutes.length < 1 && 'are not available'}
                      </div>
                    </section>
                    <div className="border-b border-secondaryFill mb-3"></div>

                    <section className="border-white/20">
                      <div className="my-1 flex flex-col gap-4 mb-4 mt-4 ml-4 mr-4">
                        {swapRoutes.length > 0 && (
                          <>
                            {swapRoutes?.map((routesArray, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  setActiveProtocols(
                                    // routesArray ? routesArray : swapRoutes[0]
                                    routesArray ? routesArray : swapRoutes[0]
                                  );
                                }}
                                className="flex flex-col gap-10 "
                              >
                                <span
                                  className={`w-fit flex flex-row gap-3 px-3 py-3 rounded-lg items-center border ${
                                    routesArray === activeProtocols
                                      ? 'border-infoText'
                                      : 'border-secondaryFill'
                                  } hover:bg-infoFill hover:border-blue-300 ${
                                    routesArray === activeProtocols
                                      ? 'text-primaryText'
                                      : 'text-secondaryText'
                                  }`}
                                >
                                  {/* {routesArray[0].name} */}
                                  {routesArray?.map((route, idx) => (
                                    <>
                                      <div className="multi-route-path">
                                        <span className="">
                                          <FaDotCircle />
                                        </span>
                                        {routesArray.length > 1 && (
                                          <i className="">
                                            {' '}
                                            <HiArrowNarrowRight />{' '}
                                          </i>
                                        )}
                                      </div>
                                      <div className="px-4 py-1 flex flex-col gap-1 items-end bg-black/20 rounded-lg">
                                        <div
                                          key={idx}
                                          className="text-sm font-mono"
                                        >
                                          {route.name}
                                        </div>
                                        <div className="text-xs">
                                          {route.part}%
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </span>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </section>
            </>
          )}
        </section>
        {/* Profile */}
        <Modal visible={isProfileVisible}>
          <section className="flex flex-col justify-center items-center gap-2 mb-8">
            <div className="w-[480px] px-2 py-2 border border-secondaryFillLight rounded-xl bg-primaryFill">
              {/* Heading */}
              <section className="flex flex-row  gap-[30px] mb-8 mt-4 ml-4 mr-4">
                {/* Back Button*/}
                <span
                  className="px-1 py-1 bg-secondaryFill rounded-lg cursor-pointer border border-transparent hover:scale-110 ease-in duration-200 shadow-gray-400"
                  onClick={() => setIsProfileVisible(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#FFFFFF"
                    className="w-6 h-6 hover:stroke-infoText active:fill-infoText"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </span>
                <div className="text-primaryText w-[312px] h-[28px] flex justify-center items-center text-2xl">
                  Connected
                </div>
              </section>
              <div className="border-b border-secondaryFill m-1"></div>
              {/* slippage section */}
              <section className="w-fit h-fit flex flex-col text-primaryText/50 mb-8 mt-4 ml-4 mr-4">
                <div className="flex flex-col justify-center items-center bg-secondaryFill rounded-lg w-[432px] py-4">
                  <span className="py-1 text-4xl justify-start items-start text-primaryText">
                    {balance} {chain?.chainSymbol}
                  </span>

                  <span className="px-2.5 py-1.5 rounded-lg cursor-pointer text-secondaryText border border-transparent peer-hover:border-secondaryText peer-checked:bg-black peer-checked:hover:border-transparent peer-checked:text-primaryText">
                    ~$ {chainPriceData ? chainPriceData?.totalChainPrice : ''}
                  </span>
                  <span className=" text-xs px-2.5 py-1.5 rounded-lg cursor-pointer text-secondaryText/50 border border-transparent peer-hover:border-secondaryText peer-checked:bg-black peer-checked:hover:border-transparent peer-checked:text-primaryText">
                    ~$ {chainPriceData ? chainPriceData?.chainPrice : ''}
                  </span>
                </div>
              </section>
              {/* custom slippage */}
              <section className="flex flex-row justify-between gap-2 text-primaryText/50 mb-8 mt-4 ml-4 mr-4">
                <button
                  className="flex gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer 
           shadow-lg ml-2"
                  //onClick={address === undefined ? null : copyToClipboard()}
                >
                  <span className="py-1.5 rounded-full bg-secondaryFill px-1.5 hover:scale-110 ease-in duration-200 shadow-gray-400 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 hover:stroke-infoText active:fill-infoText"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </span>

                  <span
                    className="px-2.5 py-1.5 rounded-lg cursor-pointer 
          active:bg-black text-primaryText bg-primaryFill
       outline outline-secondaryFillLight hover:outline-secondaryText"
                  >
                    {' '}
                    {address && address.substring(0, 6) + '...'}
                  </span>
                </button>

                <section className="ml-4 mr-4">
                  <div className="flex gap-2">
                    <span className="py-1.5 bg-secondaryFill rounded-lg px-1.5 hover:scale-110 ease-in duration-200 shadow-gray-400 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 hover:stroke-infoText active:fill-infoText"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </span>
                    <span className="py-1.5 bg-secondaryFill rounded-lg px-1.5 hover:scale-110 ease-in duration-200 shadow-gray-400 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 hover:stroke-infoText active:fill-infoText"
                      >
                        <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                        <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                      </svg>
                    </span>
                    <span className="py-1.5 bg-secondaryFill rounded-lg px-1.5 hover:scale-110 ease-in duration-200 shadow-gray-400 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 hover:stroke-infoText active:fill-infoText"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </section>
              </section>
              <div className="border-b border-secondaryFill m-1 ml-4 mr-4"></div>
              <section className="w-fit h-fit flex flex-col gap-2 text-primaryText/50 mb-8 mt-4 ml-4 mr-4 hover:scale-105 ease-in duration-200 shadow-gray-400 cursor-pointer">
                <div className="flex flex-col gap-2 justify-center items-center bg-secondaryFill rounded-lg w-[432px] py-4">
                  <span className="cursor-pointer text-primaryText border border-transparent peer-hover:border-secondaryText peer-checked:bg-black peer-checked:hover:border-transparent peer-checked:text-primaryText">
                    My Profile
                  </span>
                </div>
              </section>
            </div>
          </section>
        </Modal>
      </>
    </div>
  );
};

export default FrameSwapConnect;
