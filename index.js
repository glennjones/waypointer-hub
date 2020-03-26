'use strict';
const Path = require("path");
const Package = require('./package.json');
const Hoek = require('@hapi/hoek');

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
        'helpersPath': templateDirPath + Path.sep + 'helpers',
        'indexPage': true,
        'groupPages': true,
        'itemPages': true,
        'assetPath': assetDirPath,
        'cssLinks': [
            '/waypointer/assets/' + shortName + '/css/reset.css',
            '/waypointer/assets/' + shortName + '/css/documentation.css',
            '/waypointer/assets/' + shortName + '/css/pagination.css',
            '/waypointer/assets/' + shortName + '/css/pygments.css',
            '/waypointer/assets/' + shortName + '/css/tomorrow.min.css'
        ],
        'jsLinks': [
            '/waypointer/assets/' + shortName + '/js/jquery.min.js',
            '/waypointer/assets/' + shortName + '/js/documentation.js',
            '/waypointer/assets/' + shortName + '/js/images.js',
            '/waypointer/assets/' + shortName + '/js/highlight.min.js',
            '/waypointer/assets/' + shortName + '/js/stickyfill.js'
        ]
    }


    if(Hoek.reach(Package, 'repository.url')){
        theme.url = Hoek.reach(Package, 'repository.url');
    }
    if(Hoek.reach(Package, 'license')){
        theme.license = Hoek.reach(Package, 'license');
    }

    next( theme );
}
