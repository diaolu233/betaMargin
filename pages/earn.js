import React from 'react'
import Layout from '@/components/Layout'
import Containerbox from '@/components/Container'
import Title from '@/components/Title'
import EarnTab from '@/components/EarnTab'
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import FarmModal from '@/components/FarmModal';
import MetaModal from '@/components/MetaModal';
import Claim from '@/components/Claim';
import ClosePosition from '@/components/ClosePosition';
import bg from '../static/bg-1@3x.png'
import isPc from '@/utils/isPc'
import mobilebg from '../static/mobile-1@3x.png'
import {metaMasks} from '@/utils/metaMask'
import tools from '@/utils/tools'
 class Earn extends React.Component {
  async   componentDidMount(){
    const web3 = await metaMasks()
      // const {index:{isMainnet}} = this.props
      // const {web3} = await tools(isMainnet)
      // console.log(web3.eth.getAccounts[0])
      // await   this.props.dispatch({
      //   type:'index/updateState',
      //   payload: {
      //     isPc:isPc(),
      //     account:web3.eth.getAccounts[0]
      //   }

      // })
      const networkId = await web3.eth.net.getId();
     
      this.props.dispatch({
        type:'index/updateState',
        payload: {
          isMainnet:networkId
        }
      })
      await  web3.eth.getAccounts((error, accounts)=> {
        if (error) {
            console.log(error);
        }
        const account  = accounts[0];
         this.props.dispatch({
          type:'index/updateState',
          payload: {
            account
          }
        })
      })
      // await  web3.version.getNetwork((err, netId) => {
      //       this.props.dispatch({
      //         type:'index/updateState',
      //         payload: {
      //           isMainnet:netId
      //         }
      //       })
      //     });
     
    // await    this.props.dispatch({
    //   type:'index/updateState',
    //   payload: {
    //     isPc:isPc(),
    //     account:web3.eth.getAccounts[0]
    //   }
    // })
          
     }
    render(){
        const {farm:{farmModal,metaModal,closePositions,claim},index:{isPc}} = this.props
        return (
            <React.Fragment>
            {/* <CssBaseline /> */}
            <Containerbox bg={isPc?bg:mobilebg}>
            <Container fixed>
                <Layout></Layout>
                <Title></Title>
                <EarnTab></EarnTab>
            </Container>
                {
                    farmModal&&<FarmModal></FarmModal>
                }
                {
                    metaModal&& <MetaModal></MetaModal>
                }
                {
                  closePositions&&<ClosePosition></ClosePosition>
                }
                {
                claim&&<Claim></Claim>
                } 
            </Containerbox>
            </React.Fragment>
        )
        
    }
}
export default connect(({index,farm}) => {
    return {
        index,
        farm
    };
  })(Earn);