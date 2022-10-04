var express = require('express');
var fs = require("fs");
var csv = require('csvtojson');
var app = express();
const yaml = require('js-yaml');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

app.get('/csv', function (req, res) {
    csv()
  .fromFile("./files/cameras.csv")
  .then(function(data)
  {
     console.log('csv:',data);
     res.end(JSON.stringify(data));
   });
})
app.get('/json', function (req, res) {
    fs.readFile("./files/cameras.json", 'utf8', function (err, data) {
         console.log( data );
            res.end( data );
    });
})

app.get('/xml', function (req, res) {
    let xml_string = fs.readFileSync("./files/cameras.xml", "utf8");
 
  parser.parseString(xml_string, function(error, result) {
    if(error === null) {
       console.log('xml:',result);
         res.end(JSON.stringify(result));
   }
   else {
     console.log(error);
   }
});
})

app.get('/txt', function (req, res) {
    fs.readFile("./files/cameras.txt", 'utf8', function (err, data) {
            console.log( data );
            res.end( data );    
    });
})

app.get('/yaml', function (req, res) {
    fs.readFile("./files/cameras.yaml", 'utf8', function (err, data) {
            console.log(yaml.load(data));
            res.end( data );
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("app listening at http://%s:%s", host, port)
 })