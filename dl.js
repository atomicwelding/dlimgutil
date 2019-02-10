"use strict";
/**
 * Simple utility program to download an img passed through arguments
 *      MIT license, weld
 */
exports.__esModule = true;
var https = require("https");
var fs = require("fs");
var arg = process.argv[2];
var mtype = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif'
};
if (!arg || arg === '-h')
    console.log("usage: \n    node dl.js [url of the image to download]\n    node dl.js -h to print the help\n");
else {
    try {
        https.get(arg, function (res) {
            var imgType = res.headers['content-type'];
            console.log('Ready to download...');
            if (res.statusCode == 200 && imgType) {
                res.pipe(fs.createWriteStream(salt_1() + mtype[imgType]));
                console.log('Downloaded !');
            }
            else
                throw Error('Status of the request: ' + res.statusCode);
        });
    }
    catch (e) {
        console.log(e.name + ':' + e.message);
    }
    var salt_1 = function () {
        return (Math.random() * (10000 - 1000) + 1000).toString(16);
    };
}
