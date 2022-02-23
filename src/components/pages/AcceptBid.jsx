import React, { useContext, useEffect, useState } from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { Web3ModalContext } from '../../contexts/Web3ModalProvider';
import { Web3WrapperContext } from '../../contexts/Web3WrapperProvider';
import { ellipseAddress } from "../../utils/blockchain";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

// "&tokenID=" +  encodeURI(nft.nftID) +
// "&ownerAddr=" + encodeURI(nft.nftOwner) +
// "&img=" + encodeURI(nft.nftIpfs) + 
// "&topBidAddr=" + encodeURI(nft.topBidAddr) +
// "&topBidPrice=" + encodeURI(nft.topBidPrice) +
// "&deadline=" + encodeURI(nft.deadline), "_self")
  

const AcceptBid= function(props) {

const queryParams = new URLSearchParams(window.location.search);
const tokenName = queryParams.get('name');
const tokenID = queryParams.get('tokenID');
const ownerAddr = queryParams.get('ownerAddr');
const img_uri = queryParams.get('img');
const deadline = queryParams.get('deadline');
const description = queryParams.get('description');
const level = queryParams.get('level');
const createdTime = queryParams.get('createdTime');

const { connect, account } = useContext(Web3ModalContext);
const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);
const [ price, setPrice ] = useState();
const [ topBidder, setTopBidder ] = useState("");
const [ isChanged, change ] = useState(false);
const [ bidAmount, setBidAmount ] = useState(0);
const [ isTimeOut, setIsTimeOut ] = useState(false);
const [ bidCount, setBidCount ] = useState(1);
const [ isMine, setIsMine ] = useState(false);
const [nfts, setNfts] = useState([]);

useEffect(() => {
    if(wrapper) {
        getAuctionInfo();
        setIsMine(ownerAddr == account);
    }
}, [wrapper, isChanged]);

const getAuctionInfo = async () => {
    let result = await wrapper?.getAuctionInfo(tokenID);
    let bidList = await wrapper?.getBidList(tokenID);

    setPrice(result.currentPrice);
    setTopBidder(result.currentBidder);
    setBidAmount(result.currentPrice/(10**18));
    setIsTimeOut(result.isTimeOut);
    setBidCount(result.bidCount);
    setNfts(bidList);
}

const claimToken = async () => {
    await wrapper?.claimToken(tokenID);
}

const closeAuction = async () => {
    await wrapper?.closeAuction(tokenID);
}

return (
<div>
<GlobalStyles/>

  <section className='container'>
    <div className='row mt-md-5 pt-md-4'>

    <div className="col-md-6 text-center">
                            <img src={img_uri} className="img-fluid img-rounded mb-sm-30" alt=""/>
                        </div>
                        <div className="col-md-6">
                            <div className="item_info">
                                
                            Auction Deadline :
                                <div className="de_countdown">
                                    <span> {deadline} </span>
                                    (UTC Timezone)
                                </div>
                                <h2>{tokenName} (Level {level})</h2>
                                Creator's Description :
                                <br></br>
                                <span>{description}</span>
                                <br></br>
                                <br></br>
                                <h5>Creator</h5>
                                <div className="item_author">
                                    <span>{ownerAddr}</span>
                                </div>
                                <br></br>
                                <h5>Created at</h5>
                                <div className="item_author">
                                    <span>{createdTime} UTC</span>
                                </div>
                                <br></br>
                                <div className="item_author">
                                    <h4>Current Price : {price/(10**18)} CRACE</h4> 
                                </div>

                                <h4>Top Bid by :</h4>
                                <div className="item_author">
                                    {ellipseAddress(topBidder) != '0x0000...0000' ? (<span>{topBidder}</span>) : (<>No bidders yet</>) }
                                </div>
                                <br></br>
                                {(!isTimeOut) && (
                                    <>
                                        <h2>Auction Has Not Ended Yet</h2>
                                        <br></br>
                                        <span>You can claim token or withdraw nft after auction has ended</span>
                                    </>
                                )}
                                {(isTimeOut && (bidCount > 0)) && (
                                    <>
                                        <br></br>
                                        <h4>Auction Ended</h4>
                                        <br></br>
                                        <ul className="de_nav">
                                            <li id='Mainbtn' className="active" onClick={claimToken}><span>Claim Token</span></li>
                                        </ul>
                                    </>
                                )}
                                {(isTimeOut && (bidCount == 0)) && (
                                    <>
                                        <br></br>
                                        <h4>Auction Ended But No Bidders</h4>
                                        <br></br>
                                        <ul className="de_nav">
                                            <li id='Mainbtn' className="active" onClick={closeAuction}><span>Close Auction</span></li>
                                        </ul>
                                    </>
                                )}
                                
                                <div className="spacer-40"></div>

                                <div className="de_tab">
    
                                <ul className="de_nav">
                                    <span className="bidhistory">Bids History</span>
                                </ul>
                                
                                <div className="de_tab_content">
                                    <div className="tab-1 onStep fadeIn">
                                    {nfts.map( (nft, index) => (
                                        <div className="p_list">
                                            <div className="p_list_pp">
                                                <span>
                                                    <img className="lazy" src="./img/author/favicon.png" alt=""/>
                                                    <i className="fa fa-check"></i>
                                                </span>
                                            </div>                                    
                                            <div className="p_list_info">
                                                <b>{nft.bidPrice} CRACE</b>
                                                <span>by <b>{ellipseAddress(nft.bidder)}</b> at  {nft.bidTime}</span>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                
                            </div>
                                
                            </div>
                        </div>

    </div>
  </section>

  <Footer />
</div>
);
}
export default AcceptBid;