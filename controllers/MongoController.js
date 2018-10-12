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
            callback(docs)
            client.close();
        });
    });
}

//Sends throw the callback an array with the element that match with the id specified in the collection
module.exports.findElementForId = function(strCollection, strId, callback) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        
        const db = client.db(dbName);

        const collection = db.collection(strCollection);
        collection.find({'uid': strId}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log(docs)
            callback(docs);
            client.close();
        });
    });
}

module.exports.insertElement = function(strCollection, objElement) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        
        const db = client.db(dbName);

        // Get the Element collection
        const collection = db.collection(strCollection);
        
        // Insert some Element
        collection.insertMany([objElement], function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            assert.equal(1, result.ops.length);
            client.close();
            console.log(result)
        });
    });
}
