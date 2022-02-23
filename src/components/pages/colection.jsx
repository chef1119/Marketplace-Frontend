import React, {useState, useContext, useEffect} from "react";
// import ColumnZero from '../components/ColumnZero';
import ColumnZeroTwo from '../components/ColumnZeroTwo';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { Web3ModalContext } from "../../contexts/Web3ModalProvider"
import { ellipseAddress } from "../../utils/blockchain";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
  .caption {
    margin-top: -3%;
  }
`;

const Colection= function() {
const { connect, disconnect, account } = useContext(Web3ModalContext);

useEffect(() => {
  // handleBtnClick1();
}, []);



return (
<div>
<GlobalStyles/>
<div id="main_wrapper">
  <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'./img/background/4.jpg'})`}}>

  </section>

  <section className='container d_coll no-top no-bottom'>
    <div className='row'>
      <div className="col-md-12">
        <div className="d_profile">
                  <div className="profile_avatar">
                      <h1 className="caption">My Cars</h1>
                      
                      <div className="profile_name">
                        {!account ? (
                          <h4>
                              Please Connect Wallet                                                
                              <div className="clearfix"></div>
                          </h4>
                        ) : (
                          <h4>
                              Address                                                
                              <div className="clearfix"></div>
                              <span id="wallet" className="profile_wallet">{ellipseAddress(account)}</span>
                          </h4>
                        )}
                      </div>
                  </div>

          </div>
      </div>
    </div>
  </section>
  <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
              <div className="items_filter">
                {account && (
                <ul className="de_nav">
                    <ColumnZeroTwo address={account}/>
                </ul>
                )}
            </div>
          </div>
        </div> 
      </section>
      </div>
  <Footer />
</div>
);
}
export default Colection;