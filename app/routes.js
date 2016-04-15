/**
 * Created by leandroloi on 15/04/16.
 */


var base_url = '/api/';  //API base path
var Todo = require('./models/todos');

module.exports = function(app) {
    //API


    //get all todos
    app.get( base_url + 'todos', function(req, res){
        //mongoose find all the todos on the database and return. If error send the error.
        Todo.find(function(err, todos){
            if (err)
                res.send(err);

            res.json(todos); //return all todos
        });
    });

    //create a new todos
    app.post( base_url + 'todos', function(req, res){
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todos){

            if (err)
                res.send(err);

            Todo.find(function(err, todos){
                if(err)
                    res.send(err);

                res.json(todos);
            });

        });

    });

    app.delete(base_url +'todos/:todo_id', function(req, res){
        Todo.remove({
            _id : req.params.todo_id

        }, function(err, todos){
            if(err)
                res.send(err);

            Todo.find(function(err, todos){
                if(err)
                    res.send(err);

                res.json(todos);
            });
        });

    });

    //aplication
    app.get('*', function(req, res){
        res.sendFile('./public/index.html'); //this will load a single file with angular
    });


};


