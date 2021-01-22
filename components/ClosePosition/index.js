import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import cancel1x from '../../static/cancel.png'
import cancel2x from '../../static/cancel@2x.png'
import cancel3x from '../../static/cancel@3x.png'
import Modal from '../Modal'
import "./index.less"
import tools from '@/utils/tools'
import classnames from 'classnames'
import BigNumber from 'bignumber.js';
// import tools from '@/utils/tools'
const cStrategyAllETHOnly='0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
const cStrategyLiquidate='0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
const cMockERC20='0x5FbDB2315678afecb367f032d93F642f64180aa3';
const cUniswapGoblin='0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6';
 function CloseModal(props) {

  const [strategy,setStrategy] =useState('ConverttoETH')
  const {id,myPositions} = props.farm
  
  const closePosition =  myPositions.filter((item)=>{
      return  item.id == id
  })
  const receiving = (BigNumber(closePosition[0].positionvalue).plus(closePosition[0].totaldebt)).toString()

   const  cancel = async ()=>{
        await props.dispatch({
            type: 'farm/updateState',
            payload:{
                closePositions:false
            }
          })
    }
  const  closePositions = async()=>{
    const {index:{isMainnet,account}} = props
    const {weth,bank,web3,router,IUniswapV2Pair,factory} = await tools(isMainnet)
    // await fundExit()
    bank.methods.work(
      id,
      // '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
      cUniswapGoblin,
      '0',
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      web3.eth.abi.encodeParameters(
        ['address', 'bytes'],
        [cStrategyLiquidate, web3.eth.abi.encodeParameters(['address', 'uint256'], [cMockERC20, '0'])]
      )
    ).send({from: account});
    await props.dispatch({
      type: 'farm/updateState',
      payload:{
          closePositions:false
      }
    })
    
  }

  const changeStrategy = (value)=>()=>{
    setStrategy(value)
  }

  return (
    <Modal content={
        <div className="closeModal">
          <div className="cancel" onClick={cancel}><img src={cancel1x} srcSet={`${cancel2x} 2x, ${cancel3x} 3x`} /></div>
          <div className="title">
          Close Your Position
          </div>
         
             <ul className="positionInfo">
                 <li>
                     <span>Position Value</span>
                     <span>{closePosition[0].positionvalue} ETH</span>
                 </li>
                 <li>
                     <span>Total debt</span>
                     <span>{closePosition[0].totaldebt} ETH</span>
                 </li>
                 <li>
                    <span>You’re receiving</span>
                    <span>{receiving}ETH</span>
                 </li>
             </ul>
             <div className="bottombtn">
               <div>Which strategy would you like to use?</div>
               <div className="box">
                 <div    className={classnames({"box1":true,"active":strategy === 'MinimizeTrading'})} onClick={changeStrategy('MinimizeTrading')}>Minimize Trading</div>
                 <div    className={classnames({"box1":true,"active":strategy === 'ConverttoETH'})} onClick={changeStrategy('ConverttoETH')}>Convert to ETH</div>
               </div>
             </div>
             <div className="btn" onClick={closePositions}>Close Position</div>
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
})(CloseModal);