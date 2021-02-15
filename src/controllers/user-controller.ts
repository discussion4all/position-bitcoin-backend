import {getMongoRepository} from "typeorm";
import  {Request, Response} from 'express';
import {User} from "../entity/User";
import {Setting} from "../entity/Setting";
import {BadRequestError} from "../errors/bad-request-error";
import  {ObjectID} from 'mongodb';
import {NotFoundError} from "../errors/not-found-error";
import {ServerError} from "../errors/server-error";

const createUser = async (req: Request, res: Response) => {
  const userRepository = getMongoRepository<User>(User);
  const getUser = await userRepository.find({username : req.body.username});
  if (getUser.length > 0) {
    throw new BadRequestError('Username is already in use.');
  }
  const newUser = new User(req.body.name, req.body.username, req.body.email);
  await userRepository.save(newUser);
  res.status(201).send(newUser);
};


const getUser = async (req:Request, res:Response) => {
  const userRepository = getMongoRepository<User>(User);
  if(!ObjectID.isValid(req.params.id)){
    throw new BadRequestError('Id in route is invalid')
  }
  const getUser =await userRepository.find(ObjectID(req.params.id));
  if (getUser.length === 0 ) {
    throw new NotFoundError();
  }
  res.status(200).send(getUser);
};

const updateUser = async(req:Request,res:Response)=>{
  const userRepository = getMongoRepository<User>(User);
  if(!ObjectID.isValid(req.params.id)){
    throw new BadRequestError('Id in route is invalid')
  }
  const existingUsers = await userRepository.findByIds([ObjectID(req.params.id)]);
  console.log(existingUsers);
  console.log(req.params.id);
  if (existingUsers.length === 0) {
    console.log('inside error block');
    throw new NotFoundError();
  }
  const existingUser = existingUsers[0];
  if (req.body.name) {
    existingUser.setName(req.body.name);
  }
  if (req.body.email) {
    existingUser.setEmail(req.body.email);
  }
  await userRepository.save(existingUser);
  res.status(200).send(existingUser);
};

const addUsdInUser = async (req: Request, res: Response) => {
  const userRepository = getMongoRepository<User>(User);
  const {action, amount} = req.body;
  if(!ObjectID.isValid(req.params.id)){
    throw new BadRequestError('Id in route is invalid')
  }
  const existingUsers = await userRepository.findByIds([ObjectID(req.params.id)]);
  if (existingUsers.length === 0) {
    throw new NotFoundError();
  }
  const existingUser = existingUsers[0];
  if (action === 'withdraw') {
    existingUser.withDrawUSD(amount)
  } else if (action === 'deposit') {
    existingUser.depositUSD(amount)
  }
  await userRepository.save(existingUser);
  res.status(201).send(existingUser);
};

const addBitcoinsInUser = async (req: Request, res: Response) => {
  const userRepository = getMongoRepository<User>(User);
  const {action, amount} = req.body;
  if(!ObjectID.isValid(req.params.id)){
    throw new BadRequestError('Id in route is invalid')
  }
  const existingUsers = await userRepository.findByIds([ObjectID(req.params.id)]);
  if (existingUsers.length === 0) {
    throw new NotFoundError();
  }
  const existingUser = existingUsers[0];
  if (action === 'buy') {
    existingUser.buyBitcoin(amount)
  } else if (action === 'sell') {
    existingUser.sellBitcoin(amount)
  }
  await userRepository.save(existingUser);
  res.status(201).send(existingUser);
};

const userBalance = async (req: Request, res: Response) => {
  const userRepository = getMongoRepository<User>(User);
  const settingRepository = getMongoRepository<Setting>(Setting);
  if(!ObjectID.isValid(req.params.id)){
    throw new BadRequestError('Id in route is invalid')
  }
  const existingUsers = await userRepository.findByIds([ObjectID(req.params.id)]);
  if (existingUsers.length === 0) {
    throw new NotFoundError();
  }
  const existingUser = existingUsers[0];
  const settingObject = await settingRepository.findOne({key: 'bitcoin-price'});
  if (!settingObject) {
    throw new ServerError();
  }
  const balance = existingUser.usdBalance + (existingUser.bitcoinAmount * settingObject.value);
  res.status(200).send({balance});
};

export default {createUser, getUser, updateUser, addUsdInUser, addBitcoinsInUser, userBalance}
