import { IncomingMessage, ServerResponse } from "node:http";
import * as fs from 'fs';

// const fs = require('fs');
var records:any;
fs.readFile('db.json', 'utf8', (err, data) => {
    if(err)
        console.log("Erroe whilw loading data");
    else
        records = data;
});

const deleteBookDetailHandler = (req:IncomingMessage, res:ServerResponse) => {
    let parts = req.url?.split('/');
    var data = JSON.parse(records)["books"];
    data.splice(+parts![parts!.length-1]- 1, 1);
    res.end(JSON.stringify(data));
    // fs.writeFileSync(data);
    fs.writeFile('db.json', JSON.stringify(data), function(err) {
        if(err) {console.log("Error While Saving file")};
    });

}

const deleteBookListHamdler = (req:IncomingMessage, res:ServerResponse) => {
    
}

const deleteNotFoundHandler = (req:IncomingMessage, res:ServerResponse) => {
    res.end(`Not Found ${req.url}`);
}

export const delete_handler = (req:IncomingMessage, res:ServerResponse) => {
    console.log(`Handling ${req.method}`)
    if(req.method === '/books')
        return deleteBookListHamdler(req, res);
    else if(req.url && req.url.length>1 && req.url.indexOf('/books')===0)
        return deleteBookDetailHandler(req, res);
    else
        return deleteNotFoundHandler(req, res);
}

// module.exports.delete_handler = delete_handler;