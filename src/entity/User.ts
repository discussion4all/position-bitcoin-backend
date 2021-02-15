import {Entity, ObjectID, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {BadRequestError} from "../errors/bad-request-error";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    bitcoinAmount: number;

    @Column()
    usdBalance: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(name: string, username: string, email: string) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.bitcoinAmount = 0;
        this.usdBalance = 0;
    }

    setName(name: string) {
      this.name = name;
    }

    setEmail(email: string) {
      this.email = email;
    }

    withDrawUSD(amount: number) {
      if (amount > this.usdBalance) {
        throw new BadRequestError('You don\'t have enough balance to withdraw')
      } else {
        this.usdBalance -= amount;
      }
    }

    depositUSD(amount: number) {
      this.usdBalance += amount;
    }

    sellBitcoin(amount: number) {
      if (amount > this.bitcoinAmount) {
        throw new BadRequestError('You don\'t have enough bitcoins to sell')
      } else {
        this.bitcoinAmount -= amount;
      }
    }

    buyBitcoin(amount: number) {
      this.bitcoinAmount += amount;
    }
}
