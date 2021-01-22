import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import tools from '@/utils/tools'
import "./index.less"
import {metaMasks} from '@/utils/metaMask'
import {fixNumberTwo} from '@/utils/formater'
import { BigNumber, bigNumberify, formatEther, parseEther, keccak256, defaultAbiCoder, toUtf8Bytes, solidityPack } from 'ethers-utils'

class EarnHolding extends React.Component{
  state = {
    balanceWETH:'0.00',
    ibVaultWETH:'0.00',
    balanceVaultWETH:'0.00',
    debitVaultWETH:'0.00',
    balanceVaultUSDT:'0.00',
    debitVaultUSDT:'0.00'
  }
 async componentDidMount(){
    const {index:{isMainnet,account}} = this.props
    const {weth,bank} = await tools(isMainnet)
    const web3 = await metaMasks()

    if(account){
    const wallet = await web3.eth.getBalance(account);
    // debugger
    if(weth&&bank){

    
    const balanceWETH = await bank.methods.balanceOf(account).call()
    // const ibVaultWETH = await bank.methods.balanceOf(account).call()
    const totalETHValue= await web3.eth.getBalance(account);
    // console.log(balanceWETH,888888888888)
    // const balanceVaultWETH = await weth.methods.balanceOf(bank._address).call()
    // const debitVaultWETH = await bank.methods.debit().call()
    // const balanceVaultUSDT = await usdt.methods.balanceOf(vault_usdt._address).call()
    // const debitVaultUSDT = await vault_usdt.methods.debit().call()
    await  this.props.dispatch({
      type: "data/updateState",
      payload: {
        balanceWETH:fixNumberTwo(formatEther(balanceWETH)),
        totalETHValue:fixNumberTwo(formatEther(totalETHValue)),
      }
    })
    // this.setState({ 
    //   balanceWETH:fixNumberTwo(formatEther(balanceWETH)),
    //   totalETHValue:fixNumberTwo(formatEther(totalETHValue)),
    //   // balanceVaultWETH:formatEther(balanceVaultWETH),
    //   // debitVaultWETH:formatEther(debitVaultWETH),
    //   // balanceVaultUSDT:formatEther(balanceVaultUSDT),
    //   // debitVaultUSDT:formatEther(debitVaultUSDT)
    // })
  }
  }
    // console.log()
    // console.log(debitVaultWETH)
    // console.log(formatEther(balanceWETH))
    
    // const stats = { balanceWETH: balanceWETH}
    // for (const [k, v] of Object.entries(stats)) {
      
    //   // stats[k] = (new BigNumber(v)).div(1e18).toFormat(6);
    //   // this.state[k] = formatEther(v);
    //   // stats[k] = (new BigNumber(v)).div(bigNumberify(10).pow(18)).toString();
    //   console.log(v)
    // } 
    // console.log(this.state.balanceWETH)
    
  }
 
componentWillUnmount = () => {
  this.setState = (state,callback)=>{
    return;
  };
}
  render(){
    // const {ibVaultWETH,balanceVaultWETH,debitVaultWETH,balanceVaultUSDT,debitVaultUSDT} = this.state
    const {coin,data:{balanceWETH,totalETHValue}} = this.props
    return (
      <div className="earnHoldingCon">
         <div className="title">Your ib{coin} Holding</div>
         <div className="label">
             <span>Balance</span>
             <span>{balanceWETH} ib{coin}</span>
         </div>
         <div className="label">
             <span>Total {coin} Value</span>
             <span>{totalETHValue} {coin}</span>
         </div>
      </div>
    );
  }
  
}
export default connect(({index,data}) => {
  return {
    index,
    data
  };
})(EarnHolding);