import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const inline = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  .d-inline{
    display: inline-block;
   }
`;

const slidermainparticle= () => (
 <div className="container">
    <div className="row align-items-center">
          <div className="col-md-6">
              <div className="spacer-single"></div>
              <h6> <span className="text-uppercase color">Coinracer Market</span></h6>
              <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
              <h1 className="col-white">Race. Win. Earn.</h1>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={900} triggerOnce>
              <p className="lead col-white">
              The one and the only low-poly multiplayer blockchain-powered skill-based racing game you can play to earn! With our smart contract-backed CoinracerSmartPool back-end, you can race and earn $CRACE tokens completely decentralized.
              </p>
              </Reveal>
              <div className="spacer-10"></div>

              {/* <Reveal className='onStep d-inline' keyframes={inline} delay={900} duration={1200} triggerOnce>
              <div className="row">
                  <div className="spacer-single"></div>
                  <div className="row">
                          <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                              <div className="de_count text-left">
                                  <h3><span>830</span></h3>
                                  <h5 className="id-color">Players</h5>
                              </div>
                          </div>

                          <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                              <div className="de_count text-left">
                                  <h3><span>196</span></h3>
                                  <h5 className="id-color">Listed Auctions</h5>
                              </div>
                          </div>

                          <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                              <div className="de_count text-left">
                                  <h3><span>757</span></h3>
                                  <h5 className="id-color">Traded</h5>
                              </div>
                          </div>
                      </div>
              </div>
              </Reveal> */}
          </div>
          <div className="col-md-6 xs-hide">
          <Reveal className='onStep d-inline' keyframes={inline} delay={300} duration={1200} triggerOnce>
              <img src="./img/misc/women-with-vr.png" className="img-fluid" alt=""/>
          </Reveal>
          </div>
      </div>
    </div>
);
export default slidermainparticle;