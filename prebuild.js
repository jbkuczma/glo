const config = require('./config')
const fs = require('fs')
const file = 'config.js'

if(config.dev) {
	config.dev = false
	fs.writeFile(file, 'module.exports = ' + JSON.stringify(config, null, 2), function (err) {
	  if (err) return console.log(err)
	});
}