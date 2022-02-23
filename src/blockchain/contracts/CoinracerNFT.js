import Contract from './Contract';
import abi from '../abi/coinracernft.json';

class CoinracerNFT extends Contract {
    constructor(options, address) {
        super(options, "CoinracerNFT", abi, address);
    }
}

export default CoinracerNFT;