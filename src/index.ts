import { app} from "./app";
import {Connection, createConnection} from "typeorm";
import {getMongoRepository} from "typeorm";
import {Setting} from "./entity/Setting";
import * as http from "http";

let dbConnection: Connection;
let server: http.Server;

const setUpServer = async () => {
  dbConnection = await createConnection();
  await setBitCoinValueIfNotExist();
  server = app.listen(5000, () => {
    console.log('Server is listening on port 5000');
  });

};

setUpServer();

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    dbConnection.close().then(() => {
      console.log('DB connection closed');
    })
  });
});

const setBitCoinValueIfNotExist = async () => {
    const settingsRepository = getMongoRepository<Setting>(Setting);
    const bitcoinValueFromDb = await settingsRepository.find({key: 'bitcoin-price'});
    if (bitcoinValueFromDb.length < 1) {
        const bitcoinValue = new Setting('bitcoin-price', 100);
        await settingsRepository.save(bitcoinValue);
    }
};
