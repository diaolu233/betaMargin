import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import earn1x from '../../static/earn.png'
import earn2x from '../../static/earn@2x.png'
import earn3x from '../../static/earn@3x.png'
import "./index.less"
 function Title(props) {
  return (
    <div className="earnTitle">
        <img src={earn1x} srcSet={`${earn2x} 2x, ${earn3x} 3x`}/>
        <span>Interest-bearing ETH (ibETH) Vault</span>
    </div>
  );
}
export default connect(({index}) => {
  return {
    index
  };
})(Title);