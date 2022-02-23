import Contract from './Contract';
import abi from '../abi/coinracer.json';

class Coinracer extends Contract {
    constructor(options, address) {
        super(options, "CoinracerNFT", abi, address);
    }
}

export default Coinracer;