let web3Provider;
let account;
let web3js;
const metaMasks =  async () =>{
        
  return await connectMeta()
  // getAcount()
        // 获取用户账号
       
            // console.log(account)
            // App.contracts.Adoption.deployed().then(function(instance) {
            // adoptionInstance = instance;

            // // 发送交易领养宠物
            // return adoptionInstance.adopt(petId, {from: account});
            // }).then(function(result) {
            // return App.markAdopted();
            // }).catch(function(err) {
            // console.log(err.message);
            // });
     



//         if (!web3.eth.coinbase) {//这个是判断你有没有登录，coinbase是你此时选择的账号
            
//           window.alert('Please activate MetaMask first.');
//           return;
//         }
//       // Checking if Web3 has been injected by the browser (Mist/MetaMask)
//         if (typeof web3 !== 'undefined') {
           
//             // Use the browser's ethereum provider
//             // web3.personal.sign(web3.fromUtf8("Hello from wanghui!"), web3.eth.coinbase, console.log);

// 　　　　　　　}
    //  return account
}
const connectMeta = async ()=>{
  // console.log(1)
  if (window.ethereum) {
    web3Provider = window.ethereum;
    try {
        // 请求用户授权
        await window.ethereum.enable();
    } catch (error) {
        // 用户不授权时
        console.error("User denied account access")
    }
    } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
      web3Provider = window.web3.currentProvider;
    } else {
      web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3js = new Web3(web3Provider)
 
  return web3js
  // console.log(account)
  
}
// const getAcount = ()=>{
  
// return account
// }
export {metaMasks}