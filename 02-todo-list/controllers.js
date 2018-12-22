/**
 * Created by macbookpro on 8/24/16.
 */

(function () {

  /*require dep modules*/
  var mongoose = require('mongoose');

  /*locals*/
  var Todo, sliceInfo;

  sliceInfo = {
    __v: false
  };

  /*exports methods*/

  exports.init = init;

  exports.getTodoList = getTodoList;
  exports.getTodo = getTodo;

  exports.createTodo = createTodo;
  exports.updateTodo = updateTodo;
  exports.deleteTodo = deleteTodo;


  //do some initializations needed for API handlers. e.g. retrieving TodoSchema
  function init() {
    Todo = mongoose.model('Todo');
  }

  //To get a list of all Todos.
  function getTodoList(req, res, next) {
    Todo.find(undefined, sliceInfo, function (err, Todos) {
      if (err) {
        return next(err);
      }

      res.json({
        data: {
          Todos: Todos
        }
      });
    });
  }

  //To get a To-do from the Todos collection.
  function getTodo(req, res, next) {
    Todo.find({_id: req.params.id}, sliceInfo, function (err, Todo) {
      if (err) {
        return next(err);
      }

      res.json({
        data: {
          Todo: Todo
        }
      });

    });
  }

  //To create a new To-do in the Todos collection.
  function createTodo(req, res, next) {

    var todo = new Todo(req.body);

    todo.save(function (err, dbTodo) {
      if (err) {
        return next(err);
      }

      res.json({
        data: {
          Todo: todo
        }
      });

    });
  }

  //To update a To-do in the Todos collection.
  function updateTodo(req, res, next) {
    Todo.update({_id: req.params.id}, req.body, function (err, todo) {
      if (err) {
        return next(err);
      }

      res.json({
        data: {
          message: 'Todo has been updated successfully.',
          todo: todo
        }
      });

    });
  }

  //To delete a To-do from the Todos collection.
  function deleteTodo(req, res, next) {
    Todo.remove({_id: req.params.id}, function (err, todo) {
      if (err) {
        return next(err);
      }

      res.json({
        data: {
          message: 'Todo has been deleted successfully.'
        }
      });

    });
  }


})();
