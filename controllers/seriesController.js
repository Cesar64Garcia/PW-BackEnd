const uuidv4 = require('uuid');
const mongoClient = require('./MongoController')

var series = [
    {
        id: uuidv4(),
        serie: 'Arrow',
        temporada: 'Season 01',
        portada: 'https://mallsurfer.files.wordpress.com/2013/08/arrow_season_2_poster.jpg',
        body: 'Season 01 from Arrow.',
        capitulos: '21'
    },
    {
        id: uuidv4(),
        serie: 'The Flash',
        temporada: 'Season 01',
        portada: 'http://digitalspyuk.cdnds.net/14/35/768x1109/gallery_ustv-the-flash-poster.jpg',
        body: 'Season 01 from The Flash',
        capitulos: '22'
    },
    {
        id: uuidv4(),
        serie: 'Supergirl',
        temporada: 'Season 01',
        portada: 'https://vignette.wikia.nocookie.net/arrow/images/9/93/Supergirl_season_1_poster_-_A_new_hero_will_rise..png/revision/latest?cb=20170113123304',
        body: 'Season 01 from Supergirl',
        capitulos: '21'
    },
    {
        id: uuidv4(),
        serie: 'Batwoman',
        temporada: 'Pilot',
        portada: 'https://pre00.deviantart.net/e16e/th/pre/i/2018/099/f/a/batwoman_poster_by_dylanl68-dc8di0w.png',
        body: 'Pilot',
        capitulos: '00'
    }
]

module.exports.getSeries = function(id, callback){
    let objReturn
    
    if(!id){
        mongoClient.findAllElements('SeriesTV',(data) => {
            callback(null, data)
        })
        return
    }

    mongoClient.findElementForId('SeriesTV', id,(data) => {
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
    
    mongoClient.insertElement("SeriesTV",jsSerie,(insertedId) =>{
        callback(null,{message: 'Item stored successfully', id: insertedId});
    })
}

module.exports.updateSerie = function(id, jsSerie, callback){
    if(!id){
        callback(400,'')
        return
    }

    let index
    index = series.map(serie => serie.id).indexOf(id);

    if(index < 0) {
        callback(404,'')
        return
    }
    
    jsSerie.id = id;
    series[index] = jsSerie;
    callback(null,'')
}

module.exports.deleteSerie = function(id, callback){
    if(!id){
        callback(400,'')
        return
    }

    mongoClient.deleteElement('SeriesTV', id, (blnResponse) => {
        if (blnResponse){
            callback(null,'')   
        } else {
            callback(404,'')
        }
    })
}
