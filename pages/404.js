import React from 'react'
import First from '@/components/First'
import {metaMasks} from '@/utils/metaMask'
import isPc from '@/utils/isPc'
export default class Error extends React.Component {
    componentDidMount= async()=>{
       
           
    }
  

    // componentDidMount(){
    //   console.log( isPc()) 
    // }
    render(){
        return (
           <div>
               您的页面找不到啦！
           </div>
        )
        
    }
}