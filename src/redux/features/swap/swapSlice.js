import { createSlice, createAsyncThunk,  createAction } from '@reduxjs/toolkit';
import swapService from './swapService';
import { toast } from 'react-toastify';

export const swapitToOwnAddress = createAsyncThunk(
  'swaps/active-address',
  async (userData, thunkAPI) => {
    try {
      return await swapService.swapToOwnAddress(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const swapitToAnotherDestination = createAsyncThunk(
  'swaps/new-address',
  async (userData, thunkAPI) => {
    try {
      return await swapService.swapToDestination(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchSpender = createAsyncThunk(
  'swaps/fetchSpender',
  async (chainId, thunkAPI) => {
    try {
      return await swapService.fetchSpender(chainId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchChainData = createAsyncThunk(
  'swaps/fetchChainData',
  async (chainId, thunkAPI) => {
    try {
      return await swapService.fetchChainData(chainId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPrice = createAsyncThunk(
  'swaps/getPrice',
  async (userData, thunkAPI) => {
    try {
      return await swapService.getPrice(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPriceCompare = createAsyncThunk(
  'swaps/getPriceCompare',
  async (userData, thunkAPI) => {
    try {
      return await swapService.getPriceCompare(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFromUSDPrice = createAsyncThunk(
  'swaps/getFromUSDPrice',
  async (userData, thunkAPI) => {
    try {
      return await swapService.getFromUSDPrice(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getChainUSDPrice = createAsyncThunk(
  'swaps/getChainUSDPrice',
  async (userData, thunkAPI) => {
    try {
      return await swapService.getChainUSDPrice(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getToUSDPrice = createAsyncThunk(
  'swaps/getToUSDPrice',
  async (userData, thunkAPI) => {
    try {
      return await swapService.getToUSDPrice(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const approve = createAsyncThunk(
  'swaps/approve',
  async (userData, thunkAPI) => {
    try {
      return await swapService.approve(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const swapOwner = createAsyncThunk(
  'swaps/swapOwner',
  async (userData, thunkAPI) => {
    try {
      return await swapService.swapOwner(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const swapReceiver = createAsyncThunk(
  'swaps/swapReceiver',
  async (userData, thunkAPI) => {
    try {
      return await swapService.swapReceiver(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  swap: '',
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
export const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(swapitToOwnAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(swapitToOwnAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swap = action.payload;
        if (state.isSuccess === true) {
          toast.success('Swap sucessful');
        }
      })
      .addCase(swapitToOwnAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error('Something went wrong');
        }
      })

      .addCase(swapitToAnotherDestination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(swapitToAnotherDestination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swapToDestination = action.payload;
        if (state.isSuccess === true) {
          toast.success('Swap sucessful');
        }
      })
      .addCase(swapitToAnotherDestination.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error('Something went wrong');
        }
      })
      .addCase(fetchSpender.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSpender.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swapSpender = action.payload;
      })
      .addCase(fetchSpender.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(fetchChainData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChainData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swapChainData = action.payload;
      })
      .addCase(fetchChainData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swapPrice = action.payload;
      })
      .addCase(getPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getPriceCompare.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPriceCompare.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swapExchangeRate = action.payload;
      })
      .addCase(getPriceCompare.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getFromUSDPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFromUSDPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swapFromUSDPrice = action.payload;
      })
      .addCase(getFromUSDPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getToUSDPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getToUSDPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swapToUSDPrice = action.payload;
      })
      .addCase(getToUSDPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getChainUSDPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChainUSDPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swapChainUSDPrice = action.payload;
      })
      .addCase(getChainUSDPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(approve.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approve.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swapApproval = action.payload;
        if (state.isSuccess === true) {
          toast.success('Swap Approved');
        }
      })
      .addCase(approve.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error('Something went wrong!');
        }
      })
      .addCase(swapOwner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(swapOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swapToOwner = action.payload;
        if (state.isSuccess === true) {
          toast.success('Swap successful');
        }
      })
      .addCase(swapOwner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error('Something went wrong!');
        }
      })
      .addCase(swapReceiver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(swapReceiver.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swapToReceiver = action.payload;
        if (state.isSuccess === true) {
          toast.success('Swap successful');
        }
      })
      .addCase(swapReceiver.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error('Something went wrong!');
        }
      })
      .addCase(resetState, () => initialState);
  },
});
export default swapSlice.reducer;
