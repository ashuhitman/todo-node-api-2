const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    
     var todo = new Todo({
       text: req.body.text
     });
     todo.save().then((doc) => {
        res.send(doc);
     },(e) => {
        res.status(400).send();
     });
});

app.get('/todos',(req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    },(e) => {
      res.status(400).send(e);
    });
});
app.get('/todos/:id',(req, res) => {
    var id = req.params.id;
     if(!ObjectID.isValid(id)) {
        return res.status(400).send();
     }
    Todo.findById(id).then((todo) => {
        if(!todo) {
          return res.status(400).send();
        }
        res.send({todo});
    },(e) => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
   console.log(`started on port ${port}`);
});
