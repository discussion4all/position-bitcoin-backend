import {Entity, ObjectID, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

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
}
