import React, { useEffect } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import classnames from "classnames";
import "./index.less";
import cancel1x from "../../static/cancel.png";
import cancel2x from "../../static/cancel@2x.png";
import cancel3x from "../../static/cancel@3x.png";
import midjt1x from "../../static/midjt.png";
import midjt2x from "../../static/midjt@2x.png";
import midjt3x from "../../static/midjt@3x.png";
import eth1x from "../../static/eth.png";
import eth2x from "../../static/eth@2x.png";
import eth3x from "../../static/eth@3x.png";
import slogo1x from "../../static/slogo@1x.png";
import slogo2x from "../../static/slogo@2x.png";
import slogo3x from "../../static/slogo@3x.png";
import tip11x from "../../static/tip1.png";
import tip12x from "../../static/tip1@2x.png";
import tip13x from "../../static/tip1@3x.png";
import { ThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Tooltip from "@material-ui/core/Tooltip";
import Backdrop from "@material-ui/core/Backdrop";
import usdt1x from "../../static/usdt.png";
import usdt2x from "../../static/usdt@2x.png";
import usdt3x from "../../static/usdt@3x.png";
import goblin from "../../contracts/Goblin.json";
import StrategyLiquidate from "../../contracts/StrategyLiquidate.json";
import StrategyAllETHOnly from "../../contracts/StrategyAllETHOnly.json";
// import WETHContract from "../../contracts/WETH9.json";
// import USDTContract from "../../contracts/ERC20.json";
// import RouterContract from "../../contracts/UniswapV2Router02.json";
// import BankContract from "../../contracts/Bank.json";
// import VaultContract from "../../contracts/VaultManager.json";
// import FundContract from "../../contracts/Strataegy1ForUniswap.json";
// import getWeb3 from "@/utils/getWeb3";
// import {metaMasks} from '@/utils/metaMask'
import tools from "@/utils/tools";
import getWeb3 from "@/utils/getWeb3";
import { leverageList, percentList } from "@/assets/data/data.json";
import CircularProgress from "@material-ui/core/CircularProgress";
import RouterContract from "../../contracts/UniswapV2Router02.json";

import {
  bigNumberify,
  formatEther,
  parseEther,
  keccak256,
  defaultAbiCoder,
  toUtf8Bytes,
  solidityPack,
} from "ethers-utils";

import BigNumber from "bignumber.js";
import {fixNumberTwo} from '@/utils/formater'
const cStrategyAllETHOnly = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const cStrategyLiquidate = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const cMockERC20 = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const cUniswapGoblin = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
class FarmModal extends React.Component {
  state = {
    persent1: "",
    persent2: "",
    // leverage:'2',
    weth: "",
    fund: "",
    usdt: "",
    totalDebt: "0.00",
    totalDebtUSDT: "0.00",
    totalLPs: "0.00",
    supplyValue: "0",
    supplyValue2: "0",
    tradingFeesAPY: "0.00",
    betaRewardsAPY: "0.00",
    ethBorrowingInterestAPY: "0.00",
    usdtBorrowingInterestAPY: "0.00",
    minETH: "2.0",
    maxETH: "4.0",
    minUSDT: "2.0",
    maxUSDT: "4.0",
    leverage: "2",
    wallet: "",
    walletUSDT: "",
    loanEth: "0.0",
    loanUSDT: "0.0",
    tradingfees: "0.00",
    ratio: "1",
    pairA: "0.00",
    pairB: "0.00",
    lp: "0.00",
  };
  async componentDidMount() {
    // this.ethBorrowingInterestAPY();

    const {
      index: { isMainnet, account },
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
    const walletUSDT = await usdt.methods.balanceOf(account).call();
    const {
      reserve0,
      reserve1,
    } = await IUniswapV2Pair.methods.getReserves().call();
    const ratio = BigNumber(reserve0).dividedBy(reserve1).toString();
    this.setState({
      wallet: formatEther(wallet),
      walletUSDT: formatEther(walletUSDT),
      totalDebt: BigNumber(this.state.loanUSDT)
        .plus(this.state.loanEth)
        .toFixed(2),
      ratio,
    });

    // this.state.loanUSD
    // this.state.loanEth
    // console.log(formatEther(wallet) )
    // console.log(1)
    // const web3 = await getWeb3();
    // console.log(2)
    // const accounts = await web3.eth.getAccounts();

    // Get the contract instance.
    // const networkId = await web3.eth.net.getId();
    // const web3 = await metaMasks()
    // const {index:{isMainnet}} = this.props
    // const wethNetwork = WETHContract.networks[isMainnet];

    // const weth = new web3.eth.Contract(
    //   WETHContract.abi,
    //   wethNetwork && wethNetwork.address,
    //   // config.contracts.weth
    // );
    // // console.log(weth)
    // const usdtNetwork = USDTContract.networks[isMainnet];
    // const usdt = new web3.eth.Contract(
    //   USDTContract.abi,
    //   usdtNetwork && usdtNetwork.address,
    //   // config.contracts.weth
    // );

    // const fundNetwork = FundContract.networks[isMainnet];
    // const fund = new web3.eth.Contract(
    //   FundContract.abi,
    //   fundNetwork && fundNetwork.address,
    //   // config.contracts.weth
    // );

    // this.setState({
    // weth,
    // usdt,
    // fund
    // })
  }
  // tradingfees = (eth,usdt)=>{
  //   const usdt = BigNumber(usdt).dividedBy(1000).multipliedBy(1.5)
  //   const loansum = BigNumber(value).plus(usdt)
  //   // const

  // }
  inputSupply = async (value) => {
    const { leverage, ratio, supplyValue2 } = this.state;
    let numberValue;
    numberValue = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
    numberValue = numberValue.replace(/^\./g, ""); //验证第一个字符是数字而不是.
    numberValue = numberValue.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.
    numberValue = numberValue
      .replace(".", "$#$")
      .replace(/\./g, "")
      .replace("$#$", ".");
    const loanEth = BigNumber(value)
      .multipliedBy(BigNumber(leverage).minus(1))
      .toFixed(2);
    const sum = BigNumber(value).plus(BigNumber(supplyValue2).dividedBy(ratio));
    // console.log(sum.toString())
    const pairA = BigNumber(sum).dividedBy(2).toFixed(2);
    const pairB = BigNumber(sum).dividedBy(2).multipliedBy(ratio).toFixed(2);
    const lp = Math.sqrt(BigNumber(pairA).multipliedBy(pairB).toString());
    // console.log(lp)
    this.setState({
      totalDebtETH: "3.00",
      totalDebtUSDT: "1.00",
      totalLPs: "1.00",
      supplyValue: numberValue,
      loanEth,
      totalDebt: BigNumber(this.state.loanUSDT).plus(loanEth).toFixed(2),
      // tradingfees:(BigNumber(BigNumber(value).multipliedBy(0.003)).dividedBy(BigNumber(value).plus(loanEth))).toFixed(10)
      tradingfees: BigNumber(
        BigNumber(
          BigNumber(value).plus(
            BigNumber(this.state.supplyValue2).dividedBy(ratio)
          )
        ).multipliedBy(0.003)
      )
        .dividedBy(
          BigNumber(BigNumber(this.state.loanUSDT).plus(loanEth))
            .plus(value)
            .plus(BigNumber(this.state.supplyValue2).dividedBy(ratio))
        )
        .toFixed(5),
      // ethBorrowingInterestAPY:this.ethBorrowingInterestAPY()
      pairA,
      pairB,
      lp,
    });

    // this.props.dispatch({
    //   type: 'farm/updateState',
    //   payload:{
    //     pairA,
    //     pairB
    //   }
    // })
  };
  ethBorrowingInterestAPY = async () => {
    // console.log("oooo")
    const {
      index: { isMainnet, account },
    } = this.props;
    const {
      weth,
      bank,
      web3,
      router,
      factory,
      usdt,
      InterestModel,
    } = await tools(isMainnet);
    console.log("oooo")
    const balance = await web3.eth.getBalance(
      "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    )//查询eth
    console.log(balance,"hhhhh")
    const ratePerSec = await InterestModel.methods.getInterestRate(
      this.state.totalDebt,
      balance
    ).call();

    // const debt_apy = BigNumber(ratePerSec)
    //   .multipliedBy(86400)
    //   .multipliedBy(365)
    //   .dividedBy(BigNumber(1).pow(14))
    //   .toFixed(6);
   
    // return  debt_apy
  };

  inputSupplyusdt = (value) => {
    const { leverage, ratio, supplyValue } = this.state;
    let numberValue;
    numberValue = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
    numberValue = numberValue.replace(/^\./g, ""); //验证第一个字符是数字而不是.
    numberValue = numberValue.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.
    numberValue = numberValue
      .replace(".", "$#$")
      .replace(/\./g, "")
      .replace("$#$", ".");
    const loanUSDT = fixNumberTwo(BigNumber(value)
      .dividedBy(ratio)
      .multipliedBy(leverage - 1).toString())
    

    const sum = BigNumber(value).dividedBy(ratio).plus(BigNumber(supplyValue));
    // console.log(sum)
    const pairA =fixNumberTwo(BigNumber(sum).dividedBy(2).toString());
    const pairB = BigNumber(sum).dividedBy(2).multipliedBy(ratio).toFixed(2);
    const lp = Math.sqrt(BigNumber(pairA).multipliedBy(pairB).toString());
    this.setState({
      totalDebtETH: "3.00",
      totalDebtUSDT: "1.00",
      totalLPs: "1.00",
      supplyValue2: numberValue,
      loanUSDT,
      totalDebt: BigNumber(loanUSDT).plus(this.state.loanEth).toFixed(2),
      tradingfees: BigNumber(
        BigNumber(
          BigNumber(this.state.supplyValue).plus(
            BigNumber(value).dividedBy(ratio)
          )
        ).multipliedBy(0.003)
      )
        .dividedBy(
          BigNumber(BigNumber(loanUSDT).plus(this.state.loanEth))
            .plus(value)
            .plus(BigNumber(this.state.supplyValue2).dividedBy(ratio))
        )
        .toFixed(5),
      pairA,
      pairB,
      lp,
    });
  };
  changePersent1 = (value) => () => {
    const { wallet, walletUSDT } = this.state;
    if (!this.state.supplyValue) {
      this.setState({
        persent1: value,
        supplyValue: "0.00",
        totalDebtETH: "0.00",
        totalDebtUSDT: "0.00",
        totalLPs: "0.00",
      });
    } else {
      this.setState(
        {
          persent1: value,
          supplyValue: BigNumber(wallet).multipliedBy(value).toFixed(2),
          totalDebtETH: "3.00",
          totalDebtUSDT: "3.00",
          totalLPs: "3.00",
        },
        () => {
          this.inputSupply(this.state.supplyValue);
        }
      );
    }
  };

  changePersent2 = (value) => () => {
    const { walletUSDT } = this.state;
    if (!this.state.supplyValue) {
      this.setState({
        persent2: value,
        supplyValue2: "0.00",
        totalDebtETH: "0.00",
        totalDebtUSDT: "0.00",
        totalLPs: "0.00",
      });
    } else {
      this.setState(
        {
          persent2: value,
          supplyValue2: walletUSDT * value,
          totalDebtETH: "3.00",
          totalDebtUSDT: "3.00",
          totalLPs: "3.00",
        },
        () => {
          this.inputSupplyusdt(this.state.supplyValue2);
        }
      );
    }
  };
  cancel = async () => {
    await this.props.dispatch({
      type: "farm/updateState",
      payload: {
        farmModal: false,
      },
    });
  };
  checkLeverage = (value) => async () => {
    const { dispatch } = this.props;
    // await  dispatch({
    //   type: 'farm/updateState',
    //   payload:{
    //     leverage:value
    //   }
    // })
    this.setState({
      totalDebtETH: "3.00",
      totalDebtUSDT: "3.00",
      totalLPs: "3.00",
      tradingFeesAPY: "3.00",
      betaRewardsAPY: "3.00",
      ethBorrowingInterestAPY: "3.00",
      usdtBorrowingInterestAPY: "3.00",
      leverage: value,
    });
  };

  getMyPositions = async () => {
    const {
      index: { isPc, isMainnet, account },
      dispatch,
    } = this.props;
    const {bank} = await tools(isMainnet);
    if (account) {
      const len = await bank.methods.nextPositionID().call();
      let myPositions = [];
      for (let i = 1; i <= len; i++) {
        const position = await bank.methods.positions(i).call();
        if (position.owner === account && position.debtShare != 0) {
          position.id = i;
          const x = await bank.methods.positionInfo(i).call();
          position.positionvalue = fixNumberTwo(
            Number(formatEther(x[0]).toString())
          );
          position.totaldebt = fixNumberTwo(
            Number(formatEther(x[1]).toString())
          );
          position.debtRatio = fixNumberTwo(
            Number(
              BigNumber(x[1])
                .dividedBy(BigNumber(x[0]).plus(x[1]))
                .multipliedBy(100)
                .toString()
            )
          );
          position.currentAPY = fixNumberTwo(
            BigNumber(BigNumber(x[0]).plus(x[1]))
              .dividedBy(x[0])
              .multipliedBy(100)
              .multipliedBy(0.15)
              .toString()
          );
            position.rewards = "0.00";
        }
        myPositions.push(position);
      }
      this.props.dispatch({
        type: "farm/updateState",
        payload: {
          myPositions: myPositions,
        },
      });
    }
  };
  leverMining = async (leverage) => {
    const {
      index: { isMainnet, account },
    } = this.props;
    const { weth, bank, web3, router, IUniswapV2Pair, factory } = await tools(
      isMainnet
    );
    const { supplyValue, totalDebt } = this.state;
    await bank.methods
      .work(
        0,
        // goblin.address,
        cUniswapGoblin,
        web3.utils.toWei(totalDebt, "ether"),
        "0",
        web3.eth.abi.encodeParameters(
          ["address", "bytes"],
          [
            cStrategyAllETHOnly,
            web3.eth.abi.encodeParameters(
              ["address", "uint256"],
              [cMockERC20, "0"]
            ),
          ]
        )
      )
      .send({ value: web3.utils.toWei("1", "ether"), from: account });
     this.getMyPositions()
  };
  supply = async () => {


    const {
      farm: { leverage },
    } = this.props;
    const {totalDebt} = this.state
    
    await this.leverMining(leverage);
    await this.props.dispatch({
      type: "farm/updateState",
      payload: {
        farmModal: false,
      },
    });
    // this.props.getMyPositions()
    //  await dispatch({
    //     type:"farm/init",
    //     // payload:{
    //     //   isMainnet: networkId,
    //     // }
    //   })
  };
  render() {
    const {
      persent1,
      persent2,
      totalDebtETH,
      totalDebtUSDT,
      totalLPs,
      supplyValue,
      supplyValue2,
      tradingFeesAPY,
      betaRewardsAPY,
      ethBorrowingInterestAPY,
      usdtBorrowingInterestAPY,
      minETH,
      maxETH,
      minUSDT,
      maxUSDT,
      open,
      leverage,
      loanUSDT,
      loanETH,
      totalDebt,
      tradingfees,
      pairA,
      pairB,
      lp,
    } = this.state;

    const {
      index: { isPc },
    } = this.props;
    // console.log(parseFloat(maxETH) < parseFloat(totalDebt))
    return (
      <Modal
        content={
          <div className="farmModal">
            {/* <CircularProgress className="backdrop" /> */}
            {/* <div > */}
            {/* <Backdrop  open={false} className="backdrop"> */}
            <div className="cancel" onClick={this.cancel}>
              <img src={cancel1x} srcSet={`${cancel2x} 2x, ${cancel3x} 3x`} />
            </div>
            <div className="title">Supply Uniswap ETH Pool</div>
            <div className="rows">
              <span>
                Total Debt（min:{minETH} ETH,max:{maxETH} ETH）
                <Tooltip
                  title="Minimum debt size is imposed to ensure that liquidators have enough incentive to liquidators have enough incentive to liquidate undercollateralized positions"
                  placement="bottom"
                >
                  <img src={tip11x} srcSet={`${tip12x} 2x, ${tip13x} 3x`} />
                </Tooltip>
              </span>
              <span
                className={classnames({
                  active:
                    parseFloat(minETH) > parseFloat(totalDebt) ||
                    parseFloat(maxETH) < parseFloat(totalDebt),
                  right: true,
                })}
              >
                {totalDebt} ETH
              </span>
            </div>
            {/* <div className="rows">
                  <span>Total Debt（min:{minUSDT} USDT,max:{maxUSDT} USDT）
                      <Tooltip title="Minimum debt size is imposed to ensure that liquidators have enough incentive to liquidators have enough incentive to liquidate undercollateralized positions" placement="bottom">
                          <img src={tip11x} srcSet={`${tip12x} 2x, ${tip13x} 3x`} />
                      </Tooltip>
                    </span> 
                  <span className={classnames({"active":parseFloat(minUSDT) >parseFloat(totalDebtUSDT) && parseFloat(maxUSDT) < parseFloat(totalDebtUSDT),"right":true})}>{totalDebtUSDT} USDT</span>
              </div> */}
            <div className="rows">
              <span>
                Slippage and trading fees
                <Tooltip
                  title="Minimum debt size is imposed to ensure that liquidators have enough incentive to liquidators have enough incentive to liquidate undercollateralized positions"
                  placement="bottom"
                >
                  <img src={tip11x} srcSet={`${tip12x} 2x, ${tip13x} 3x`} />
                </Tooltip>
              </span>
              <span
                className={classnames({
                  active:
                    parseFloat(minUSDT) > parseFloat(totalDebtUSDT) &&
                    parseFloat(maxUSDT) < parseFloat(totalDebtUSDT),
                  right: true,
                })}
              >
                {tradingfees}
              </span>
            </div>
            <div className="rows">
              <span>
                Total UNlv2 ETH/USDT LPs
                <Tooltip
                  title="Accounting for 0.000% of LPs pool"
                  placement="bottom"
                >
                  <img src={tip11x} srcSet={`${tip12x} 2x, ${tip13x} 3x`} />
                </Tooltip>
              </span>
              <span>{lp}</span>
            </div>
            <div className="divider"></div>
            <div className="rows">
              <span> Trading Fees APY（7-day avg.）</span>
              <div>
                <span style={{ textDecoration: "line-through" }}>9.39%</span>
                <img
                  src={midjt1x}
                  srcSet={`${midjt2x} 2x, ${midjt3x} 3x`}
                  style={{
                    width: "21px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                />
                <span>{tradingFeesAPY}%</span>
              </div>
            </div>
            <div className="rows">
              <span>
                {" "}
                Beta Rewards APY
                <Tooltip
                  title="The liquidity mining starts on Nov 12nd,2020 12PM UTC and ends on Dec 12nd,2020 12PM UTC. You can claim this by clicking on the wallet address on the top right"
                  placement="bottom"
                >
                  <img src={tip11x} srcSet={`${tip12x} 2x, ${tip13x} 3x`} />
                </Tooltip>
              </span>
              <div>
                <img
                  src={slogo1x}
                  srcSet={`${slogo2x} 2x, ${slogo3x} 3x`}
                  style={{ width: "0.21rem", marginRight: "10px" }}
                />
                <span style={{ color: "#7070da" }}>{betaRewardsAPY}%</span>
              </div>
            </div>
            {/* <div className="rows">
                <span> ETH Borrowing Interest APY</span> 
                <div>
                    <span style={{textDecoration:"line-through"}}>9.39%</span>
                    <img src={midjt1x} srcSet={`${midjt2x} 2x, ${midjt3x} 3x`} style={{width:"21px",marginLeft:'10px',marginRight:'10px'}}/>
                    <span>{ethBorrowingInterestAPY}%</span>
                </div>
              </div> */}
            <div className="rows">
              <span>Borrowing Interest APY</span>
              <div>
                <span style={{ textDecoration: "line-through" }}>9.39%</span>
                <img
                  src={midjt1x}
                  srcSet={`${midjt2x} 2x, ${midjt3x} 3x`}
                  style={{
                    width: "21px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                />
                <span>{ethBorrowingInterestAPY}%</span>
              </div>
            </div>
            <div className="rows">
              <span> Total APY</span>
              <div>
                <span style={{ textDecoration: "line-through" }}>9.39%</span>
                <img
                  src={midjt1x}
                  srcSet={`${midjt2x} 2x, ${midjt3x} 3x`}
                  style={{
                    width: "21px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                />
                <span>{usdtBorrowingInterestAPY}%</span>
              </div>
            </div>
            <div className="supply">How much would you like to supply?</div>
            <div className="supplyInput">
              <img
                src={eth1x}
                srcSet={`${eth2x} 2x, ${eth3x} 3x`}
                style={
                  isPc
                    ? { width: "37px", height: "37px" }
                    : { width: "25px", height: "25px" }
                }
              />
              {/* <Input defaultValue="Hello world"  /> */}
              <TextField
                // label="Normal"
                id="outlined-margin-normal"
                // defaultValue="0"
                value={supplyValue}
                // className={classes.textField}
                // disabled = {true}
                margin="normal"
                variant="outlined"
                onChange={(e) => this.inputSupply(e.target.value)}
                placeholder="Enter the amount"
              />
              <span>ETH</span>
            </div>
            <ul className="percent">
              {percentList.map((item) => (
                <li
                  className={classnames({ active: persent1 === item })}
                  onClick={this.changePersent1(item)}
                  key={item}
                >
                  {item}%
                </li>
              ))}
              {/* <li className={classnames({"active":persent === '25'})} onClick={this.changePersent('25')}>25%</li>
                    <li className={classnames({"active":persent === '50'})} onClick={this.changePersent('50')}>50%</li>
                    <li className={classnames({"active":persent === '75'})} onClick={this.changePersent('75')}>75%</li>
                    <li className={classnames({"active":persent === '100'})} onClick={this.changePersent('100')}>100%</li> */}
            </ul>

            <div className="supplyInput">
              <img
                src={usdt1x}
                srcSet={`${usdt2x} 2x, ${usdt3x} 3x`}
                style={
                  isPc
                    ? { width: "37px", height: "37px" }
                    : { width: "25px", height: "25px" }
                }
              />
              {/* <Input defaultValue="Hello world"  /> */}
              <TextField
                // label="Normal"
                id="outlined-margin-normal"
                // defaultValue="0"
                value={supplyValue2}
                // className={classes.textField}
                // disabled = {true}
                margin="normal"
                variant="outlined"
                onChange={(e) => this.inputSupplyusdt(e.target.value)}
                placeholder="Enter the amount"
              />
              <span>USDT</span>
            </div>
            <ul className="percent">
              {percentList.map((item) => (
                <li
                  className={classnames({ active: persent2 === item })}
                  onClick={this.changePersent2(item)}
                  key={item}
                >
                  {item}%
                </li>
              ))}
              {/* <li className={classnames({"active":persent === '25'})} onClick={this.changePersent('25')}>25%</li>
                    <li className={classnames({"active":persent === '50'})} onClick={this.changePersent('50')}>50%</li>
                    <li className={classnames({"active":persent === '75'})} onClick={this.changePersent('75')}>75%</li>
                    <li className={classnames({"active":persent === '100'})} onClick={this.changePersent('100')}>100%</li> */}
            </ul>
            <div className="leverage">
              <span>
                Leverage
                <Tooltip
                  title="1x means no leverage.Anything above 1x means Beta Margin will borrow some ETH on your behalf to supply more capital (capital you inputted + ETH borrowed) to the selected liquidity pool,so you can earn higher yield farming APY and trading fees APY."
                  placement="bottom"
                >
                  <img src={tip11x} srcSet={`${tip12x} 2x, ${tip13x} 3x`} />
                </Tooltip>
              </span>
            </div>
            <div className="leveragecon">
              <ul className="leverageinner">
                <li
                  className={classnames({
                    active: leverage === leverageList[0],
                    circle: true,
                  })}
                  onClick={this.checkLeverage(leverageList[0])}
                >
                  1X
                </li>
                <li className="line"></li>
                <li
                  className={classnames({
                    active: leverage === leverageList[1],
                    circle: true,
                  })}
                  onClick={this.checkLeverage(leverageList[1])}
                >
                  1.5X
                </li>
                <li className="line"></li>
                <li
                  className={classnames({
                    active: leverage === leverageList[2],
                    circle: true,
                  })}
                  onClick={this.checkLeverage(leverageList[2])}
                >
                  2X
                </li>
                <li className="line"></li>
                <li
                  className={classnames({
                    active: leverage === leverageList[3],
                    circle: true,
                  })}
                  onClick={this.checkLeverage(leverageList[3])}
                >
                  2.5X
                </li>
              </ul>
            </div>
            <div className="summary">
              <div>
                Summary
                <Tooltip
                  title="Minimum debt size is imposed to ensure that liquidators have enough incentive to liquidators have enough incentive to liquidate undercollateralized positions"
                  placement="bottom"
                >
                  <img src={tip11x} srcSet={`${tip12x} 2x, ${tip13x} 3x`} />
                </Tooltip>
              </div>
              <div className="sum1">
                <span>Assets supplied</span>
                <span>
                  {supplyValue} ETH + {supplyValue2} USDT
                </span>
              </div>
              <div className="sum2">
                <span>Assets in position value</span>
                <span>
                  {pairA} ETH + {pairB} USDT
                </span>
              </div>
            </div>
            <div className="supplybtncon">
              <div className="supplybtn" onClick={this.supply}>
                Supply {leverage}X
              </div>
            </div>
            {/* </div> */}
            {/* </Backdrop> */}
          </div>
        }
      ></Modal>
    );
  }
}

export default connect(({ farm, index }) => {
  return {
    farm,
    index,
  };
})(FarmModal);
