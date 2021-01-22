import React, { useEffect } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import "./index.less";
import eth1x from "../../static/eth.png";
import eth2x from "../../static/eth@2x.png";
import eth3x from "../../static/eth@3x.png";
import ibusdt1x from "../../static/ibusdt.png";
import ibusdt2x from "../../static/ibusdt@2x.png";
import ibusdt3x from "../../static/ibusdt@3x.png";
import usdt1x from "../../static/usdt.png";
import usdt2x from "../../static/usdt@2x.png";
import usdt3x from "../../static/usdt@3x.png";
import ibeth1x from "../../static/ibeth.png";
import ibeth2x from "../../static/ibeth@2x.png";
import ibeth3x from "../../static/ibeth@3x.png";
import TextField from "@material-ui/core/TextField";
import tools from "@/utils/tools";
import { leverageList, percentList } from "@/assets/data/data.json";
import {
  bigNumberify,
  formatEther,
  parseEther,
  keccak256,
  defaultAbiCoder,
  toUtf8Bytes,
  solidityPack,
} from "ethers-utils";
// import tools from '@/utils/tools'
import BigNumber from "bignumber.js";
import {fixNumberTwo} from '@/utils/formater'
import {metaMasks} from '@/utils/metaMask'
let bank;
let _this = this;
class EarnTab3 extends React.Component {
  state = {
    persent: "",
    tabStatus: "ETH",
    prevProptabStatus: "",
    imgsrc: eth1x,
    ibimgsrc: ibeth1x,
    convertValue: "",
    receiveValue: "0",
  };
  async componentDidMount() {
    const {
      index: { isMainnet, account },
      coin,
    } = this.props;
    const { bank: banks } = await tools(isMainnet);
    bank = banks;
  }
  // static getDerivedStateFromProps(props,state) {

  //     // 父组件传过来的 type 和 子组件的 type 不一样，那么子组件重新赋值。
  //     // 也可以理解成，父组件传过来的值变了。
  //     if (props.coin !== state.tabStatus) {
  //       // 这里执行相应的方法
  //       // console.log(123);
  //       return {
  //         tabStatus:props.coin,//把父组件最新的props.type重新赋值到 子组件state.type
  //       }
  //     }
  //     // 父组件的值没有变化，这里不做任何操作。
  //     return null
  //   }

  static getDerivedStateFromProps(props, state) {
    if (props.coin !== state.prevProptabStatus) {
      return {
        tabStatus: props.coin,
        prevProptabStatus: props.coin,
        imgsrc: props.coin === "ETH" ? eth1x : usdt1x,
        ibimgsrc: props.coin === "ETH" ? ibeth1x : ibusdt1x,
        convertValue: "0",
        receiveValue: "0",
        persent: "",
      };
    }
    return null;
  }

  changePersent = (persent) => async () => {
    // const {tabStatus} = this.state
    const { convertValue, tabStatus } = this.state;
    const {
      index: { isMainnet, account },
      coin,
    } = this.props;
    const {
      weth,
      bank,
      web3,
      router,
      factory,
      usdt,
      IUniswapV2Pair,
    } = await tools(isMainnet);
    const wallet = await web3.eth.getBalance(account);
    const balanceWETH = await bank.methods.balanceOf(account).call();

    // const totalETHValue= await web3.eth.getBalance(account);
    this.setState({
      persent,
    });
    if (!convertValue) {
      this.setState({
        convertValue: "0",
      });
    } else {
      if (tabStatus === `${coin}`) {
        this.setState({
          convertValue: BigNumber(wallet)
            .multipliedBy(persent)
            .dividedBy(100)
            .toString(),
        });
      } else {
        this.setState({
          convertValue: BigNumber(balanceWETH)
            .multipliedBy(persent)
            .dividedBy(100)
            .toString(),
        });
      }
    }
  };
  changeTab = (value) => () => {
    this.setState(
      {
        tabStatus: value,
        convertValue: "0",
        receiveValue: "0",
        persent: "",
      },
      () => {
        switch (value) {
          case "ETH":
            this.setState({
              imgsrc: eth1x,
              ibimgsrc: ibeth1x,
            });
            break;
          case "ibETH":
            this.setState({
              imgsrc: eth1x,
              ibimgsrc: ibeth1x,
            });
            break;
          case "USDT":
            this.setState({
              imgsrc: usdt1x,
              ibimgsrc: ibusdt1x,
            });
            break;
          case "ibUSDT":
            this.setState({
              imgsrc: usdt1x,
              ibimgsrc: ibusdt1x,
            });
            break;
          default:
            break;
        }
      }
    );
  };
  // depositWETH =  async ()=> {
  //     // const { weth, accounts } = this.state;
  //     const {index:{isMainnet,account}} = this.props

  //     const {weth} = await tools(isMainnet)

  //     async function t (_amount) {
  //         // console.log(isMainnet)
  //       await weth.methods.deposit().send({from: account, value: _amount});
  //     };
  //     t(1e8);
  //   }
  supplyWETH = async () => {
    const {
      index: { isMainnet, account },
    } = this.props;

    const { weth, bank } = await tools(isMainnet);
    //    console.log(bank)
    const { convertValue } = this.state;
    // console.log(vault_weth)
    const _amount = parseEther(convertValue.toString());
    //    console.log(bank.methods.deposit)
    // debugger
    weth &&
      (await weth.methods
        .approve(bank._address, _amount)
        .send({ from: account }));
    bank &&
      (await bank.methods.deposit().send({ from: account, value: _amount }));
    // async function t (_amount) {
    //   _amount = parseEther(_amount.toString());

    //   weth &&  await weth.methods.approve(vault_weth._address, _amount).send({from: account});
    //   vault_weth && await vault_weth.methods.supply(_amount).send({from: account});
    // };
    // t(convertValue);
  };

  supplyUSDT = async () => {
    const { convertValue } = this.state;
    const {
      index: { isMainnet, account },
    } = this.props;
    const { usdt, vault_usdt } = await tools(isMainnet);
    async function t(_amount) {
      _amount = parseEther(_amount.toString());
      usdt &&
        (await usdt.methods
          .approve(vault_usdt._address, _amount)
          .send({ from: account }));
      vault_usdt &&
        (await vault_usdt.methods.supply(_amount).send({ from: account }));
    }
    t(convertValue);
  };
  withdrawWETH = async () => {
    const { convertValue } = this.state;
    const {
      index: { isMainnet, account },
    } = this.props;
    const { weth, bank } = await tools(isMainnet);
    const _amount = parseEther(convertValue.toString());
    bank && (await bank.methods.withdraw(_amount).send({ from: account }));
    // async function t (_amount) {
    //   _amount = parseEther(_amount.toString());
    //   vault_weth &&  await vault_weth.methods.withdraw(_amount).send({from: account});
    // };
    // t(convertValue);
  };
  withdrawUSDT = () => {
    const { convertValue } = this.state;
    const { usdt, accounts, vault_usdt } = this.state;
    async function t(_amount) {
      _amount = parseEther(_amount.toString());
      vault_usdt &&
        (await vault_usdt.methods
          .withdraw(_amount)
          .send({ from: accounts[0] }));
    }
    t(convertValue);
  };
  convert = async () => {
    const {
      index: { isMainnet, account },
      coin,
    } = this.props;
    const web3 = await metaMasks()
    const { tabStatus } = this.state;
    // this.supplyWETH()
    if (account && tabStatus === `${coin}`) {
      // if(coin === 'ETH'){
      await  this.supplyWETH();
      const {bank} = await tools(isMainnet)
      const totalETHdeposited = await bank.methods.totalETH().call()
      const totalDebt = await bank.methods.glbDebtVal().call()
      let utilizationRate
      if(totalETHdeposited != 0){
       utilizationRate = BigNumber(totalDebt).dividedBy(totalETHdeposited).multipliedBy(100).toFixed(4)
      }
      const  currentibETHAPY = BigNumber(totalETHdeposited).multipliedBy(86400*365).multipliedBy(100).dividedBy(1e18).toFixed(4)

      const balanceWETH = await bank.methods.balanceOf(account).call()
      const totalETHValue= await web3.eth.getBalance(account);
      // await  this.props.dispatch({
      //   type: "data/updateState",
      //   payload: {
      //     balanceWETH:fixNumberTwo(formatEther(balanceWETH)),
      //     totalETHValue:fixNumberTwo(formatEther(totalETHValue)),
      //   }
      // })


      await  this.props.dispatch({
        type: "data/updateState",
        payload: {
          utilizationRate,
          totalETHdeposited:fixNumberTwo(formatEther(totalETHdeposited)),
          totalDebt:fixNumberTwo(formatEther(totalETHdeposited)),
          currentibETHAPY,
          balanceWETH:fixNumberTwo(formatEther(balanceWETH)),
          totalETHValue:fixNumberTwo(formatEther(totalETHValue)),
        }
    })
      // }else{
      //     this.supplyUSDT()
      // }
    } else if (account && tabStatus === `ib${coin}`) {
      // if(coin === 'ETH'){
      this.withdrawWETH();
      // }else{
      //     this.withdrawUSDT()
      // }
    }
  };
  inputSupply = async (value) => {
    const {
      index: { isMainnet, account },
      coin,
    } = this.props;
    const { tabStatus } = this.state;
    let numberValue;
    numberValue = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
    numberValue = numberValue.replace(/^\./g, ""); //验证第一个字符是数字而不是.
    numberValue = numberValue.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.
    numberValue = numberValue
      .replace(".", "$#$")
      .replace(/\./g, "")
      .replace("$#$", ".");

    if (numberValue) {
      if (tabStatus === `${coin}`) {
        const ibETH = await bank.methods.debtValToShare(numberValue).call();
        this.setState({
          convertValue: numberValue,
          receiveValue: ibETH.toString(),
        });
      } else {
        const eTH = await bank.methods.debtShareToVal(numberValue).call();
        // console.log(eTH)
        this.setState({
          convertValue: numberValue,
          receiveValue: eTH.toString(),
        });
      }
    } else
      [
        this.setState({
          convertValue: numberValue,
          // receiveValue: ibETH.toString(),
        }),
      ];
  };
  render() {
    const { coin } = this.props;
    const {
      persent,
      tabStatus,
      imgsrc,
      ibimgsrc,
      convertValue,
      receiveValue,
    } = this.state;
    return (
      <div className="earnTab3Con">
        <div className="tabTitle">
          <span
            className="tab"
            className={classnames({ active: tabStatus === `${coin}` })}
            onClick={this.changeTab(`${coin}`)}
          >
            Deposit {coin}
          </span>
          <span
            className="tab"
            className={classnames({ active: tabStatus === `ib${coin}` })}
            onClick={this.changeTab(`ib${coin}`)}
          >
            Redeem ib{coin}
          </span>
        </div>
        <div className="convert">Convert from</div>
        <div className="convertbox">
          {tabStatus === coin ? (
            <img
              src={`${imgsrc}`}
              srcSet={`${imgsrc} 2x, ${`${imgsrc}`} 3x`}
              className="coin1"
            />
          ) : (
            <img
              src={ibimgsrc}
              srcSet={`${ibimgsrc} 2x, ${ibimgsrc} 3x`}
              className="coin1"
            />
          )}
          {/* <div>0.169448508071999244</div> */}
          <TextField
            // label="Normal"
            // id="outlined-margin-normal"
            // defaultValue="0.169448508071999244"
            // className={classes.textField}
            value={convertValue}
            margin="normal"
            variant="outlined"
            onChange={(e) => this.inputSupply(e.target.value)}
            placeholder="Enter the amount"
          />
          <span>{tabStatus}</span>
        </div>
        <ul className="percent">
          {/* <li className={classnames({"active":persent === '25'})} onClick={this.changePersent('25')}>25%</li>
                   <li className={classnames({"active":persent === '50'})} onClick={this.changePersent('50')}>50%</li>
                   <li className={classnames({"active":persent === '75'})} onClick={this.changePersent('75')}>75%</li>
                   <li className={classnames({"active":persent === '100'})} onClick={this.changePersent('100')}>100%</li> */}
          {percentList.map((item) => (
            <li
              className={classnames({ active: persent === item })}
              onClick={this.changePersent(item)}
              key={item}
            >
              {item}%
            </li>
          ))}
        </ul>
        <div className="convert">To receive</div>
        <div className="convertbox1">
          {tabStatus === coin ? (
            <img
              src={ibimgsrc}
              srcSet={`${ibimgsrc} 2x, ${ibimgsrc} 3x`}
              className="coin1"
            />
          ) : (
            <img
              src={imgsrc}
              srcSet={`${imgsrc} 2x, ${imgsrc} 3x`}
              className="coin1"
            />
          )}
          <div style={{ textAlign: "left" }}>{receiveValue}</div>
          <span> {tabStatus === coin ? `ib${coin}` : `${coin}`} </span>
        </div>
        <div className="coverbtn" onClick={this.convert}>
          Convert
        </div>
      </div>
    );
  }
}
export default connect(({ index }) => {
  return {
    index,
  };
})(EarnTab3);
