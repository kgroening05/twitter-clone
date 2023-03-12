const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config()

mongoose.set('strictQuery', true);

// dbSecrets
const username = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;
const database = process.env.DATABASE;
const cluster = process.env.CLUSTER;

// store secrets
const collection = process.env.SESSIONCOLLECTION

// connection string
const mongoDb = `mongodb+srv://${username}:${password}@${cluster}.fsq1lj2.mongodb.net/${database}?` 
                + `retryWrites=true&`
                + `w=majority`;
 
async function connectDb(){
    await mongoose.connect(mongoDb)
}

const store = new MongoDBStore({
    uri: mongoDb,
    collection: collection
});

store.on('error', (err) => {
    console.log(err)
})

module.exports = { connectDb, store }