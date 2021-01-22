import { getUserCountry } from '../services/global'
// import { exp } from 'react-native-reanimated';
// import { getSubaccountInfo } from '@/services/detail'
// import router from 'umi/router'
// import { formatNum } from '@/utils/formatter'
// import { sendMsg } from '@/services/user'

export default {
  namespace: 'global',
  state: {
    
    // subaccountList: [],
    locale:"",
    isMobile:false
  },
  reducers: {
    updateState(state, { params }) {
      return { ...state, ...params };
    },
  },
  effects: {
    *getUserCountry({},{ call,put}){
      const data = yield call(getUserCountry)
      // console.log(1)
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




  },
  subscriptions: {
    history({ dispatch }) {
      listen(({ pathname }) => {
        console.log(111)
        if (pathname === '/users') {
          dispatch({
            type: 'users/fetch',
          });
        }
      });
    },
  }
};
 