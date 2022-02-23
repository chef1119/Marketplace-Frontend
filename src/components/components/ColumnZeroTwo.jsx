import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import SellModal from './SellModal';
import Clock from "./Clock";
import { Web3ModalContext } from '../../contexts/Web3ModalProvider';
import { Web3WrapperContext } from '../../contexts/Web3WrapperProvider';
import {Oval} from "react-loader-spinner";

const Outer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
`;

const Responsive = (props) => {
    const [nfts, setNfts] = useState([]);
    const [height, setHeight] = useState(0);
    const { connect, account } = useContext(Web3ModalContext);
    const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);

    useEffect(() => {
        getInfos();
    }, [wrapper]);

    const getInfos = async () => {
        setNfts(await wrapper?.getInfo(props.address));
    }

    const onImgLoad = ({target:img}) => {
        let currentHeight = height;
        if(currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    }

    const withdrawFee = async () => {
        await wrapper?.withdrawFee();
    }

    return (
        <div className='row'>
            <button onClick={withdrawFee}>withdraw</button>
            {!nfts ? (<center><div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 oval">
                <Oval className="time-oval">
                    ariaLabel="loading-indicator"
                    height={100}
                    width={100}
                    strokeWidth={5}
                    color="red"
                    secondaryColor="yellow"
                </Oval>
            </div></center>) : (
                (nfts.map( (nft, index) => (
                    <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <div className="nft__item">
                            { (nft.saleDeadLine && nft.isOnSale==1) &&
                                <div className="de_countdown">
                                    <Clock deadline={nft.saleDeadLine} tokenid={nft.tokenID} wrapper={wrapper} />
                                </div>
                            }
                            <div className="nft__item_wrap" style={{height: `${height}px`}}>
                                <Outer>
                                    <span>
                                        <img onLoad={onImgLoad} src={nft.tokenURI} className="lazy nft__item_preview" alt=""/>
                                    </span>
                                </Outer>
                            </div>
                            <div className="nft__item_info">
                                <span>
                                    <h4>{nft.name}</h4>
                                </span>
                                <div className="nft__item_price">
                                    Level 1
                                </div>
                                <div className="nft__item_price">
                                    NFT ID : {nft.tokenID}
                                </div>
                                { (nft.saleDeadLine && nft.isOnSale==1) ? (
                                    <button className="btn_common" variant="primary" onClick={() => 
                                        window.open("AuctionDetail?name=" + encodeURI(nft.name) +
                                            "&tokenID=" +  encodeURI(nft.tokenID) +
                                            "&ownerAddr=" + encodeURI(nft.owner) +
                                            "&img=" + encodeURI(nft.tokenURI) + 
                                            "&topBidAddr=" + encodeURI(nft.topBidAddr) +
                                            "&topBidPrice=" + encodeURI(nft.topBidPrice) +
                                            "&deadline=" + encodeURI(nft.saleDeadLine) + 
                                            "&description=" + encodeURI(nft.description) +
                                            "&level=" + encodeURI(nft.level) +
                                            "&createdTime=" + encodeURI(nft.saleCreated) +
                                            "&addr=" + encodeURI(account), "_self")
                                    }>
                                        Detail
                                    </button>
                                ) :
                                <SellModal name={nft.name} uri={nft.tokenURI} tokenid={nft.tokenID} owner={nft.owner} wrapper={wrapper}/> 
                                }
                                
                            </div> 
                        </div>
                    </div>  
                )))
            )}
            
        </div>              
        );
}
export default Responsive;