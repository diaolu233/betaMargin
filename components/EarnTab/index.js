
import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import EarnGlobalStats from '@/components/EarnGlobalStats';
import EarnHolding from '@/components/EarnHolding';
import EarnTab3 from '@/components/EarnTab3';
import classnames from 'classnames'
import "./index.less"
import IsPC from '../../utils/isPc';
 class EarnTab extends React.Component  {
  state={
    coin:'ETH'
  }
  changeTab = (coin)=>()=>{
      this.setState({
        coin
      })
  }
   render(){
     const {coin} = this.state 
     const {index:{isPc}} = this.props
    return (
      <div className="earnTab">
         {/* <ul className="earnTabTitle">
             <li className={classnames({"active":coin === 'ETH'})} onClick={this.changeTab('ETH')}>ETH（ibETH）</li>
             <li className={classnames({"active":coin === 'USDT'})} 
             onClick={this.changeTab('USDT')}>USDT（ibUSDT）</li>
         </ul> */}

         {
           isPc?
            <div className="tabCon">
              <EarnGlobalStats coin={coin}></EarnGlobalStats>
              <div className="righttab">
                  <EarnHolding coin={coin}></EarnHolding>
                  <EarnTab3 coin={coin}></EarnTab3>
              </div>
            </div>
            :
            <div className="tabConmb">
                {/* <EarnGlobalStats coin={coin}></EarnGlobalStats>
                <EarnHolding coin={coin}></EarnHolding> */}
                <EarnTab3 coin={coin}></EarnTab3>
            </div>
         }
         


         
      </div>
    );
  }
  
}
export default connect(({index}) => {
  return {
    index
  };
})(EarnTab);