
import tools from "@/utils/tools";
const model = {
  namespace: 'farm',
  state: {
    farmModal:false,
    metaModal:false,
    closePositions:false,
    claim:false,
    positionsList:[],
    leverage:'2',
    refillModal:false,
    pairA:'0.00',
    pairB:'0.00',
    myPositions:[],
    id:''
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
     *init ({payload},{call, put , select}){
       
        const {isMainnet,account} =yield select(_=>_.index)
        
        const { weth, usdt, fund } = yield call (tools,isMainnet);
        // console.log(fund,666888)
        // let myPositions = [];
        // console.log(fund,account,'2121212')
    // if (fund && fund.methods && account) {
    //   // console.log(fund)
    //   const _myPositions = yield call (fund.methods.getUserPositions,account);
    //   for (var i = _myPositions.length - 1; i >= 0; i--) {
    //     var p = yield call(fund.methods.positions(_myPositions[i]));
    //     console.log(p)
    //     p.id = _myPositions[i];
    //     myPositions.push(p);
    //   }
    // }
    yield put({
      type: "updateState",
      payload: {
        positionsList: [],
        // isMainnet:payload.isMainnet
      },
    });
      }
  }
};

export default model;

