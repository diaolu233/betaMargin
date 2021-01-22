
const model = {
  namespace: 'data',
  state: {
    utilizationRate:'0.00',
    totalETHdeposited:'0.00',
    totalDebt:'0.00',
    currentibETHAPY:'0.00',
    balanceWETH:'0.00',
    totalETHValue:'0.00'

  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    
  }
};

export default model;

