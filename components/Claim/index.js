import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import logo1x from '../../static/logo.png'
import logo2x from '../../static/logo@2x.png'
import logo3x from '../../static/logo@3x.png'
import cancel1x from '../../static/cancel.png'
import cancel2x from '../../static/cancel@2x.png'
import cancel3x from '../../static/cancel@3x.png'
import Modal from '../Modal'
import slogo1x from '../../static/slogo@1x.png'
import slogo2x from '../../static/slogo@2x.png'
import slogo3x from '../../static/slogo@3x.png'
import "./index.less"
 function Claim(props) {
  const  cancel = async ()=>{
        await props.dispatch({
            type: 'farm/updateState',
            payload:{
                claim:false
            }
          })
    }
  const claim = async()=>{

  }
  return (
    <Modal content={
        <div className="claimModal">
          <div className="cancel" onClick={cancel}><img src={cancel1x} srcSet={`${cancel2x} 2x, ${cancel3x} 3x`} /></div>
          <div className="logosmall">
             <img src={logo1x} srcSet={`${logo2x} 2x, ${logo3x} 3x`} style={props.index.isPc?{}:{width:'2.0rem'}}/>
          </div>
          <div className="claimcon">
                <div className="claimInfo">
                        <div className="info">
                            <span>Claimable BETA Reward</span> 
                            <span>
                              <img src={slogo1x} srcSet={`${slogo2x} 2x, ${slogo2x} 3x`} style={{width:"0.21rem",marginRight:'10px'}}/>
                              0.000 BETA
                            </span>
                        </div>
                        <div className="info">
                            <span>Pending BETA Reward</span> 
                            <span>
                              <img src={slogo1x} srcSet={`${slogo2x} 2x, ${slogo2x} 3x`} style={{width:"0.21rem",marginRight:'10px'}}/>
                              0.000 BETA
                            </span>
                        </div>

                </div>
                <div className="claim" onClick={claim}>Claim</div>
          </div>
          
         
        </div>
    }>
    </Modal>
    
  );
}
export default connect(({index,farm}) => {
  return {
    index,
    farm
  };
})(Claim);