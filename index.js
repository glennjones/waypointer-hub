'use strict';
const Path = require('path');
const Package = require('./package.json');
const Hoek = require('Hoek');

exports.register = function (plugin, options, next) {
  const assetDirPath = Path.join(__dirname, Path.sep + 'assets');
  const templateDirPath = Path.join(__dirname, Path.sep + 'templates');
  const shortName = 'hub';

  let theme = {
    name: Package.name,
    version: Package.version,
    shortName: shortName,
    templatesPath: templateDirPath,
    partialsPath: templateDirPath + Path.sep + 'withPartials',
    helpersPath: templateDirPath + Path.sep + 'helpers',
    indexPage: true,
    groupPages: true,
    itemPages: true,
    assetPath: assetDirPath,
    cssLinks: [
      '/waypointer/assets/' + shortName + '/css/reset.css',
      '/waypointer/assets/' + shortName + '/css/documentation.css',
      '/waypointer/assets/' + shortName + '/css/pagination.css',
      '/waypointer/assets/' + shortName + '/css/pygments.css',
      '/waypointer/assets/' + shortName + '/css/tomorrow.min.css',
    ],
    jsLinks: [
      '/waypointer/assets/' + shortName + '/js/jquery.min.js',
      '/waypointer/assets/' + shortName + '/js/documentation.js',
      '/waypointer/assets/' + shortName + '/js/images.js',
      '/waypointer/assets/' + shortName + '/js/highlight.min.js',
      '/waypointer/assets/' + shortName + '/js/stickyfill.js',
    ],
  };

  if (Hoek.reach(Package, 'repository.url')) {
    theme.url = Hoek.reach(Package, 'repository.url');
  }
  if (Hoek.reach(Package, 'license')) {
    theme.license = Hoek.reach(Package, 'license');
  }

  theme.filters = {
    shorten: (str, count) => {
      return str.slice(0, count || 5);
    },
    hubUrlTemplate: (path) => {
        // Converts to Github urlTemplate structure
        if(!path){
            return '';
        }
        var paths = [path];
        if(path.indexOf('/') > -1){
            paths = path.split('/')
        }
        paths = paths.map(function(segment){
            if(segment.startsWith('{') && segment.endsWith('}')){
                return ':' + segment.slice(1, -1);
            }
            return segment
        })
        return paths.join('/')
    }

  };

  next(theme);
};
