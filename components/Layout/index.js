import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import "./index.less";
import logo1x from "../../static/logo.png";
import logo2x from "../../static/logo@2x.png";
import logo3x from "../../static/logo@3x.png";
import wallet1x from "../../static/wallet.png";
import wallet2x from "../../static/wallet@2x.png";
import wallet3x from "../../static/wallet@3x.png";
// import { withRouter } from "next/router";
import ellipsis from "@/utils/ellipsis";

function Layout(props) {
  const { isPc } = props.index;

  const router = useRouter();

  if (router.pathname == "/farm") {
    router.push(`/`);
  }

  const changeTab = (newValue) => () => {
    router.push(`/${newValue}`);
  };

  const collectWallet = async () => {
    if (props.index.account) {
      await props.dispatch({
        type: "farm/updateState",
        payload: {
          claim: true,
        },
      });
    } else {
      await props.dispatch({
        type: "farm/updateState",
        payload: {
          metaModal: true,
        },
      });
    }
  };
  const toHome = () => {
    router.push("/");
  };

  return (
    // <Paper className={classes.root}>
    <>
      {isPc ? (
        <div className="layOutCon">
          <img
            src={logo1x}
            srcSet={`${logo2x} 2x, ${logo3x} 3x`}
            style={
              isPc
                ? { width: "248px", height: "49px", cursor: "pointer" }
                : { width: "90px" }
            }
            onClick={toHome}
          />
          <ul className="tabTitle">
            <li
              onClick={changeTab("farm")}
              className={classnames({ active: router.pathname == "/" })}
            >
              <span>Farm</span>

              {router.pathname == "/" ? (
                <span className="actline"></span>
              ) : (
                <span className="line"></span>
              )}
            </li>
            <li
              onClick={changeTab("earn")}
              className={classnames({ active: router.pathname == "/earn" })}
            >
              <span>Earn</span>

              {router.pathname == "/earn" ? (
                <span className="actline"></span>
              ) : (
                <span className="line"></span>
              )}
            </li>
          </ul>

          <div className="rightbox">
            <div className="money">
              <img
                src={wallet1x}
                srcSet={`${wallet2x} 2x, ${wallet3x} 3x`}
                style={{ marginRight: "10px" }}
              />
              <span>{props.index.beta}</span>
              <span>Beta</span>
            </div>
            <div className="account">
              {/* <button className="walletBtn">
              Collect Wallet
            </button> */}
              {/* <Button variant="contained" color="primary" size='small'>
               
            </Button> */}
              <div className="collectWallet" onClick={collectWallet}>
                {props.index.account
                  ? ellipsis(props.index.account)
                  : "Collect Wallet"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="layOutConmb">
          <div className="layOutCon">
            <img
              src={logo1x}
              srcSet={`${logo2x} 2x, ${logo3x} 3x`}
              style={
                isPc ? { width: "248px", height: "49px" } : { width: "90px" }
              }
            />

            <div className="rightbox">
              <div className="money">
                <img
                  src={wallet1x}
                  srcSet={`${wallet2x} 2x, ${wallet3x} 3x`}
                  style={{ marginRight: "10px" }}
                />
                <span>0.000</span>
                <span>Beta</span>
              </div>
              <div className="account">
                {/* <button className="walletBtn">
              Collect Wallet
            </button> */}
                {/* <Button variant="contained" color="primary" size='small'>
               
            </Button> */}
                <div className="collectWallet" onClick={collectWallet}>
                  {props.index.account
                    ? ellipsis(props.index.account)
                    : "Collect Wallet"}
                </div>
              </div>
            </div>
          </div>
          <ul className="tabTitle">
            <li
              onClick={changeTab("farm")}
              className={classnames({ active: router.pathname == "/" })}
            >
              <span>Farm</span>

              {router.pathname == "/" ? (
                <span className="actline"></span>
              ) : (
                <span className="line"></span>
              )}
            </li>
            <li
              onClick={changeTab("earn")}
              className={classnames({ active: router.pathname == "/earn" })}
            >
              <span>Earn</span>

              {router.pathname == "/earn" ? (
                <span className="actline"></span>
              ) : (
                <span className="line"></span>
              )}
            </li>
          </ul>
        </div>
      )}
    </>

    // </Paper>
  );
}

export default 
  connect(({ farm, index }) => {
    return {
      farm,
      index,
    };
  })(Layout)


// withRouter(