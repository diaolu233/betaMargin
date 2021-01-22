import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./index.less";
import person1x from "../../static/person.png";
import person2x from "../../static/person@2x.png";
import person3x from "../../static/person@3x.png";
import tools from "@/utils/tools";
import slogo1x from "../../static/slogo@1x.png";
import slogo2x from "../../static/slogo@2x.png";
import slogo3x from "../../static/slogo@3x.png";
import tip11x from "../../static/tip1.png";
import tip12x from "../../static/tip1@2x.png";
import tip13x from "../../static/tip1@3x.png";
import Tooltip from "@material-ui/core/Tooltip";
import {
  BigNumber,
  bigNumberify,
  formatEther,
  parseEther,
  keccak256,
  defaultAbiCoder,
  toUtf8Bytes,
  solidityPack,
} from "ethers-utils";
class Positions extends React.Component {
  state = {
    
  };
  
  componentDidMount() {
  
  }
  openClose = (id) => async () => {
    await this.props.dispatch({
      type: "farm/updateState",
      payload: {
        closePositions: true,
        id,
      },
    });
  };

  openRefill = (id)=> async () => {
    await this.props.dispatch({
      type: "farm/updateState",
      payload: {
        refillModal: true,
        id,
      },
    });
  };
  

  render() {
    const {
      index: { isPc, isMainnet, account },
      farm: { positionsList, myPositions },
      // positionValue,
      // totalDebt,
      // utilizationRate
    } = this.props;
    // const {positionsList} = this.state
    return (
      <div className="positionsCon">
        <div className="title">
          <img src={person1x} srcSet={`${person2x} 2x, ${person3x} 3x`} />
          <span>Your Positions</span>
        </div>
        {/* {
                isMainnet == 1 && account && positionsList.length === 0
                ?
                <div className="tip1">No active positions</div>
                :
               <div className="tip">
                  <img src={tip1x} srcSet={`${tip2x} 2x, ${tip3x} 3x`} />
                  <span>Please connect to a wallet on Ethereum Mainnet network</span>
                  <img src={jt1x} srcSet={`${jt2x} 2x, ${jt3x} 3x`} />
               </div>
              } */}

        {/* <div className="positions">
                <div className="positionsinner">
                   <ul className="title">
                         <li>ID</li>
                         <li>Farming Pool</li>
                         <li>Position Value</li>
                         <li>Total Debt</li>
                         <li>Debt Ratio</li>
                         <li>Current APY</li>
                         <li>Rewards Per Day</li>
                         <li></li>
                         <li></li>
                     </ul>
                     <ul className="positionInfo">
                             <li>#1220</li>
                             <li>Uniswap ETH/USDT</li>
                             <li></li>
                             <li>{totalDebt}</li>
                             <li>{utilizationRate}%</li>
                             <li>90.50%</li>
                             <li style={{display:'flex',alignItems:'center'}}>
                                  <img src={slogo1x} srcSet={`${slogo2x} 2x, ${slogo3x} 3x`} style={{width:"0.21rem",height:"0.21rem", marginRight:'3px'}}/>
                                  <span>0909</span> 
                                  <Tooltip title="Minimum debt size is imposed to ensure that liquidators have enough incentive to liquidators have enough incentive to liquidate undercollateralized positions" placement="bottom">
                                    <img src={tip11x} srcSet={`${tip12x} 2x, ${tip13x} 3x`} style={{width:"0.14rem",height:"0.14rem", marginLeft:'3px'}}/>
                                  </Tooltip>
                             </li>
                             <li>
                                 <div className="close" onClick={this.openClose}>
                                   close
                                 </div>
                                 
                             </li>
                             <li>
                             <div className="refill" onClick={this.openRefill}>
                                   Refill
                                 </div>
                             </li>
                     </ul>
                </div>
              
              </div> */}

        {myPositions.length !== 0 && (
          <div className="positions">
            <div className="positionsinner">
              <ul className="title">
                <li>ID</li>
                <li>Farming Pool</li>
                <li>Position Value</li>
                <li>Total Debt</li>
                <li>Debt Ratio</li>
                <li>Current APY</li>
                <li>Rewards Per Day</li>
                <li></li>
                <li></li>
              </ul>
              {myPositions.map((item) => (
                <ul className="positionInfo" key={item.id}>
                  <li>#{item.id}</li>
                  <li>Uniswap ETH/USDT</li>
                  <li>{item.positionvalue}ETH</li>
                  <li>{item.totaldebt}ETH</li>
                  <li>{item.debtRatio}%</li>
                  <li>{item.currentAPY}%</li>
                  <li>
                    <img
                      src={slogo1x}
                      srcSet={`${slogo2x} 2x, ${slogo3x} 3x`}
                      style={{
                        width: "0.21rem",
                        height: "0.21rem",
                        marginRight: "3px",
                      }}
                    />
                    <span>{item.rewards}</span>
                    <Tooltip
                      title="Minimum debt size is imposed to ensure that liquidators have enough incentive to liquidators have enough incentive to liquidate undercollateralized positions"
                      placement="bottom"
                    >
                      <img
                        src={tip11x}
                        srcSet={`${tip12x} 2x, ${tip13x} 3x`}
                        style={{
                          width: "0.14rem",
                          height: "0.14rem",
                          marginLeft: "3px",
                        }}
                      />
                    </Tooltip>
                  </li>
                  <li>
                    <div className="close" onClick={this.openClose(item.id)}>
                      close
                    </div>
                  </li>
                  <li>
                    <div className="refill" onClick={this.openRefill(item.id)}>
                      Refill
                    </div>
                  </li>
                </ul>
              ))}
              {/* <ul className="positionInfo">
                             <li>#1220</li>
                             <li>Uniswap ETH/USDT</li>
                             <li>Position Value</li>
                             <li>Total Debt</li>
                             <li>60.17%</li>
                             <li>90.50%</li>
                             <li>Rewards Per Day</li>
                             <li>
                                 <div className="close" onClick={openClose}>
                                   close
                                 </div>
                             </li>
                      </ul> */}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(({ index, farm }) => {
  return {
    index,
    farm,
  };
})(Positions);
