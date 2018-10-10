const uuidv4 = require('uuid');
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

module.exports.getSeries = function(id, callback){
    if(!id){
        callback(null, series)
        return
    }
    let objReturn = series.filter(serie => serie.id == id);

    if(!objReturn.length) {
        callback(404,'')
        return
    }
    callback(null, objReturn);
}

module.exports.postSerie = function(jsSerie, callback){
    if(!jsSerie) {    
        callback(400,'')
        return
    }
    
    jsSerie.id = uuidv4();
    series.push(jsSerie);
    callback(null,{message: 'Item stored successfully', id: jsSerie.id});
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
    console.log(id)
    if(!id){
        callback(404,'')
        return
    }

    let index
    index = series.map(serie => serie.id).indexOf(id);
    console.log(index)
    if(index < 0) {
        callback(404,'')
        return
    }

    series.splice(index,1);

    callback(null,'')
}
