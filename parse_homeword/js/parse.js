var csv = require('csvtojson');
const fs = require('fs');

//json
let rawdata = fs.readFileSync('./files/cameras.json');
let camera = JSON.parse(rawdata);
console.log('json',camera);

//csv
csv()
  .fromFile("./files/cameras.csv")
  .then(function(jsonArrayObj)
  {
     console.log('csv:',jsonArrayObj);
   });

//txt
fs.readFile( "./files/cameras.txt", 'utf8', function (err, data) {
    console.log('txt:',data);
 });

 //xml
 const xml2js = require('xml2js');
 const parser = new xml2js.Parser({ attrkey: "ATTR" });
 let xml_string = fs.readFileSync("./files/cameras.xml", "utf8");
 
  parser.parseString(xml_string, function(error, result) {
    if(error === null) {
       console.log('xml:',result);
   }
   else {
     console.log(error);
   }
});

//yaml
const yaml = require('js-yaml');
let yaml_string = fs.readFileSync("./files/cameras.yaml", "utf8");
let yaml_obj = yaml.load(yaml_string);
console.log('yaml:',yaml_obj);
