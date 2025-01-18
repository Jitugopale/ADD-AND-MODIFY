// import mongoose from "mongoose";

// const connectToMongo = async () => {
//   await mongoose
//     .connect("mongodb+srv://mongodb:mongodb@cluster0.adosj.mongodb.net/mongodb?retryWrites=true&w=majority&appName=Cluster0")
//     .then(() => console.log("DB Connected"))
//     .catch((err) => console.error("DB Connection Error: ", err));
// };

// export default connectToMongo;

import mongoose from "mongoose";
import { Sequelize } from 'sequelize';

const connectToMongo = async () => {
  await mongoose
    .connect("mongodb+srv://mongodb:mongodb@cluster0.adosj.mongodb.net/mongodb?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("DB Connection Error: ", err));
};


const sequelize = new Sequelize('MSC_CKYC', 'RDD', 'Om_sai_#~!^(ram1', {
  host: '192.168.20.151',
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true,  // Disable encryption if it's not required
    trustServerCertificate: false, // Set to false to ensure the server certificate is validated
    options: {
      ssl: {
        minVersion: 'TLSv1.2', // Set minimum TLS version to 1.2hhhh
      }
    }
  },
 
});
const connectToSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to SQL database');
  } catch (err) {
    console.error('Unable to connect to SQL database:', err);
  }
};

export { connectToMongo, connectToSQL, sequelize };
