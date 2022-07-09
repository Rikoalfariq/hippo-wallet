import { TokenInfo } from '@manahippo/hippo-sdk/dist/generated/X0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8/TokenRegistry';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface ITokenAmounts {
  token?: TokenInfo;
  amount?: number;
}

export interface ISwapSettings {
  slippageTolerance: number;
  txDeadline: number;
}

export interface ISwapStore {
  input: ITokenAmounts;
  output: ITokenAmounts;
  settings: ISwapSettings;
  setInput: (ta: ITokenAmounts) => void;
  setOutputToken: (t: TokenInfo) => void;
  setOutputAmount: (t: number) => void;
  resetAmounts: () => void;
  setSlippage: (s: number) => void;
  setTxDeadline: (s: number) => void;
}

const useSwapStore = create(
  immer<ISwapStore>((set) => {
    return {
      input: {
        token: undefined,
        amount: 0
      },
      output: {
        token: undefined,
        amount: 0
      },
      settings: {
        slippageTolerance: 1,
        txDeadline: 0
      },
      setInput: (ta: ITokenAmounts) =>
        set((state) => {
          state.input = ta;
        }),
      setOutputToken: (t: TokenInfo) =>
        set((state) => {
          state.output.token = t;
        }),
      setOutputAmount: (t: number) =>
        set((state) => {
          state.output.amount = t;
        }),
      resetAmounts: () =>
        set((state) => {
          state.input.amount = 0;
          state.output.amount = 0;
        }),
      setSlippage: (s: number) =>
        set((state) => {
          state.settings.slippageTolerance = s;
        }),
      setTxDeadline: (s: number) =>
        set((state) => {
          state.settings.txDeadline = s;
        })
    };
  })
);

export default useSwapStore;
