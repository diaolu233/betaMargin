import React from "react";
import Layout from "@/components/Layout";
import Positions from "@/components/Positions";
import Pools from "@/components/Pools";
import Containerbox from "@/components/Container";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import FarmModal from "@/components/FarmModal";
import MetaModal from "@/components/MetaModal";
import Claim from "@/components/Claim";
import ClosePosition from "@/components/ClosePosition";
import Refill from "@/components/Refill";
import { connect } from "react-redux";
import bg from "../static/bg@3x.png";
import mobilebg from "../static/mobile@3x.png";
import { metaMasks } from "@/utils/metaMask";
import tools from "@/utils/tools";
import {fixNumberTwo} from "@/utils/formater";
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
class Farm extends React.Component {
  state = {
    positionsList: [],
    positionValue: "0.00",
    totalDebt: "0.00",
    // utilizationRate:'0.00',
    myPositions: [],
    beta: "0.00",
  };
  componentDidMount = async () => {
    const {
      index: { isPc, isMainnet },
      dispatch,
    } = this.props;
    // if(account){
    //   const { weth, usdt, fund ,bank,router} = await tools(isMainnet);
    //   await usdt.methods.approve('0x05ff2b0db69458a0750badebc4f9e13add608c7f','0x05ff2b0db69458a0750badebc4f9e13add608c7f').send({from: account});
    //   var u = parseEther("6000000000000000").toString();
    //   await router.methods.addLiquidityETH('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', u, 0, 0, account, 9e9).send({from: account, value: 1e18});

    // }

    const web3 = await metaMasks();
    const networkId = await web3.eth.net.getId();

    await this.props.dispatch({
      type: "index/updateState",
      payload: {
        isMainnet: networkId,
      },
    });

    // let account;
    await web3.eth.getAccounts(async (error, accounts) => {
      // console.log(accounts)
      if (error) {
        console.log(error);
      }
    const  account = accounts[0];
      const { reward } = await tools(isMainnet);
      const beta = await reward.methods
        .balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
        .call();
       
     await this.props.dispatch({
        type: "index/updateState",
        payload: {
          account,
          beta: formatEther(beta),
        },
      });
      await  this.getMyPositions(account);

    });

  
  };
  farmModal() {
    // this.setState({
    //     farmModal:true
    // })
  }
  getMyPositions = async (account) => {

    const {
      index: { isPc, isMainnet},
      dispatch,
    } = this.props;
    const {bank} = await tools(isMainnet);

    // const positionValue = await bank.methods.totalETH().call();
    // const totalDebt = await bank.methods.glbDebtVal().call();
    // const utilizationRate = BigNumber(totalDebt)
    //   .dividedBy(positionValue)
    //   .multipliedBy(100)
    //   .toFixed(4);

    // this.setState(
    //   {
    //     positionValue: formatEther(`${positionValue}`),
    //     totalDebt: formatEther(`${totalDebt}`),
    //     utilizationRate: utilizationRate,
    //   }
    // );

    if (account) {
      // console.log(1)
      const len = await bank.methods.nextPositionID().call();
      let myPositions = [];
      for (let i = 1; i <= len; i++) {
        const position = await bank.methods.positions(i).call();
        if (position.owner === account && position.debtShare != 0) {
          position.id = i;
          const x = await bank.methods.positionInfo(i).call();
          position.positionvalue = fixNumberTwo(Number(formatEther(x[0]).toString())) 
          position.totaldebt = fixNumberTwo(Number(formatEther(x[1]).toString()));
          position.debtRatio =fixNumberTwo (Number(
            BigNumber(x[1])
              .dividedBy(BigNumber(x[0]).plus(x[1]))
              .multipliedBy(100)
              .toString()
          ))
          position.currentAPY = fixNumberTwo(
            BigNumber(BigNumber(x[0]).plus(x[1]))
              .dividedBy(x[0])
              .multipliedBy(100)
              .multipliedBy(0.15)
              .toString()
          ),
          position.rewards = "0.00";
          
        }
        myPositions.push(position);
       
      }
      
      this.props.dispatch({
        type: "farm/updateState",
        payload: {
          myPositions: myPositions,
        }
      });
    }

    // dispatch({
    //   type: "farm/init",
    //   // payload:{
    //   //   isMainnet: networkId,
    //   // }
    // });
  };
  render() {
    const {
      positionValue,
      totalDebt,
      utilizationRate,

      // myPositions
    } = this.state;

    const {
      farm: {
        farmModal,
        metaModal,
        closePositions,
        claim,
        refillModal,
        myPositions,
      },
      index: { isPc, account, beta },
    } = this.props;
   
    return (
      // <Container>
      <React.Fragment>
        {/* <CssBaseline /> */}
        <Containerbox bg={isPc ? bg : mobilebg}>
          <Container fixed>
            {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
            {/* <div> */}
            <Layout></Layout>
            <Positions myPositions={myPositions}></Positions>
            <Pools></Pools>
            {/* </div> */}
          </Container>
          {farmModal && (
            <FarmModal getMyPositions={this.getMyPositions}></FarmModal>
          )}
          {/* getMyPositions={(data)=>this.getMyPositions(data)} */}
          {metaModal && <MetaModal></MetaModal>}
          {closePositions && <ClosePosition></ClosePosition>}
          {claim && <Claim></Claim>}
          {refillModal && <Refill></Refill>}
        </Containerbox>
      </React.Fragment>
      // <>

      // </>

      //    </Container>
    );
  }
}
export default connect(({ index, farm }) => {
  return {
    index,
    farm,
  };
})(Farm);
