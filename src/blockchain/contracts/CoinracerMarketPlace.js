import Contract from './Contract';
import abi from '../abi/coinracermarketplace.json';

class CoinracerMarketPlace extends Contract {
    constructor(options, address) {
        super(options, "CoinracerMarketPlace", abi, address);
    }
}

export default CoinracerMarketPlace;