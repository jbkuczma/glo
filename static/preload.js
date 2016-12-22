const path = require('path')
const fs = require('fs')

function injectLightCSS(){
	var lightCSS = fs.readFileSync(path.join(__dirname, '/light.css'))
	var style = document.createElement("style")
	var styleContent = document.createTextNode(lightCSS.toString())
	style.appendChild(styleContent)
	document.getElementsByTagName("head")[0].appendChild(style)
}

function init(){
	injectLightCSS()
}

document.addEventListener('DOMContentLoaded', (event) => {
  init()
})