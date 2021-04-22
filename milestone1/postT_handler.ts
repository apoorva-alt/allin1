// const fs = require('fs');
import * as fs from 'fs';
import { IncomingMessage, ServerResponse } from 'node:http';
var records = fs.readFileSync('db.json', 'utf8');

const postBookDetailHandler = (req:IncomingMessage, res:ServerResponse)=> {
    var data = JSON.parse(records)["books"];
    req.on('data', chunk => {
        data.push(JSON.parse(chunk.toString('utf8')));
    })
    //we r storing data in chunk variable.
    req.on('end', () => {
        res.end(JSON.stringify(data));
        // console.log(typeof data);
        // fs.writeFileSync('db2.json', JSON.stringify(data));

    })
}

const postNotFoundHandler = (req:IncomingMessage, res:ServerResponse) => {
    res.end(`NOT FOUND : ${req.url}`);
}

export const post_handler = (req:IncomingMessage, res:ServerResponse) => {
    console.log(`Handling ${req.method} method`);
    if (req.url === '/books'){
        return postBookDetailHandler(req, res)
    }
    else
        return postNotFoundHandler(req, res);
}

// module.exports.post_handler = post_handler;