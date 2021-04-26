const { MongoClient } = require('mongodb');
const eve = require('dotenv');
eve.config();
const url = `mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_pass}@${process.env.mongodb_server}/myFirstDatabase?retryWrites=true&w=majority`;
const fs = require('fs');
//const url ="mongodb+srv://apoorva:uN18NVZLt9ORbmVm@cluster0.g12sr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var records;
fs.readFile('db.json', 'utf8', function(err, data) {
    if(err){
        console.log("Error While Loading data");
    }
    else
        records = JSON.parse(data)["books"];
        // records.forEach(elem => {
        //     console.log(elem["title"]);
        // })
})



const client = new MongoClient(url);
const dbName = 'apoorva2';

async function run(){
    try{
        await client.connect();
        console.log("Connected to Database!");
        const db = client.db(dbName);
        const col = db.collection('xyz');

        await col.insertMany(records);
        const myDocs = await col.find();
        myDocs.forEach(elem => {
            console.log(elem["title"]);
        })
    }
    catch(err){
        console.log(err.stack);
    }
    finally{
        await client.close();
    }
}

run().catch(console.dir);