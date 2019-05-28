const mongoDb = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const url = `mongodb+srv://GurmanBatth:gurman@cluster0-5gvn8.mongodb.net/test?retryWrites=true`;
let collection = '';
const dbname = 'todo';

function connect(cb) {
    mongoDb.connect(url, { useNewUrlParser: true }, function (err, client) {
        console.log('connected sucessfully to the server');
        const db = client.db(dbname);
        collection = db.collection("todoList");
        cb();

    })
}
function insertDocs(tasks, cb) {
    collection.insertOne({ a: tasks }, function (err, result) {
        if (!err) {
            console.log(result);
            cb(result.insertedId);
        }
    })
}
function deleteDocs(index, func) {
    collection.deleteOne({ "_id": new mongodb.ObjectID(index) }, function (err, result) {
        if (!err) {
            console.log(result.insertedId);

            func(result);
        } else {

            console.log("err");
        }
    });
}
function update(index, val, funct) {
    collection.updateOne({ _id: new mongodb.ObjectID(index) }, { $set:{a: val} }, function (err, result) {
        if (!err) {

            // console.log(res);
             funct();
        } else {
            console.log("err");
        }
    })
}
function getTask(items) {
    collection.find({}).toArray(function (err, result) {
        // console.log(result);
        items(result);
    })
}
module.exports = {
    connect,
    insertDocs,
    getTask,
    deleteDocs,
    update
}
