const uuidv4 = require('uuid');
const mongoClient = require('./MongoController')

module.exports.getSeries = function(id, callback){
    let objReturn
    
    if(!id){
        mongoClient.findAllElements('SeriesTV',(err, data) => {
            if(err) {
                callback(500,'')
            } else {
                callback(null, data)
            }
        })
        return
    }

    mongoClient.findElementForId('SeriesTV', id, (err, data) => {
        if (!data.length){
            callback(404,'')
        } else {
            callback(null, data)
        }
        return
    })
}

module.exports.postSerie = function(jsSerie, callback){
    if(!jsSerie) {    
        callback(400,'')
        return
    }
    
    mongoClient.insertElement("SeriesTV",jsSerie,(err, insertedId) =>{
        callback(null,{message: 'Item stored successfully', id: insertedId});
    })
}

module.exports.updateSerie = function(id, jsSerie, callback){
    if(!id){
        callback(400,'')
        return
    }

    mongoClient.updateElement('SeriesTV', id, jsSerie, (err,blnResult) =>{
        if (blnResult) {
            callback(null,'')
        } else {
            callback(404,'')
        }
    });
}

module.exports.deleteSerie = function(id, callback){
    if(!id){
        callback(400,'')
        return
    }

    mongoClient.deleteElement('SeriesTV', id, (err, blnResponse) => {
        if (blnResponse){
            callback(null,'')   
        } else {
            callback(404,'')
        }
    })
}
