const { MongoClient } = require('mongodb');
const eve = require('dotenv');
eve.config();
const url = `mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_pass}@${process.env.mongodb_server}/myFirstDatabase?retryWrites=true&w=majority`;
const fs = require('fs');
const client = new MongoClient(url, { useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        console.log('Connected!');
        const db = client.db('apoorva2');
        const col = db.collection('xyz');
        col.deleteOne({"_id": "6"}, function(err, obj){
            if(err) console.log(err);
            console.log("! Document Deleted");
        });
    }
    catch(err){
        console.log(err);
    }
    finally{
        await client.close();
    }
}

run();