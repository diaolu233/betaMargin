import React from 'react';
import { connect } from 'react-redux';
import cancel1x from '../../static/cancel.png'
import cancel2x from '../../static/cancel@2x.png'
import cancel3x from '../../static/cancel@3x.png'
import Modal from '../Modal'
import "./index.less"
import tools from '@/utils/tools'
import TextField from '@material-ui/core/TextField';
import eth1x from '../../static/eth.png'
import eth2x from '../../static/eth@2x.png'
import eth3x from '../../static/eth@3x.png'
const cStrategyAllETHOnly='0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
const cStrategyLiquidate='0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
const cMockERC20='0x5FbDB2315678afecb367f032d93F642f64180aa3';
const cUniswapGoblin='0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6';
class RefillModal extends React.Component{
    state={
        supplyValue:''
    }
    componentDidMount(){
      
    
  //   const closePosition =  myPositions.filter((item)=>{
  //     return  item.id == id
  // })
    }
    cancel = async ()=>{
        await this.props.dispatch({
            type: 'farm/updateState',
            payload:{
                refillModal:false
            }
          })
    }

    refill = async ()=>{
    
      const {index:{isMainnet,account},farm:{id}} = this.props
      const {supplyValue} = this.state
      // 
      const {weth,bank,web3,router,IUniswapV2Pair,factory} = await tools(isMainnet)
      // console.log(supplyValue)
      // console.log(this.props.farm)
      // const {supplyValue,totalDebt} = this.state

      // bank.methods.work  (
      //   0,
      //   // goblin.address,
      //   cUniswapGoblin,
      //   web3.utils.toWei(1, 'ether'),
      //   '0',
      //   web3.eth.abi.encodeParameters(
      //     ['address', 'bytes'],
      //     [cStrategyAllETHOnly, web3.eth.abi.encodeParameters(['address', 'uint256'], [cMockERC20, '0'])]
      //   ),
        
      // ).send({ value: web3.utils.toWei('1', 'ether'), from: account})
      bank.methods.work(
        id,
        // goblin.address,
        cUniswapGoblin,
        // web3.utils.toWei(totalDebt, 'ether'),
        1,
        '0',
        web3.eth.abi.encodeParameters(
          ['address', 'bytes'],
          [cStrategyAllETHOnly, web3.eth.abi.encodeParameters(['address', 'uint256'], [cMockERC20, '0'])]
        ),
        
      ).send({ value: web3.utils.toWei('1', 'ether'), from: account})
    }
//     closePositions = async()=>{
//     await fundExit()
//     await props.dispatch({
//       type: 'farm/updateState',
//       payload:{
//           closePositions:false
//       }
//     })
    
//   }

//     fundExit = async () =>{
//     const {index:{isMainnet,account}} = props
//     const {weth,usdt,fund} = await tools(isMainnet)
//     // const {index:{account} , fund } = props
//     async function t () {
//       await fund.methods.exit().send({from: account});
//     };
//     t();
//   };

  inputSupply = (value)=>{
    let numberValue
    numberValue = value.replace(/[^\d.]/g, "");//清除“数字”和“.”以外的字符
    numberValue = numberValue.replace(/^\./g, "");//验证第一个字符是数字而不是.
    numberValue = numberValue.replace(/\.{2,}/g, ".");//只保留第一个. 清除多余的.
    numberValue = numberValue.replace(".", "$#$").replace(/\./g,"").replace("$#$", ".");
          this.setState({
            // totalDebtETH:'3.00',
            // totalDebtUSDT:'1.00',
            // totalLPs:'1.00',
            supplyValue:numberValue
          })
    }
render(){
const {supplyValue} = this.state
const {index:{isPc}} = this.props
  return (
    <Modal content={
        <div className="closeModal">
          <div className="cancel" onClick={this.cancel}><img src={cancel1x} srcSet={`${cancel2x} 2x, ${cancel3x} 3x`} /></div>
          <div className="title">
          How many ETH to refill？
          </div>
          <div className="supplyInput">
               <img src={eth1x} srcSet={`${eth2x} 2x, ${eth3x} 3x`} style={isPc?{width:"37px",height:"37px"}:{width:"25px",height:"25px"}}/>
               {/* <Input defaultValue="Hello world"  /> */}
               <TextField
                // label="Normal"
                id="outlined-margin-normal"
                // defaultValue="0"
                value = {supplyValue}
                // className={classes.textField}
                // disabled = {true}
                margin="normal"
                variant="outlined"
                onChange = {(e)=>this.inputSupply(e.target.value)}
                placeholder="Enter the amount"
              />
               <span>ETH</span>
              </div>
            <div className="okbtn" onClick={this.refill}>OK</div>
        </div>
    }>
    </Modal>
    
  );
}
}
export default connect(({index,farm}) => {
  return {
    index,
    farm
  };
})(RefillModal);