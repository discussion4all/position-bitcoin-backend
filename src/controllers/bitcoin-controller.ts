import {getMongoRepository,getConnection} from "typeorm";
import  {Request, Response} from 'express';
import {Setting} from "../entity/Setting";

const updateBitcoin = async (req :Request, res:Response) => {
  const settingsRepository = getMongoRepository(Setting);
  const prevBitcoinPrice = await settingsRepository.find({key: 'bitcoin-price'});
  if (prevBitcoinPrice.length > 0) {
    const bitCoinObj = prevBitcoinPrice[0];
    bitCoinObj.value = req.body.price;
    await settingsRepository.save(bitCoinObj);
    res.status(200).send(bitCoinObj);
  } else {
    const currBitCoin = new Setting('bitcoin-price', req.body.price);
    await settingsRepository.save(currBitCoin);
    res.status(200).send(currBitCoin);
  }
};

const getBitcoin= async (req :Request, res:Response) => {
  const settingsRepository = getMongoRepository(Setting);
  const settingObject = await settingsRepository.findOne({key: 'bitcoin-price'});
  res.send(settingObject);
};

export default {updateBitcoin, getBitcoin}

