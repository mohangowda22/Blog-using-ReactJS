const {getDatabase} = require('./mongo');
const ObjectId = require('mongodb').ObjectId;

const collectionName = 'post';

async function insertPost(data) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(data);
  return insertedId;
}

async function getPost() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function getPostWithID(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).find({"_id":ObjectId(id)}).toArray();
}
async function deletePostWithID(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).remove({"_id":ObjectId(id)});
}

async function updatePostWithID(id,title,data) {
  const database = await getDatabase();
  var myquery = { "_id": ObjectId(id) };
  var newvalues = { $set: {"title":title,"data":data,"date":new Date().valueOf()}};
  return await database.collection(collectionName).updateOne(myquery,newvalues);
}

module.exports = {
    insertPost,
    getPost,
    getPostWithID,
    deletePostWithID,
    updatePostWithID
};