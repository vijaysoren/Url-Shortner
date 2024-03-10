/************************************
*          Vijay Soren              *
*   https://github.com/vijaysoren   *
*                                   *
************************************/


var database = require('./database.json');

var http = require('http');
var https = require('https');
var fs = require('fs');
var url = require('url');

var index = fs.readFileSync('index.html');
var urlRef = fs.readFileSync('redirect.html');
var pNotFound = fs.readFileSync('404.html');
//var urlCode;

const host = '127.0.0.1';
const port = '8080';

var reqUrlCode;

const server = http.createServer((req, res) => {
    console.log();
    var shortUrl = url.parse(req.url);
    var reqU =shortUrl.pathname;
    var reqUrl = reqU.replace("/", "");
    console.log("requestedURL : " + reqUrl);

    reqUrlCode = shortUrl.pathname;
    
    var b = getKeyValue(database, reqUrl);
    
    console.log("Url fetched : "+ b);
    
    try {
        //urlCode.keys(reqUrlCode);
    if(reqUrlCode === '/' ){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(index);
    }else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(b);
        res.end(urlRef);
    }
    } catch (error) {
        res.end(pNotFound);
        console.log("Failed to load: ", error);
    }
});


server.listen(port, host, () => {
    console.log("Server running at http://"+ host + ":" + port );
});


function getKeyValue(obj, key) {
    if(key in obj){
        return obj[key];
    }

    var keys = key.split('.');
    var value = obj;
    var i = 0;

    for(i ; i < keys.length; i++) {
        value = value[keys[i]];

        if(value === undefined) {
            break;
        }
    }

    return value;
}
