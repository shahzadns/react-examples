/**
 * Created by macbookpro on 8/24/16.
 */

(function () {

  /*require dep modules*/
  var mongoose = require('mongoose');

  /*locals*/
  var TodoSchema;

  exports.init = init;

  function init(config) {

    //connect to DB
    //mongoose.connect(config.DB_DEV); //development env
    mongoose.connect(config.DB_PROD); //production env

    //create a Schema
    TodoSchema = new mongoose.Schema({
      text: String,
      checked: Boolean,
      checkedOn: Date,
      updatedOn: Date,
      createdOn: {
        type: Date,
        default: Date.now
      }
    });

    //register the model with Schema
    mongoose.model('Todo', TodoSchema);
  }

})();