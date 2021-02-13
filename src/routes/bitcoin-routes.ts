import express, { Request, Response} from 'express';
const BitcoinController = require("../controllers/bitcoin-controller");

const router = express.Router();

router.put("/bitcoin", BitcoinController.updateBitcoin);

router.get('/bitcoin', BitcoinController.getBitcoin);


export {router as bitcoinRouter}
