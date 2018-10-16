const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const uuidv4 = require('uuid');
 
// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'Entretenimiento';

//Sends throw the callback an array with all the elements in the collection
module.exports.findAllElements = function(strCollection, callback) {
    MongoClient.connect(url, function(err, client) {
        if(err) return callback(500,'')
        
        const db = client.db(dbName);

        const collection = db.collection(strCollection);

        collection.find({}).toArray(function(err, docs) {
            client.close();
            callback(err, docs)
        });
    });
}

//Sends throw the callback an array with the element that match with the id specified in the collection
module.exports.findElementForId = function(strCollection, id, callback) {
    MongoClient.connect(url, function(err, client) {
        if(err) return callback(500,'')
        
        const db = client.db(dbName);

        const collection = db.collection(strCollection);
        collection.find({'_id': ObjectId(id)}).toArray(function(err, docs) {
            callback(err, docs);
        });
    });
}

//Inserts into a mongo database collection the element send into the objElement variable. 
//The method returns the id throw the callback
module.exports.insertElement = function(strCollection, objElement, callback) {
    MongoClient.connect(url, function(err, client) {
        if(err) return callback(500,'')
       
        const db = client.db(dbName);

        const collection = db.collection(strCollection);

        collection.insertMany([objElement], function(err, result) {
            client.close();
            callback(err, result.ops[0]._id)
        });
    });
}

//Delete the element from a mongoDb collection where the uid match with the strUid
module.exports.deleteElement = function(strCollection, id, callback) {
    MongoClient.connect(url, function(err, client) {
        if(err) return callback(500,'')
        
        const db = client.db(dbName);

        const collection = db.collection(strCollection);

        collection.deleteOne({'_id': ObjectId(id)}, function(err, result) {
            if (result.result.n > 0){
                callback(err, true)
            } else {
                callback(err, false)
            }
            client.close();
        }); 
    });
}

//Update the complete element from a mongoDb collection where the uid match with the strUid
module.exports.updateElement = function(strCollection, id, objNewElement, callback){
    MongoClient.connect(url, function(err, client) {
        if(err) return callback(500,'')
        
        const db = client.db(dbName);

        const collection = db.collection(strCollection);

        collection.updateOne({'_id': ObjectId(id)}, { $set: objNewElement }, function(err, result) {
            if (result.result.n > 0){
                callback(err, true)
            } else {
                callback(err, false)
            }

            client.close();
        });          
    });
}