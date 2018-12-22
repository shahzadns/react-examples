/**
 * Created by macbookpro on 8/24/16.
 */

(function () {

  /*require modules*/

  //dep modules
  var express = require('express');
  var mongoose = require('mongoose');
  var bodyParser = require('body-parser');
  var morgan = require('morgan');

  //custom modules
  var controllers = require('./controllers');
  var dataBase = require('./database');

  //core modules
  var fs = require('fs');


  /*locals*/
  var config;

  //contains configuration
  config = {
    PORT: process.env.port || 4000,
    DB_DEV: 'mongodb://localhost/todos',
    DB_PROD: 'mongodb://panacloudservice:panacloudservice1@ds017246.mlab.com:17246/todosdb',
    CORS_ALLOWED: process.env.cors || 'localhost:4100/'
  };

  //log env vars
  //console.log(process.env);

  //Instantiate express server
  var app = express();

  //setup MongoDB connection, schema, etc
  dataBase.init(config);

  //setup controllers
  controllers.init();


  /*App middle-wares*/

  //request logger for console
  app.use(morgan('dev'));

  //setup static files serve e.g public/index.html, public/app.js
  app.use(express.static(__dirname + '/public'));

  //serialize or decode the data attached with request query or body, as a JSON
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  //allows CORS for the localhost:4100/
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', config.CORS_ALLOWED);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
  });


  /*APIs*/

  //GET "/" or home or index.html
  app.get('/', function (req, res) {
    fs.readFile('./public/index.html', function (err, data) {

      if (err) {
        console.log(err);
        return res.send(err);
      }

      res.send(data);
    });
  });

  //Todos REST APIs.
  app.route('/todos')
    .get(controllers.getTodoList)
    .post(controllers.createTodo);

  app.route('/todos/:id')
    .get(controllers.getTodo)
    .put(controllers.updateTodo)
    .delete(controllers.deleteTodo);


  //Run express server
  app.listen(config.PORT, function () {
    console.log('Server is running at port: ' + config.PORT);
  });

})();
