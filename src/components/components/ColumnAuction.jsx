// import express from 'express';

import React, { Component} from "react";
import axios from "axios";
import Clock from "./Clock";
import { createGlobalStyle } from 'styled-components';
import ItemDetail from '../pages/ItemDetail';
import { format } from 'fecha';

const GlobalStyles = createGlobalStyle`
    .de_countdown{
        position: relative;
        box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.3);
        top: 0;
        left: 0;
        margin-bottom: 20px;
        div{
            display: flex;
            justify-content: center;
        }
        .Clock-days, .Clock-hours, .Clock-minutes{
            margin-right: 10px;
        }
    }
`;

// const pools_list_url = "http://localhost:8080/api";
// const [nftArray, setNftArray] = useState([]);
const auction_list_url = "http://localhost:8080/getAuctionList";

export default class Responsive extends Component {

    dummyData = [];

    constructor(props) {
        super(props);  
        this.state = {
            nfts: this.dummyData.slice(0,8),
            height: 0
        };
        this.getNftData();
        this.onImgLoad = this.onImgLoad.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    getNftData = () => {
        axios.get(auction_list_url, {params:{address : this.props.address}}).then((response) => {
            let date  = new Date().toLocaleString("en-US", {timeZone: "Europe/London"});
            let date1 = format(new Date(date), 'MMMM,DD,YYYY HH:mm:ss')
            for(var index = 0; index < response.data.length; index++) {
                const temp = {
                    nftName : response.data[index]["nftName"],
                    nftLevel : response.data[index]["level"],
                    nftID : response.data[index]["nftID"],
                    nftOwner : response.data[index]["ownerAddr"],
                    description : response.data[index]["description"],
                    topBidAddr : response.data[index]["topBidAddr"],
                    topBidPrice : response.data[index]["topBidPrice"],
                    price : response.data[index]["initialPrice"],
                    img : response.data[index]["nftIpfs"],
                    deadline : response.data[index]["saleDeadLine"],
                    saleCreated : response.data[index]["saleCreated"]
                } 
                this.dummyData.push(temp);
                
            }
            this.setState({
                nfts: this.dummyData.slice(0,8)
            });
        });
    }

    loadMore = () => {
        let nftState = this.state.nfts
        let start = nftState.length
        let end = nftState.length+4
        this.setState({
            nfts: [...nftState, ...(this.dummyData.slice(start, end))]
        });
        console.log("aaa");
    }

    onImgLoad({target:img}) {
        let currentHeight = this.state.height;
        if(currentHeight < img.offsetHeight) {
            this.setState({
                height: img.offsetHeight
            })
        }
    }

    goToDetail() {
        return <ItemDetail></ItemDetail>;
    }


    render() {
        return (
            <div className='row'>
            <GlobalStyles />
                {this.state.nfts.map( (nft, index) => (
                    <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
                        <div className="nft__item m-0">
                            <div className="de_countdown">
                                <Clock deadline={nft.deadline} />
                            </div>
                            <div className="nft__item_wrap" style={{height: `${this.state.height}px`}}>
                                <span>
                                    <img onLoad={this.onImgLoad} src={nft.img} className="lazy nft__item_preview" alt=""/>
                                </span>
                            </div>
                            <div className="nft__item_info">
                                <span onClick={()=> window.open(nft.nftLink, "_self")}>
                                    <h4>{nft.nftName}</h4>
                                </span>
                                <div className="nft__item_price">
                                    NFT Level : Level {nft.nftLevel}
                                </div>
                                <div className="nft__item_price">
                                    NFT ID : {nft.nftID}
                                </div>
                                <div className="nft__item_action">
                                    <span onClick={
                                        ()=> window.open("ItemDetail?name=" + encodeURI(nft.nftName) +
                                        "&tokenID=" +  encodeURI(nft.nftID) +
                                        "&ownerAddr=" + encodeURI(nft.nftOwner) +
                                        "&img=" + encodeURI(nft.img) + 
                                        "&topBidAddr=" + encodeURI(nft.topBidAddr) +
                                        "&topBidPrice=" + encodeURI(nft.topBidPrice) +
                                        "&deadline=" + encodeURI(nft.deadline) + 
                                        "&description=" + encodeURI(nft.description) +
                                        "&level=" + encodeURI(nft.nftLevel) +
                                        "&createdTime=" + encodeURI(nft.saleCreated) +
                                        "&addr=" + encodeURI(this.props.address), "_self")
                                    }>
                                            Place a bid
                                    </span>
                                    {/* <span onClick={this.goToDetail}>Place a bid</span> */}
                                </div>
                                <div className="nft__item_like">
                                    <i className="fa fa-heart"></i><span>{nft.likes}</span>
                                </div>
                            </div> 
                        </div>
                    </div>  
                ))}
                { this.state.nfts.length !== this.dummyData.length &&
                    <div className='col-lg-12' style={{zIndex:1000}}>
                        <div className="spacer-single"></div>
                        <span onClick={ this.loadMore} className="btn-main lead m-auto">Load More</span>
                    </div>
                }
            </div>              
        );
    }
}