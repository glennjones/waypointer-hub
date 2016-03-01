# waypointer-hub

## IN DEVELOPMENT - API NOT STABLE

A html theme for Waypointer based lossly on githubs api documentation style.

```bash
$ npm install waypointer-hub
```

``` javascript
const Waypointer = require('waypointer');

let options = {
    'swagger': {... a swagger json object}
    'themes': [{
        theme: require('waypointer-hub')
    }]
}

waypointer.json( options, (err, waypointer) => {
     // do something with json
});

options.dist = 'a path for dist folder';

waypointer.buildDist( options, (err, waypointer) => {
     // do something when dist is built
});
```

## Test server
From within the projects directory
```bash
$ npm i
$ node bin/test-server.js
```
In your browser go to http://localhost:3012/waypointer/

## TODO
* Add images of interface
* Add description of parent project
* Add grunt to to concat the js and css files
* Add media queries - the orginal layout is designed for desktop
* Add documentation of the key features in templates
* Add documentation of forking the project and reuse of templates

## Issues
If you find any issue please file here on github and I will try and fix them.