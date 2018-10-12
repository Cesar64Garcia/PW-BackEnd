const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uuidv4 = require('uuid');
 
// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'Entretenimiento';

//Sends throw the callback an array with all the elements in the collection
module.exports.findAllElements = function(strCollection, callback) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        
        const db = client.db(dbName);

        const collection = db.collection(strCollection);

        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            client.close();
            callback(docs)
        });
    });
}

//Sends throw the callback an array with the element that match with the id specified in the collection
module.exports.findElementForId = function(strCollection, strUid, callback) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        
        const db = client.db(dbName);

        const collection = db.collection(strCollection);
        collection.find({'uid': strUid}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log(docs)
            client.close();
            callback(docs);
        });
    });
}

//Inserts into a mongo database collection the element send into the objElement variable. 
//The method returns the id throw the callback
module.exports.insertElement = function(strCollection, objElement, callback) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        
        const db = client.db(dbName);

        const collection = db.collection(strCollection);
        objElement.uid = uuidv4();

        collection.insertMany([objElement], function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            assert.equal(1, result.ops.length);
            client.close();
            console.log(result)
            callback(objElement.uid)
        });
    });
}

//Delete the element from the mongoDb collection where the uid match with the strUid
module.exports.deleteElement = function(strCollection, strUid, callback) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        
        const db = client.db(dbName);

        const collection = db.collection(strCollection);

        collection.deleteOne({'uid': strUid}, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            callback(true);
          }); 
    });
}

module.exports.updateElement = function(strCollection, strUid, objNewElement, callback){
    
}