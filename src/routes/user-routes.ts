import express, { Request, Response} from 'express';
import {body} from "express-validator";
import {validateRequest} from "../middleware/validate-request";
import UserController from '../controllers/user-controller'

const router = express.Router();

router.get('/users/:id',UserController.getUser);

router.post('/users',[
  body('email').exists()
    .trim()
    .isEmail()
    .withMessage('Email must be valid'),
  body('username').exists()
    .trim().isLength({min:1})
    .withMessage('Username must be valid'),
    body('name').exists()
      .trim().isLength({min:1})
      .withMessage('Name must be valid'),
  ],
  validateRequest,
  UserController.createUser);

router.put('/users/:id',[
    body('email').optional()
      .trim()
      .isEmail()
      .withMessage('Email must be valid'),
    body('name').optional()
      .trim().isLength({min:1})
      .withMessage('Name must be valid'),
  ],
  validateRequest,
  UserController.updateUser);

router.post('/users/:id/usd', [
    body('action')
      .exists()
      .matches(/\b(?:withdraw|deposit)\b/)
      .withMessage('Invalid action'),
    body('amount')
      .exists()
      .isFloat({gt: 0})
      .withMessage('Amount must be provided an must be greater than 0')
  ],
  validateRequest,
  UserController.addUsdInUser);
//
router.post('/users/:id/bitcoins', [
  body('action')
    .exists()
    .matches(/\b(?:buy|sell)\b/)
    .withMessage('Invalid action'),
  body('amount')
    .exists()
    .isFloat({gt: 0})
    .withMessage('Amount must be provided an must be greater than 0')
],
  validateRequest,
  UserController.addBitcoinsInUser);

router.get('/users/:id/balance',UserController.userBalance);


export {router as userRouter}
