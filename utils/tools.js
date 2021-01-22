import { metaMasks } from "@/utils/metaMask";
import getWeb3 from "@/utils/getWeb3";
import WETHContract from "../contracts/WETH.json";
import USDTContract from "../contracts/MockERC20.json";
// import USDTContract from "../contracts/MockERC20.json";
import RouterContract from "../contracts/UniswapV2Router02.json";
import BankContract from "../contracts/Bank.json"; 
// import VaultContract from "../contracts/VaultManager.json";
// import FundContract from "../contracts/Strataegy1ForUniswap.json";
import FactoryContract from "../contracts/UniswapV2Factory.json";
import config from "./config.dev.json";
import StrategyAllETHOnly from "../contracts/StrategyAllETHOnly.json";
import StrategyLiquidate from "../contracts/StrategyLiquidate.json"; 
import goblin from "../contracts/Goblin.json"; 
import IUniswapV2PairContract from "../contracts/IUniswapV2Pair.json";
// import UniswapV2Factory from "../contracts/UniswapV2Factory.json";
// import FactoryContract from "./contracts/UniswapV2Factory.json";
import InterestModelContract from "../contracts/InterestModel.json";
import StrategyWithdrawMinimizeTradingContract from  "../contracts/StrategyWithdrawMinimizeTrading.json"






async function tools(isMainnet) {
  // const web3 = await metaMasks();
  const cWETH='0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
  const cMockERC20='0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const unireward='0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
  const cStrategyAllETHOnly='0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
  const cStrategyLiquidate='0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
  const cSimpleBankConfig='0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';
  const cBank='0x0165878A594ca255338adfa4d48449f69242Eb8F';
  const cStakingRewards='0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';
  const cUniswapGoblin='0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6';
  const web3 = await getWeb3();
  // const {index:{isMainnet}} = this.props
  //   try {
  //     // 请求用户授权
  //     await window.ethereum.enable();
  // } catch (error) {
  //     // 用户不授权时
  //     console.error("User denied account access")
  // }

  try {
  const wethNetwork = await WETHContract.networks[isMainnet];
  // console.log(WETHContract)
  const weth = await new web3.eth.Contract(
    WETHContract.abi,
    // wethNetwork && wethNetwork.address
    // '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    cWETH
    // config.contracts.weth
  );

  const usdtNetwork = await USDTContract.networks[isMainnet];
  // console.log( USDTContract)
  const usdt = await new web3.eth.Contract(
    USDTContract.abi,
    // usdtNetwork && usdtNetwork.address
    // '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
    // config.contracts.weth
    cMockERC20
  );

  const reward = await new web3.eth.Contract(
    USDTContract.abi,
    // usdtNetwork && usdtNetwork.address
    // '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
    // config.contracts.weth
    unireward
  );

  // console.log(a,98989898)

  const bankNetwork = await BankContract.networks[isMainnet];
  // console.log(BankContract)
  const bank = await new web3.eth.Contract(
    BankContract.abi,
    // bankNetwork && bankNetwork.address
    cBank
    
    // config.contracts.weth
  );
  // console.log(bankNetwork,99)
  // }




  //  const routerNetwork = RouterContract.networks[isMainnet];
  //  console.log(RouterContract,88)
      const router = await new web3.eth.Contract(
        RouterContract.abi,
        // routerNetwork && routerNetwork.address,
        '0x05ff2b0db69458a0750badebc4f9e13add608c7f'
        // config.contracts.weth
      );

    let factoryadd = await router.methods.factory().call()
    const FactoryNetwork = await FactoryContract.networks[isMainnet];
    const factory = await new web3.eth.Contract(
      FactoryContract.abi,
      // FactoryNetwork  && FactoryNetwork.address
      factoryadd
    );

    const InterestModelNetwork = await InterestModelContract.networks[isMainnet];
    const InterestModel = new web3.eth.Contract(
        InterestModelContract.abi,
      // routerNetwork && routerNetwork.address,
      // '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
        InterestModelNetwork && InterestModelNetwork.address,
      // config.contracts.weth
    );

    const IUniswapV2Pairaddress = await factory.methods.getPair(cMockERC20, cWETH).call()
    const IUniswapV2PairNetwork = await IUniswapV2PairContract.networks[isMainnet];
    const IUniswapV2Pair = await new web3.eth.Contract(
      IUniswapV2PairContract.abi,
      // routerNetwork && routerNetwork.address,
      // '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
      // IUniswapV2PairNetwork && IUniswapV2PairNetwork.address,
      // config.contracts.weth
      IUniswapV2Pairaddress
    );
  
    // console.log(IUniswapV2PairContract,99)

    // const IUniswapV2Pair = new web3.eth.Contract(
    //   IUniswapV2PairContract.abi,
    //   config.contracts.factory
    // );
    // const routerNetwork = RouterContract.networks[isMainnet];
    // const router = new web3.eth.Contract(
    //   RouterContract.abi,
    //   routerNetwork && routerNetwork.address,
    //   // config.contracts.weth
    // );
  // let vault_weth;
  // let vault_usdt;
  // let fund;
  // if (weth._address && usdt._address) {
  //   const fundNetwork = await FundContract.networks[isMainnet];
  //   fund = await new web3.eth.Contract(
  //     FundContract.abi,
  //     fundNetwork && fundNetwork.address
  //   );

  //   // const _vault_weth = await bank.methods.get_vault(weth._address).call();
  //   // vault_weth = await new web3.eth.Contract(
  //   //   // VaultContract.abi,
  //   //   BankContract.abi,
  //   //   _vault_weth
  //   //   // config.contracts.weth
  //   // );

  //   // const _vault_usdt = await bank.methods.get_vault(usdt._address).call();
  //   // vault_usdt = await new web3.eth.Contract(
  //   //   VaultContract.abi,
  //   //   _vault_usdt
  //   //   // config.contracts.weth
  //   // );
  // }

  return {
    web3,
    weth,
    usdt,
    // fund,
    // vault_weth,
    usdt,
    bank,
    // vault_usdt,
    router,
    factory,
    InterestModel,
    IUniswapV2Pair,
    reward
  };

} catch (error) {
  // 用户不授权时

  console.log(error)
  return false
}


}
export default tools;
