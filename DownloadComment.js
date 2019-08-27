var gplay = require('google-play-scraper');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function adicionaAplicativoCategoria(array, app, categoria) {    
    array.forEach(element => {
        element.aplicativo = app;
        element.categoria = categoria;
    });
}

function filtraJson(jsonObj, i) {
    var str = 'comentariosWPP';
    jsonObj.aplicativo = 'whatsapp';
    jsonObj.categoria = 'mensageiro';
    adicionaAplicativoCategoria(jsonObj, 'whatsapp', 'mensageiro');
    const csvWriter = createCsvWriter({
        path: str.concat(i, '.csv'),
        header: [
            { id: 'userName', title: 'USUARIO' },
            { id: 'text', title: 'COMENTARIO' },
            { id: 'date', title: 'DATACOMENTARIO' },
            { id: 'aplicativo', title: 'aplicativo' },
            { id: 'categoria', title: 'categoria' }
        ]
    });
    csvWriter.writeRecords(jsonObj)       // returns a promise
        .then(() => {
            console.log('...Done');
        });
}
function coletadorDeComentarios(i) {
    gplay.reviews({
        appId: 'com.whatsapp',
        page: i,
        lang: 'en'
    }).then(function (comentarios) { filtraJson(comentarios, i) }, console.log);
}

function rodaNvezes(n) {
    for (var i = 0; i < n; i++) {
        teste(i);
    }
}
rodaNvezes(20);


