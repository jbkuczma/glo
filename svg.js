module.exports = {
	addBackArrowToNavBar: function() {
		const backArrowSVG = `
		    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve">
		      <polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/>
		    </svg>`
		const backArrowSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M70,38H16.605l24.504-16.336c0.919-0.613,1.167-1.854,0.555-2.773c-0.613-0.919-1.855-1.169-2.773-0.555l-30,20  c-0.001,0.001-0.002,0.002-0.003,0.002c-0.125,0.083-0.236,0.184-0.339,0.292c-0.031,0.033-0.057,0.069-0.086,0.104  c-0.067,0.081-0.127,0.166-0.181,0.257c-0.025,0.043-0.049,0.085-0.071,0.13c-0.047,0.096-0.084,0.196-0.116,0.3  c-0.013,0.042-0.028,0.081-0.038,0.124C8.022,39.692,8,39.843,8,40s0.022,0.308,0.057,0.454c0.01,0.042,0.025,0.082,0.038,0.124  c0.032,0.104,0.069,0.204,0.116,0.3c0.022,0.045,0.045,0.087,0.071,0.13c0.054,0.091,0.114,0.176,0.181,0.257  c0.029,0.035,0.055,0.071,0.086,0.104c0.103,0.109,0.214,0.209,0.339,0.292c0.001,0,0.002,0.001,0.003,0.002l30,20  C39.231,61.892,39.617,62,39.998,62c0.646,0,1.281-0.312,1.666-0.891c0.613-0.919,0.364-2.161-0.555-2.773L16.605,42H70  c9.925,0,18,8.075,18,18s-8.075,18-18,18H50c-1.104,0-2,0.896-2,2s0.896,2,2,2h20c12.131,0,22-9.869,22-22S82.131,38,70,38z"/></svg>'
		var backArrowHTML = "<div class="_r1svv"><a class="_gx3bg" href="/"><div class="_o5rm6 coreSpriteMobileNavHomeActive"></div></a></div>"
		var current = document.getElementById('_n7q2c')
		console.log(current)
	}
}