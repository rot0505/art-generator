const fs = require('fs');
const { traits } = require('./consts');

traits.forEach(trait => {
	trait.elements.forEach(fe => {
		const res = fs.existsSync('images' + fe.path);
		if (res === false) {
			console.log('res: ', fe, res)
			console.log(fe.path);
		}
	})
})