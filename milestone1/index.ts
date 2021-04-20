// const http = require('http');
// const {get_handler} = require('./get_handler');
// const {post_handler} = require('./post_handler');
// const {put_handler} = require('./put_handler');
// const {delete_handler} = require('./delete_handler');

import * as http from 'http';
import {get_handler} from './getT_handler.js';
import {post_handler} from './postT_handler.js';
import {put_handler} from './putT_handler.js';
import {delete_handler} from './deleteT_handler.js';
import { IncomingMessage, ServerResponse } from 'node:http';

 

const notFoundHandler = (req:IncomingMessage, res:ServerResponse) => {
    res.end(`Not Found method in current Applicartion : ${req.method}`);
}

const request_handler = (req: IncomingMessage, res : ServerResponse) => {
    console.log(`Received ${req.method} ${req.url}`);
    if(req.method === 'GET'){
        return get_handler(req, res);
    }
    else if(req.method === 'POST'){
        // console.log('here')
        return post_handler(req, res);
    }
    else if(req.method === 'PUT'){
        // console.log('In PUT');
        return put_handler(req, res);
    }
    else if(req.method === 'DELETE'){
        return delete_handler(req, res);
    }
    else{
        return notFoundHandler(req, res);
    }
}

let server = http.createServer(request_handler);

server.on('error', err => console.log('Error Starting Server', err.message));

const port = 5000;

server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
  });