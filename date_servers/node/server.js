const { response } = require('express');
const fetch = require('node-fetch');
var express = require('express');
const cors = require('cors');
var app = express();
const SwaggerUI = require('swagger-ui-express')
const swaggerDocument = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Date Servers",
        version: "1.0.0",
        description: "Python date servers on port 8080",
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["./node/*.js"],
  };

const specs = swaggerDocument(options);
app.use(cors());
app.use("/docs", SwaggerUI.serve, SwaggerUI.setup(specs))

/**
 * @swagger
 * tags:
 *   name: Date
 *   description: Return date
 */
/**
 * @swagger
 * /date:
 *   get:
 *     summary: Return date in json format in ISO 8601
 *     tags: [Date]
 *     responses:
 *       200:
 *         description: The date in ISO 8601 format
 */
app.get('/date', function(req, res){
   var date= new Date().toISOString();
   var text='{ "date":"'+date+'" }';
    res.send(JSON.parse(text));
    
});

/**
 * @swagger
 * tags:
 *   name: Date
 *   description: Return date from server
 */
/**
 * @swagger
 * /date_received:
 *   get:
 *     summary: Return date in json format from the Python server
 *     tags: [Date]
 *     responses:
 *       200:
 *         description: The date in ISO 8601 format from the Python server
 */
app.get('/date_received', function(req, res){
    fetch('http://127.0.0.1:8000/date')
        .then(response => {
            response.json().then(json => {
                res.send(json);
              });
        })
        
    
});

app.listen(8080);