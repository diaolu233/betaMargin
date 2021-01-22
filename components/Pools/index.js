import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./index.less";
import pool1x from "../../static/pool.png";
import pool2x from "../../static/pool@2x.png";
import pool3x from "../../static/pool@3x.png";
import eth1x from "../../static/eth.png";
import eth2x from "../../static/eth@2x.png";
import eth3x from "../../static/eth@3x.png";
import usdt1x from "../../static/usdt.png";
import usdt2x from "../../static/usdt@2x.png";
import usdt3x from "../../static/usdt@3x.png";
import up1x from "../../static/up.png";
import up2x from "../../static/up@2x.png";
import up3x from "../../static/up@3x.png";
import down1x from "../../static/down.png";
import down2x from "../../static/down@2x.png";
import down3x from "../../static/down@3x.png";
import tools from "@/utils/tools";
import {
  bigNumberify,
  formatEther,
  parseEther,
  keccak256,
  defaultAbiCoder,
  toUtf8Bytes,
  solidityPack,
} from "ethers-utils";
import {fixNumberTwo} from '@/utils/formater'
import BigNumber from "bignumber.js";
class Pools extends React.Component {
  state = {
    // farmModal:false
    count: 1,
    nowapy: "0.00",
    pastapy: "0.00",
    yieldFarming: "0.00",
    tradingFees: "0.01",
    betaRewards: "0.00",
    underlyingTokensETH: "0.00",
    underlyingTokensUSDT: "0.00",
    balance: "",
    balanceUSDT: "",
  };
  async componentDidMount() {
    const {
      index: { isMainnet, account },
    } = this.props;
    const { weth, bank, web3, router, factory, usdt } = await tools(isMainnet);
    const balance = await web3.eth.getBalance(
      "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    ); //查询eth
    const balanceUSDT = await usdt.methods
      .balanceOf("0x5FbDB2315678afecb367f032d93F642f64180aa3")
      .call();
    this.setState({
      balance:fixNumberTwo(formatEther(balance)),
      balanceUSDT:fixNumberTwo(formatEther(balanceUSDT)),
    });
   
  }

componentWillUnmount = () => {
  this.setState = (state,callback)=>{
    return;
  };
}
  farmModal = async () => {
    await this.props.dispatch({
      type: "farm/updateState",
      payload: {
        farmModal: true,
      },
    });
  };
  counter = (value) => () => {
    if (value === "up") {
      if (Number(this.state.count) >= 2.5) {
        return false;
      } else {
        this.setState({
          count:BigNumber(this.state.count).plus(0.5).toString(),
          tradingFees:  BigNumber(this.state.count).plus(0.5).multipliedBy(this.state.tradingFees).toString(),
        });
      }
    }
    if (value === "down") {
      if (Number(this.state.count) <= 1) {
        return false;
      } else {
        this.setState({
          count:  BigNumber(this.state.count).minus(0.5).toString(),
          tradingFees: BigNumber(this.state.count).minus(0.5).multipliedBy(this.state.tradingFees).toString(),
        });
      }
    }
  };
  render() {
    const {
      count,
      nowapy,
      pastapy,
      yieldFarming,
      tradingFees,
      betaRewards,
      underlyingTokensETH,
      underlyingTokensUSDT,
      balanceUSDT,
      balance,
    } = this.state;
    // const {coin} = this.props
    return (
      <div className="poolsCon">
        <div className="title">
          <img src={pool1x} srcSet={`${pool2x} 2x, ${pool3x} 3x`} />
          <span>All active pools</span>
        </div>

        <div className="list">
          <div className="poolsConInner">
            <ul className="listTitle">
              <li>Pool</li>
              <li>APY</li>
              <li>Underlying Tokens</li>
              <li>Leverage</li>
            </ul>
            <ul className="listCon">
              <li>
                <div className="coinLogo">
                  <img
                    src={eth1x}
                    srcSet={`${eth2x} 2x, ${eth3x} 3x`}
                    className="coin1"
                  />
                  <img
                    src={usdt1x}
                    srcSet={`${usdt2x} 2x, ${usdt3x} 3x`}
                    className="coin2"
                  />
                </div>
                <div className="coindetail">
                  <span
                    style={{
                      color: "#888888",
                      fontSize: "0.16rem",
                      marginBottom: "0.14rem",
                    }}
                  >
                    Liquidity Providing
                  </span>
                  <span>Uniswap</span>
                  <span>ETH/USDT</span>
                </div>
              </li>
              <li>
                <div>
                  <span>{nowapy}%</span>
                  <span style={{ textDecoration: "line-through" }}>
                    {pastapy}%
                  </span>
                </div>
                <div>
                  <span>Yield Farming</span>
                  <span>Trading Fees</span>
                  <span>Beta Rewards</span>
                </div>
                <div>
                  <span>{yieldFarming}%</span>
                  <span>{tradingFees}%</span>
                  <span>{betaRewards}%</span>
                </div>
              </li>
              <li>
                <div>
                  <img
                    src={eth1x}
                    srcSet={`${eth2x} 2x, ${eth3x} 3x`}
                    className="coin1"
                  />
                  <span>{balance} ETH</span>
                </div>
                <div>
                  <img
                    src={usdt1x}
                    srcSet={`${usdt2x} 2x, ${usdt3x} 3x`}
                    className="coin2"
                  />
                  <span>{balanceUSDT} USDT</span>
                </div>
              </li>
              <li>
                <div className="leverage">
                  <span>{count}</span>
                  <div className="counter">
                    <img
                      src={up1x}
                      srcSet={`${up2x} 2x, ${up3x} 3x`}
                      className="coin1"
                      onClick={this.counter("up")}
                    />
                    <img
                      src={down1x}
                      srcSet={`${down2x} 2x, ${down3x} 3x`}
                      className="coin1"
                      onClick={this.counter("down")}
                    />
                  </div>
                </div>
                <div className="farmbtn" onClick={this.farmModal}>
                  Farm <span>{count}x</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(({ index, farm }) => {
  return {
    index,
    farm,
  };
})(Pools);
