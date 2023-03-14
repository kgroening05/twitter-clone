const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

require('dotenv').config()

// dbSecrets
const username = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;
const database = process.env.DATABASE;
const cluster = process.env.CLUSTER;

// store secrets
const collection = process.env.SESSIONCOLLECTION

// connection string
const mongoDb = `mongodb+srv://${username}:${password}@${cluster}.fsq1lj2.mongodb.net/${database}`             
const dbConnectString = mongoDb + '?' + `retryWrites=true&` + `w=majority`;
const store = MongoStore.create({
    mongoUrl: mongoDb,
    collectionName: collection,
})

connectDb = async function (){
    await mongoose.connect(dbConnectString)
}

module.exports = { connectDb, store }