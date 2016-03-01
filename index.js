'use strict';
const Path = require("path");
const Package = require('./package.json');
const Hoek = require('Hoek');

exports.register = function (plugin, options, next) {

    const assetDirPath = Path.join(__dirname,  Path.sep + 'assets');
    const templateDirPath = Path.join(__dirname,  Path.sep + 'templates');
    const shortName =  'hub';

    let theme = {
        'name': Package.name,
        'version': Package.version,
        'shortName': shortName,
        'templatesPath': templateDirPath,
        'partialsPath': templateDirPath + Path.sep + 'withPartials',
        'indexPage': false,
        'groupPages': true,
        'itemPages': true,
        'assetPath': assetDirPath,
        'cssLinks': [
            '/waypointer/' + shortName + '/css/reset.css',
            '/waypointer/' + shortName + '/css/documentation.css',
            '/waypointer/' + shortName + '/css/pagination.css',
            '/waypointer/' + shortName + '/css/pygments.css',
            '/waypointer/' + shortName + '/css/tomorrow.min.css'
        ],
        'jsLinks': [
            '/waypointer/' + shortName + '/js/jquery.min.js',
            '/waypointer/' + shortName + '/js/documentation.js',
            '/waypointer/' + shortName + '/js/images.js',
            '/waypointer/' + shortName + '/js/highlight.min.js',
            '/waypointer/' + shortName + '/js/stickyfill.js'
        ]
    }
    // Not used for this theme
    //'helpersPath': templateDirPath + Path.sep + 'helpers',

    if(Hoek.reach(Package, 'repository.url')){
        theme.url = Hoek.reach(Package, 'repository.url');
    }
    if(Hoek.reach(Package, 'license')){
        theme.license = Hoek.reach(Package, 'license');
    }

    next( theme );
}
