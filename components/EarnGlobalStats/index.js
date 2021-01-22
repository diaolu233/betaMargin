import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import tip11x from '../../static/tip1.png'
import tip12x from '../../static/tip1@2x.png'
import tip13x from '../../static/tip1@3x.png'
import "./index.less"
import tools from '@/utils/tools'
import {metaMasks} from '@/utils/metaMask'
import {  bigNumberify, formatEther, parseEther, keccak256, defaultAbiCoder, toUtf8Bytes, solidityPack } from 'ethers-utils'
import BigNumber from 'bignumber.js';
import {fixNumberTwo} from '@/utils/formater'
class EarnGlobalStats extends React.Component{
  state={
    ibAPY:'0.0',
    balanceWETH:'0.00',
    ibVaultWETH:'0.00',
    balanceVaultWETH:'0.00',
    debitVaultWETH:'0.00',
    balanceVaultUSDT:'0.00',
    debitVaultUSDT:'0.00',
    utilizationRate:'0.00',
    totalETHdeposited:'0.00',
    totalDebt:'0.00',
    currentibETHAPYL:'0.00'
  }
 async componentDidMount(){
    // const {index:{isMainnet,account}} = this.props
    // const {weth,vault_weth,usdt, vault_usdt} = await tools(isMainnet)
    // const balanceVaultWETH = await weth.methods.balanceOf(vault_weth._address)
    // const debitVaultWETH = await vault_weth.methods.debit()
    // const balanceVaultUSDT = await usdt.methods.balanceOf(vault_usdt._address)
    // const debitVaultUSDT = await vault_usdt.methods.debit()
    // console.log(vault_usdt._address,8080)
    const {index:{isMainnet,account}} = this.props
    const {weth,bank} = await tools(isMainnet)
    const web3 = await metaMasks()

    if(account&&bank){
      const wallet = await web3.eth.getBalance(account);
    // debugger
    const balanceWETH = await weth.methods.balanceOf(account).call()
    
    const ibVaultWETH = await bank.methods.balanceOf(account).call()
    // console.log(balanceWETH,888888888888)
    // console.log(ibVaultWETH)
    const balanceVaultWETH = await weth.methods.balanceOf(bank._address).call()
    // const debitVaultWETH = await bank.debit().call()
    // const balanceVaultUSDT = await usdt.methods.balanceOf(vault_usdt._address).call()
    // const debitVaultUSDT = await bank.methods.debit().call()

    const totalETHdeposited = await bank.methods.totalETH().call()
    const totalDebt = await bank.methods.glbDebtVal().call()
   
    let utilizationRate
    if(totalETHdeposited != 0){
       utilizationRate = BigNumber(totalDebt).dividedBy(totalETHdeposited).multipliedBy(100).toFixed(4)
    }
   const  currentibETHAPY = BigNumber(totalETHdeposited).multipliedBy(86400*365).multipliedBy(100).dividedBy(1e18).toFixed(4)
    await  this.props.dispatch({
          type: "data/updateState",
          payload: {
            utilizationRate,
            totalETHdeposited:fixNumberTwo(formatEther(totalETHdeposited)),
            totalDebt:fixNumberTwo(formatEther(totalETHdeposited)),
            currentibETHAPY
          }
      })


    this.setState({
      balanceWETH:fixNumberTwo(formatEther(balanceWETH)),
      ibVaultWETH:fixNumberTwo(formatEther(ibVaultWETH)),
      balanceVaultWETH: fixNumberTwo(formatEther(balanceVaultWETH)),
      // utilizationRate,
      // totalETHdeposited:fixNumberTwo(formatEther(totalETHdeposited)),
      // totalDebt:fixNumberTwo(formatEther(totalETHdeposited)),
      // currentibETHAPY
      // debitVaultWETH:formatEther(debitVaultWETH),
      // balanceVaultUSDT:formatEther(balanceVaultUSDT),
      // debitVaultUSDT:formatEther(debitVaultUSDT)
    })
  }


    
    // this.setState({
    //   totalDeposited:formatEther(balanceVaultWETH),
    //   totalDebtIssued:formatEther(debitVaultWETH)
    // })
  }


componentWillUnmount = () => {
  this.setState = (state,callback)=>{
    return;
  };
}
//  function EarnGlobalStats(props) {
  // const {index:{isMainnet,account}} = props
  // useEffect(async()=>{
  //   const {weth,vault_weth,usdt, vault_usdt} = await tools(isMainnet)
  //   const balanceVaultWETH = await weth.methods.balanceOf(vault_weth._address)
  //   console.log(balanceVaultWETH)
  // },[])
  // const {weth,vault_weth,usdt, vault_usdt} =  tools(isMainnet)
  // const balanceVaultWETH =  weth.methods.balanceOf(vault_weth._address)
  // console.log(balanceVaultWETH)
render(){
      const {balanceWETH,ibVaultWETH,balanceVaultWETH,debitVaultWETH,balanceVaultUSDT,debitVaultUSDT,ibAPY} = this.state
      const {data:{utilizationRate,totalETHdeposited,totalDebt,currentibETHAPY}} = this.props
      return (
    <div className="globalStasCon">
       <div className="title">Global Stats</div>
       <div className="circle">
        <div className="inner">
            <div className="text">
             <span>Utilization</span>
             <Tooltip title="Percentage of ETH utilized as debt versus the total ETH liquidity under ibETH pool" placement="bottom">
                 <img src={tip11x} srcSet={`${tip12x} 2x, ${tip13x} 3x`} />
             </Tooltip>
             <img/>
            </div>
           <span className="percent">{utilizationRate}%</span>
        </div>
       </div>
       <div className="bottomInfo">
            <ul>
                <li><span className="smallcir1"></span> Total {this.props.coin} deposited</li>
                <li><span className="smallcir2"></span>Total debt issued</li>
                <li>Current ib{this.props.coin} APY</li>
            </ul>
            <ul>
                <li>{this.props.coin === 'ETH'?totalETHdeposited:balanceVaultUSDT} {this.props.coin}</li>
                <li>{this.props.coin === 'ETH'?totalDebt:debitVaultUSDT} {this.props.coin}</li>
                <li>{currentibETHAPY}%</li>
            </ul>
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
})(EarnGlobalStats);