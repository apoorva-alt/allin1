const { MongoClient } = require('mongodb');

const eve = require('dotenv');
eve.config();
const url = `mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_pass}@${process.env.mongodb_server}/ClusterMern?retryWrites=true&w=majority`;

const client = new MongoClient(url);
const dbName = "apoorva2";

async function run() {
    try {
        await client.connect();
        console.log("Connected to Mongodb!");
        const db = client.db(dbName);
        const col = db.collection('xyz');
        col.updateOne({"_id" : "2"}, {"$set" : {"title" : "Ketan Pise and the Philosopher's stone"}});
        console.log("Sucessfully Updated");
    }catch(err){
        console.log(err);
    }
    finally{
            await client.close();
    }
}

run().catch(console.dir);