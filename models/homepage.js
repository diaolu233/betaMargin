const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
import { getUserCountry } from '../services/global'
const model = {
  namespace: 'index',
  state: {
    pathname: '/rrrr',
    locale:"",
    isMobile:"true",
    account:"",
    isPc:true,
    isMainnet:0,
    beta:'0.00'
  },
  reducers: {
    updateState(state, { payload }) {
      
      // console.log(1)
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    *init(action, { put }) {
      yield delay(2000);
      yield put({ type: 'caculate', delta: 1 });
    },
    *getUserCountry({},{ call,put}){
      const data = yield call(getUserCountry)
      console.log(1)
      if(data.code === "SUCCESS"){
        data.data === 'cn'
        ?yield put({
          type: 'updateState',
          params: {
            locale:'zh_CN'
          }
        })
        :yield put({
          type: 'updateState',
          params: {
            locale:'en_US'
          }
        })
        
        //  return data.data
      }else{
        return false
      }
      // console.log(data)
    }
  
  }
};

export default model;

