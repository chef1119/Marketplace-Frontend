import Web3 from 'web3';
import { addresses } from './constants';
import Coinracer from "./contracts/Coinracer";
import CoinracerNFT from "./contracts/CoinracerNFT";
import CoinracerMarketPlace from "./contracts/CoinracerMarketPlace";
import axios from "axios";

export default class Web3Wrapper {


  web3: Web3;
  chainId: number;
  account: string;
  wrapperOptions: any;

  // Contracts
  coinRacerNFTFactory: CoinracerNFT;
  coinRacerMarketPlace: CoinracerMarketPlace;
  coinRacerToken: Coinracer;

  constructor(web3, chainId, account, options = {}) {
    this.web3 = web3;
    this.chainId = chainId;
    this.account = account;

    this.wrapperOptions = {
      web3, chainId, account,
      ...options
    }

    this.coinRacerNFTFactory = new CoinracerNFT(this.wrapperOptions, addresses.coinracerNFT[this.chainId]);
    this.coinRacerMarketPlace = new CoinracerMarketPlace(this.wrapperOptions, addresses.coinracerMarketPlace[this.chainId]);
    this.coinRacerToken = new Coinracer(this.wrapperOptions, addresses.coinracerToken[this.chainId])
  }

  async getInfo(address) {
    const balance:string | any = await this.coinRacerNFTFactory.call("balanceOf", address);
    const bal = parseInt(balance);
    let data : any = [];
    const get_collection_url = "http://localhost:8080/getCollection";
    for(let index = 0; index < bal; index++) {
      const tokenIDString : any = await this.coinRacerNFTFactory.call("tokenOfOwnerByIndex", address, index); 
      const tokenID = parseInt(tokenIDString);
      const tokenURILoc = await this.coinRacerNFTFactory.call("tokenURI", tokenID);
      const pools_list_url : any = tokenURILoc;
      let tokenURI : any = "";
      let tokenName : any = "";
      let tokenDescription : any = "";
      let saleDeadLine : any = "";
      let initialPrice : number = 0;
      let topBidAddr : any = "";
      let topBidPrice : number = 0;
      let level : number = 1;
      let saleCreated : any = "";
      let isOnSale : number = 1;
      await axios.get(get_collection_url, {params:{id:tokenID}}).then((response) => {
        if(response.data[0]) {
          saleDeadLine = response.data[0]["saleDeadLine"];
          initialPrice = response.data[0]["initialPrice"];
          topBidAddr = response.data[0]["topBidAddr"];
          topBidPrice = response.data[0]["topBidPrice"];
          tokenDescription = response.data[0]["description"];
          // tokenName = response.data[0]["nftName"];
          level = response.data[0]["level"];
          saleCreated = response.data[0]["saleCreated"];
          isOnSale = response.data[0]["isOnSale"];
        }
        else console.log("");
      });
      await axios.get(pools_list_url).then((response) => {
          tokenName = response.data["name"];
          // tokenDescription = response.data["description"];
          tokenURI = "https://ipfs.io/ipfs/" + response.data["image"].slice(7, response.data["image"].length);
          let temp = {
            "tokenID" : tokenID, 
            "owner" : address, 
            "tokenURI" : tokenURI, 
            "name" : tokenName, 
            "description" : tokenDescription, 
            "saleDeadLine" : saleDeadLine, 
            "initialPrice" : initialPrice, 
            "topBidAddr" : topBidAddr, 
            "topBidPrice" : topBidPrice,
            "level" : level,
            "saleCreated" : saleCreated,
            "isOnSale" : isOnSale
          };
          data.push(temp);
      });
    }
    return data;
  }
  async placeAuction(name, tokenid, owner, uri, timeStamp, price, level, description, createdTime, date) {
    const placeAuctionFunc_url = "http://localhost:8080/placeAuction";
    let data;
    // let utcDeadline  = new Date(date).toLocaleString("en-US", {timeZone: "Europe/London"});
    try {
      await this.coinRacerNFTFactory.send("approve", {}, addresses.coinracerMarketPlace[this.chainId], tokenid);
      const priceAmount = Web3.utils.toWei(Web3.utils.toBN(price), "ether");
      await this.coinRacerMarketPlace.send("createAuction",{} ,tokenid, priceAmount, timeStamp); 
      await axios.get(placeAuctionFunc_url, 
        {params:{
          name:name,
          tokenid:tokenid,
          owner:owner,
          uri:uri,
          date:date,
          price:price,
          level:level,
          description:description,
          createdTime:createdTime
        }}).then((response) => {
        if(response.data[0]) {
          return 1;
        }
        else return 1;
      });
      data = 1;
    } catch(error) {
      console.error(error);
      data = 0;
    }
    return data;
  }

  async placeBid(account, bidAmount, tokenID, currentBid) {
    let date = new Date().toLocaleString("en-US", {timeZone: "Europe/London"});
    const placeBid_url = "http://localhost:8080/placeBid";
    try {
      const priceAmount = Web3.utils.toWei(Web3.utils.toBN(bidAmount), "ether");
      await this.coinRacerToken.send("approve", {}, addresses.coinracerMarketPlace[this.chainId], priceAmount);
      await this.coinRacerMarketPlace.send("bid",{} ,tokenID, priceAmount); 
      await axios.get(placeBid_url, 
        {params:{
          tokenid:tokenID,
          bidder:account,
          bidAmount:bidAmount,
          date:date
        }}).then((response) => {
        if(response.data[0]) {
          return response.data[0];
        }
        else console.log("");
      });
    } catch(error) {
      console.error(error);
    }
  }

  async auction_list_url() {
    const getAuctionList_url = "http://localhost:8080/getAuctionList";
    await axios.get(getAuctionList_url).then((response) => {
      if(response.data.length) {
      }
      else console.log("");
    });
  }

  async setSaleStateFalse(tokenid) {
    const setSaleState_url = "http://localhost:8080/setSaleStateFalse";
    await axios.get(setSaleState_url, 
      {params:{
        tokenid:tokenid
      }}).then((response) => {
      if(response.data[0]) {
      }
      else console.log("");
    });
  }

    async getBidList(tokenID) {
    const getBidList_url = "http://localhost:8080/getBidList";
    const {data} = await axios.get(getBidList_url, 
      {params:{
        tokenid:tokenID
      }})
    return data;
  }

  async getAuctionInfo(tokenID) {
    let auctionInfo : any = await this.coinRacerMarketPlace.call("auctionList", tokenID); 
    let bidedAmount : any = await this.coinRacerMarketPlace.call("bidders", tokenID, this.account);
    let isTimeOut : any = await this.coinRacerMarketPlace.call("isTimePassed", tokenID); 
    let result = {
      currentPrice : auctionInfo.currentBidPrice,
      currentBidder : auctionInfo.currentBidOwner,
      bidedAmount : bidedAmount,
      bidCount : auctionInfo.bidCount,
      isOpen : auctionInfo.isOpen,
      isTimeOut : isTimeOut
    }
    return result;
  }

  async claimNFT(tokenID) {
    const claimNFT_url = "http://localhost:8080/claimNFT";
    try {
      await this.coinRacerMarketPlace.send("claimNFT", {}, tokenID);
      await axios.get(claimNFT_url, 
        {params:{
          tokenid:tokenID
        }}).then((response) => {
        if(response.data[0]) {
        }
        else console.log("");
      });
    } catch(error) {
      console.error(error);
    }
  }

  async claimToken(tokenID) {
    const claimToken_url = "http://localhost:8080/claimToken";
    try {
      await this.coinRacerMarketPlace.send("claimToken", {}, tokenID);
      await axios.get(claimToken_url, 
        {params:{
          tokenid:tokenID
        }}).then((response) => {
        if(response.data[0]) {
        }
        else console.log("");
      });
    } catch(error) {
      console.error(error);
    }
  }

  async closeAuction(tokenID) {
    const closeAuction_url = "http://localhost:8080/closeAuction";
    try {
      await this.coinRacerMarketPlace.send("refund", {}, tokenID);
      await axios.get(closeAuction_url, 
        {params:{
          tokenid:tokenID
        }}).then((response) => {
        if(response.data[0]) {
        }
        else console.log("");
      });
    } catch(error) {
      console.error(error);
    }
  }

  async withdrawToken(tokenID) {
    try {
      await this.coinRacerMarketPlace.send("withdrawToken", {}, tokenID);
    } catch(error) {
      console.error(error);
    }
  }

  async withdrawFee() {
    let a = await this.coinRacerMarketPlace.call("feeAmount");
    console.log("feeAmount =========> ", a);
    
  }

}
// amount*value