// Handlebars helper
// takes a standard url template and return the github version
// from  /sum/divide/{a}/{b}
// to    /sum/divide/:a/:b


module.exports = function (path) {
	if(!path){
        return '';
    }

    var paths = [path];
    if(path.indexOf('/') > -1){
        paths = path.split('/')
    }
    paths = paths.map(function(segment){
        if(startWith(segment, '{') && endWith(segment, '}')){
            return ':' + segment.slice(1, -1);
        }
        return segment
    })

	return paths.join('/')
}

function startWith(text, test) {
    return text.indexOf(test) === 0;
}

function endWith(text, test) {
    return text.indexOf(test, this.length - test.length) !== -1;
}
