import styled from 'styled-components';
import bg from '../../static/bg@3x.png'
// import bg from '../../static/bg-1@3x.png'
import React,{Children, useEffect} from 'react';
import { connect } from 'react-redux';
// import "./index.less"

// export default Container;



function Containerbox({children,bg}) {
    // console.log(bg)
    const Container = styled.div`
        background-image: url(${bg});
        background-repeat: no-repeat;
        /* background-size: cover; */
        background-size: 100% auto;
        /* -webkit-background-size: cover;
        -o-background-size: cover; */
        background-position: center 0;
        /* background-color:#f99; */
        width:100%;
        height:100%;
        padding-bottom:200px;

        /* width:'100%';
        height:800px;
        background-color:#f99; */
    `
  return (
    <Container>
       {children}
    </Container>
  );
}
export default connect(({index}) => {
  return {
    index
  };
})(Containerbox);