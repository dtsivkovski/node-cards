/**
 * Used from routing solution: 
 * https://stackoverflow.com/a/6064205
 */

var fs = require('fs');

module.exports = function(app){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substring(0, file.indexOf('.'));
        require('./' + name)(app);
    });
}