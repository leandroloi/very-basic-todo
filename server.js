/**
 * Created by leandroloi on 14/04/16.
 */

// Setup the server
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//Config
mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_11xp07m1:pfvndf5g8a8df3bu667qtal8pt@ds023500.mlab.com:23500/heroku_11xp07m1');
var port = process.env.PORT || 8080;
var base_url = '/api/';

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(methodOverride());

//Model
var Todo = mongoose.model('Todo',{
        text : String,
        done : Boolean
});


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


app.listen(port);







