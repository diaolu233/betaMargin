import React from 'react'
import First from '@/components/First'
import {metaMasks} from '@/utils/metaMask'
import isPc from '@/utils/isPc'
export default class Salesreport extends React.Component {
    componentDidMount= async()=>{
        // metaMask()
            const web3js = await metaMasks()
                // console.log(a)
            web3js.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }
        
            const account  = accounts[0];
            
            
            })
    }
    getMetaMask = ()=>{
        metaMask()
    //   console.log(acount)
    }

    // componentDidMount(){
    //   console.log( isPc()) 
    // }
    render(){
        return (
            <First></First>
        )
        
    }
}