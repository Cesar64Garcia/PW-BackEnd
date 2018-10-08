const uuidv4 = require('uuid');
const handleResponse = require('./messageController')
var expressValidator = require('validator');

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

module.exports.getSeries = function(id){
    if(!id){
        return handleResponse(200,series);
    }
    let objReturn = series.filter(serie => serie.id == id);

    if(!objReturn.length) {
        return handleResponse(404,'Item not found')
    }
    return handleResponse(200,series.filter(serie => serie.id == id));
}

module.exports.postSerie = function(jsSerie){
    if(!jsSerie) {    
        return handleResponse(400,'Item to be stored was not sent.')
    }
    
    series.push(jsSerie)
    return handleResponse(201,'Item stored succesuccessfully')
}

module.exports.updateSerie = function(id, jsSerie){
    if(!id){
        return handleResponse(400,'Item to be updated was not sent.')
    }

    let index
    index = newSeries.map(serie => serie.id).indexOf(action.serie.id);

    if(index < 0) {
        return handleResponse(404,'Item not found')
    }

    newSeries[index] = jsSerie
}

module.exports.deleteSerie = function(id){
    
}