import axios from 'axios';
import { parseUnits } from '@ethersproject/units';
export const BACKEND_URL = 'http://127.0.0.1:4000';

const fee = import.meta.env.VITE_SWAP_FEE;
const dexAddress = import.meta.env.VITE_DEX_ADDRESS;
// const cryptoPriceApiKey = import.meta.env.VITE_CRYPTOCOMPARE_KEY;

const swapToOwnAddress = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/swap/active-address`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const swapToDestination = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/swap/new-address`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const fetchSpender = async (chainId) => {
  const response = await axios.get(
    `https://api.1inch.io/v5.0/${chainId}/approve/spender`
  );

  if (response.data) {
    return response.data.address;
  }
};

const fetchChainData = async (chainId) => {
  const response = await axios.get(
    `https://api.1inch.io/v5.0/${chainId}/tokens`
  );

  if (response.data) {
    let allTokenKeys = Object.keys(response.data.tokens);
    let allTs = allTokenKeys.map((key) => response.data.tokens[key]);
    return allTs;
  }
};

// price estimates
const getPrice = async (userData) => {
  const response = await axios.get(
    `https://api.1inch.exchange/v5.0/${userData?.chainId}/quote?fromTokenAddress=${userData?.fTokenAddress}&toTokenAddress=${userData?.tTokenAddress}&amount=${userData?.validatedValue}&fee=${fee}&gasLimit=3000000`
  );
  if (response.data) {
    return response;
  }
};

// using usdt for price conversion
const getPriceCompare = async (userData) => {
  const { chainId, fToken, tToken } = userData;

  let amount = parseUnits('1', fToken?.decimals.toString());
  const response = await axios.get(
    `https://api.1inch.exchange/v5.0/${chainId}/quote?fromTokenAddress=${fToken?.address}&toTokenAddress=${tToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`
  );
  if (response.data) {
    let rawValue = response.data.toTokenAmount;
    let value = rawValue / 10 ** tToken.decimals;
    let valueFormmated = value.toFixed(4);
    let exchangeRate = valueFormmated;
    let newData = { exchangeRate };

    return newData;
  }
};

const getFromUSDPrice = async (userData) => {
  const { chainId, fToken, fValue, usdtToken } = userData;
  if (fToken?.address === usdtToken.address) {
    let value = '1';
    let fromPrice = '1';
    let totalFromRaw = Number(fValue) * Number(value);
    let totalFromPrice = totalFromRaw.toFixed(4);
    let newData = { fromPrice, totalFromPrice };
    return newData;
  } else {
    let amount = parseUnits('1', fToken?.decimals.toString());
    const response = await axios.get(
      `https://api.1inch.exchange/v5.0/${chainId}/quote?fromTokenAddress=${fToken?.address}&toTokenAddress=${usdtToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`
    );
    if (response.data) {
      let rawValue = response.data.toTokenAmount;
      let value = rawValue / 10 ** usdtToken?.decimals;
      let valueFormmated = value.toFixed(4);
      let fromPrice = valueFormmated;
      let totalFromRaw = Number(fValue) * Number(value);
      let totalFromPrice = totalFromRaw.toFixed(4);
      let newData = { fromPrice, totalFromPrice };
      console.info('FromUSDRate', newData);
      return newData;
    }
  }
};

// using usdt for price conversion
const getToUSDPrice = async (userData) => {
  const { chainId, tToken, tValue, usdtToken } = userData;
  if (tToken?.address === usdtToken?.address) {
    let value = '1';
    let toPrice = '1';
    let totalToPriceRaw = Number(tValue) * Number(value);
    let totalToPrice = totalToPriceRaw.toFixed(4);
    let newData = { toPrice, totalToPrice };
    return newData;
  } else {
    let amount = parseUnits('1', tToken?.decimals.toString());
    const response = await axios.get(
      `https://api.1inch.exchange/v5.0/${chainId}/quote?fromTokenAddress=${tToken?.address}&toTokenAddress=${usdtToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`
    );
    if (response.data) {
      let rawValue = response.data.toTokenAmount;
      let value = rawValue / 10 ** usdtToken?.decimals;
      let valueFormmated = value.toFixed(4);
      let toPrice = valueFormmated;
      let totalToPriceRaw = Number(tValue) * Number(value);
      let totalToPrice = totalToPriceRaw.toFixed(4);
      let newData = { toPrice, totalToPrice };
      return newData;
    }
  }
};
// connected Chain USD Value

const getChainUSDPrice = async (userData) => {
  const addressNative = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
  const decimalsNative = '18';
  const { chainId, chainBalance, usdtToken } = userData;

  let amount = parseUnits('1', decimalsNative);
  const response = await axios.get(
    `https://api.1inch.exchange/v5.0/${chainId}/quote?fromTokenAddress=${addressNative}&toTokenAddress=${usdtToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`
  );
  if (response.data) {
    let rawValue = response.data.toTokenAmount;
    let value = rawValue / 10 ** usdtToken?.decimals;
    let valueFormmated = value.toFixed(4);
    let chainPrice = valueFormmated;
    let totalChainRaw = Number(chainBalance) * Number(value);
    let totalChainPrice = totalChainRaw.toFixed(4);
    let newData = { chainPrice, totalChainPrice };
    return newData;
  }
};

// check values
const approve = async (userData) => {
  const response = await axios.get(
    `https://api.1inch.exchange/v5.0/${userData?.chainId}/approve/transaction?tokenAddress=${userData?.fTokenAddress}&amount=${userData?.validatedValue}`
  );
  if (response.data) {
    return response.data;
  }
};

const swapOwner = async (userData) => {
  const response = await axios.get(
    `https://api.1inch.io/v5.0/${userData?.chainId}/swap?fromTokenAddress=${userData?.fTokenAddress}&toTokenAddress=${userData?.tTokenAddress}&amount=${userData?.validatedValue}&fromAddress=${userData?.walletAddress}&slippage=${userData?.slippage}&protocols=${userData?.protocols}&referrerAddress=${dexAddress}&fee=${fee}&disableEstimate=true&allowPartialFill=false&gasLimit=3000000`
  );

  if (response?.data) {
    return response?.data;
  }
};

const swapReceiver = async (userData) => {
  const response = await axios.get(
    `https://api.1inch.io/v5.0/${userData?.chainId}/swap?fromTokenAddress=${userData?.fTokenAddress}&toTokenAddress=${userData?.tTokenAddress}&amount=${userData?.validatedValue}&fromTokenAddress=${userData?.walletAddress}&slippage=${userData?.slippage}&protocols=${userData?.protocols}&destReceiver=${userData?.receiver}&referrerAddress=${dexAddress}&fee=${fee}&disableEstimate=true&allowPartialFill=false&gasLimit=3000000`
  );

  if (response?.data) {
    return response?.data;
  }
};
const connectedChainInfo = async (c) => {
  console.info({chain: c})
  let response = {
    chainId: c.id,
    symbol: c?.chainSymbol,
  };
  return response;
};

const swapService = {
  swapToOwnAddress,
  swapToDestination,
  fetchSpender,
  fetchChainData,
  getPrice,
  getPriceCompare,
  getFromUSDPrice,
  getToUSDPrice,
  getChainUSDPrice,
  approve,
  swapOwner,
  swapReceiver,
  connectedChainInfo,
};

export default swapService;
