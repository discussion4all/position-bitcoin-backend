import express, { Request, Response} from 'express';
const UserController = require("../controller/UserController");

const router = express.Router();

router.get('/users/:id',UserController.getUser);

router.post('/users',UserController.createUser);

router.put('/users/:id',UserController.updateUser);

router.post('/users/:id/usd',UserController.addUsdInUser);

router.post('/users/:id/bitcoins',UserController.addBitcoinsInUser);

router.get('/users/:id/balance',UserController.userBalance);


export {router as userRouter}
