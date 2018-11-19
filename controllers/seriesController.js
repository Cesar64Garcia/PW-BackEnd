const uuidv4 = require('uuid');
const mongoClient = require('./MongoController')

getSeries = function(id, callback){
    let objReturn
    
    if(!id){
        mongoClient.findAllElements('SeriesTV',(err, data) => {
            if(err) {
                callback(500, 'Ocurrio un error desconocido al intentar accesar a la base de datos.')
            } else {
                callback(null, data)
            }
        })
        return
    }

    mongoClient.findElementForId('SeriesTV', id, (err, data) => {
        if (!data.length){
            callback(404,'El item buscado no fue encontrado.')
        } else {
            callback(null, data)
        }
        return
    })
}

postSerie = function(jsSerie, callback){
    if(!jsSerie) {    
        callback(400,'Por favor enviar una solicitud válida.')
        return
    }
    
    mongoClient.insertElement("SeriesTV",jsSerie,(err, insertedId) =>{
        callback(null,{message: 'Item stored successfully', id: insertedId});
    })
}

updateSerie = function(id, jsSerie, callback){
    if(!id){
        callback(400,'Por favor enviar un id válido.')
        return
    }

    mongoClient.updateElement('SeriesTV', id, jsSerie, (err,blnResult) =>{
        if (blnResult) {
            callback(null,'Item actualizado correctamente.')
        } else {
            callback(404, 'El item buscado no fue encontrado.')
        }
    });
}

deleteSerie = function(id, callback){
    if(!id){
        callback(400,'Por favor enviar un id válido.')
        return
    }

    mongoClient.deleteElement('SeriesTV', id, (err, blnResponse) => {
        if (blnResponse){
            callback(null,'Item eliminado correctamente')   
        } else {
            callback(404, 'El item buscado no fue encontrado.')
        }
    })
}

module.exports = {
    getSeries,
    postSerie,
    updateSerie,
    deleteSerie
}