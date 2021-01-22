import React from "react";
import { connect } from "react-redux";
import Farm from "./farm";
import isPc from "@/utils/isPc";
// import Web3 from "web3";
class Home extends React.Component {
  componentDidMount = async () => {
    //  console.log(2222)

    // web3.version.getNetwork((err, netId) => {
    //   this.props.dispatch({
    //     type: "index/updateState",
    //     payload: {
    //       isMainnet: netId,
    //     },
    //   });
    // });

    const _this = this;
    ethereum.on("chainChanged", (networkIDstring) => {
      _this.props.dispatch({
        type: "index/updateState",
        payload: {
          isMainnet: networkIDstring,
        },
      });
    });
    ethereum.on("accountsChanged", function (accounts) {
      // Time to reload your interface with accounts[0]!
      // console.log(accounts)
      _this.props.dispatch({
        type: "index/updateState",
        payload: {
          account: accounts[0],
        },
      });
    });
    this.props.dispatch({
      type: "index/updateState",
      payload: {
        isPc: isPc(),
        // account:web3.eth.accounts[0]
        account: web3.eth.getAccounts[0],
      },
    });

    //         web3js.eth.isSyncing(function(error, sync){
    //           if(!error) {
    //               // stop all app activity
    //               if(sync === true) {
    //                  // we use `true`, so it stops all filters, but not the web3.eth.syncing polling
    //                  web3.reset(true);

    //               // show sync info
    //               } else if(sync) {
    //                  console.log(sync.currentBlock);

    //               // re-gain app operation
    //               } else {
    //                   // run your app init function...
    //               }
    //           }
    // })
  };

  render() {
    // console.log()
    // const {
    //   farm: { farmModal, metaModal, closePositions, claim },
    // } = this.props;
    return (
      <>
        <Farm></Farm>
        {/* <Layout>
                <Farm></Farm>
             </Layout> */}
      </>
    );
  }
}
// export default connect(({index}) => {
//   return {
//     index
//   };
// })(Home);
// export default Home

export default connect(({ index, farm }) => {
  return {
    index,
    farm,
  };
})(Home);
// export default WithDva((state) => { return { index: state.index }; })(Home);
