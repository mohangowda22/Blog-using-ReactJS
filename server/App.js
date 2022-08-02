const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

const {startDatabase} = require('./database/mongo');
const {insertPost, getPost,getPostWithID,deletePostWithID,updatePostWithID} = require('./database/blog');

app.get('/post', async(req, res) => {
    res.send(await getPost());
});

app.get('/post/:id', async(req, res) => {
  res.send(await getPostWithID(req.params.id));
});

app.put('/post/:id', async(req, res) => {
  res.send(await updatePostWithID(req.params.id,req.body.postUpdate.title,req.body.postUpdate.data));
});

app.delete('/post/:id', async(req, res) => {
  res.send(await deletePostWithID(req.params.id));
});

app.post('/post', async(req, res) => {
  result=await insertPost({title: req.body.post.title,data:req.body.post.data,date:new Date().valueOf()});
  res.json({"status":"sucess","_id":result});
});

startDatabase().then(async () => {  
    // start the server
    app.listen(4000, async () => {
      console.log('listening on port 4000');
    });
  });