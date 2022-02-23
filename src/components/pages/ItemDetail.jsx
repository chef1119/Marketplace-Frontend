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

const Colection= function(props) {

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
const [ isTimeOut, setIsTimeOut ] = useState(true);
const [ isMine, setIsMine ] = useState(false);
const [ isBided, setIsBided ] = useState(false);

const [isClaimable, setIsClaimable] = useState(false);
const [isWithdraw, setIsWithdraw] = useState(false);
const [nfts, setNfts] = useState([]);
let currentBidPrice = 0;

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
    currentBidPrice = result.currentPrice;
    setIsTimeOut(result.isTimeOut);
    setIsBided(result.bidedAmount>0);
    setNfts(bidList);

    setIsClaimable(isTimeOut && isBided && (account == topBidder));
    setIsWithdraw(isTimeOut && isBided && (account != topBidder));
}

const addingCrace = (event) => {
    let addingValue = parseInt(price/(10**18)) + parseInt(event.target.value);
    setBidAmount(addingValue);
}

const placeBid = async () => {

    await wrapper?.placeBid(account, bidAmount, tokenID, currentBidPrice);
}

const claimNFT = async () => {
    await wrapper?.claimNFT(tokenID);
}

const withdrawToken = async () => {
    await wrapper?.withdrawToken(tokenID);
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
                                
                                {
                                    isMine && (
                                        <>
                                    <h4>This your NFT</h4>
                                    </>)
                                }
                                {(!isTimeOut && !isMine) && (
                                    <>
                                        <br></br>
                                        <h2>+ <input className="input_addcrace" onChange={addingCrace} type="number" min={1}></input> = {bidAmount} CRACE</h2>
                                        <br></br>
                                        <ul className="de_nav">
                                            <li id='Mainbtn' className="active" onClick={placeBid}><span>Place a bid</span></li>
                                        </ul>
                                    </>
                                )}
                                {(isTimeOut && isBided && (account == topBidder) && !isMine) && (
                                    <>
                                    <br></br>
                                    <h4>Auction Ended</h4>
                                    <br></br>
                                    <ul className="de_nav">
                                        <li id='Mainbtn' className="active" onClick={claimNFT}><span>Claim NFT</span></li>
                                    </ul>
                                    </>
                                )}
                                {/* {(isTimeOut && isBided && (account != topBidder) && !isMine) && (
                                    <>
                                        <br></br>
                                        <h4>Auction Ended</h4>
                                        <br></br>
                                        <ul className="de_nav">
                                            <li id='Mainbtn' className="active" onClick={withdrawToken}><span>Withdraw Token</span></li>
                                        </ul>
                                    </>
                                )} */}
                                
                                <div className="spacer-20"></div>

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
export default Colection;