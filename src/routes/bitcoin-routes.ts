import express, { Request, Response} from 'express';
import {body} from "express-validator";
import {validateRequest} from "../middleware/validate-request";
import BitcoinController from '../controllers/bitcoin-controller'

const router = express.Router();

router.put("/bitcoin",[
    body('price').exists()
      .isFloat({gt: 0})
      .withMessage('Price must be provided an must be greater than 0')
  ],
  validateRequest,
  BitcoinController.updateBitcoin);

router.get('/bitcoin', BitcoinController.getBitcoin);

export {router as bitcoinRouter}
