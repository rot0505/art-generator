const mergeImages = require('merge-images-v2');
const fs = require('fs');
const Canvas = require('canvas');
// const { MakeMinty } = require('./minty');
const {traits} = require('./consts');
// const axios = require('axios');

function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

async function generateRandomImages() {

	const randomTraits = traits.map(rait => ({
		type: rait.name,
		ids: shuffle(rait.elements.reduce((total, cur, idx) => {
			for (let step = 0; step < cur.weight; step++) {
				total.val[total.len++] = idx;
			}
			return total;
		}, {val: [], len: 0}).val)
	}));

	// let minty = await MakeMinty();
	for (let i = 0; i < 6666; i++) {
		const prefix = 'images';
		const selectTrait = randomTraits.map((trait, idx) => ({
			trait_type: trait.type,
			value: traits[idx].elements[trait.ids[i]].name,
			path: traits[idx].elements[trait.ids[i]].path,
			count: traits[idx].elements[trait.ids[i]].weight,
			frequency: traits[idx].elements[trait.ids[i]].frequency,
			description: traits[idx].elements[trait.ids[i]].description
		}));

		let imgs2merge = selectTrait.map(trait => (prefix + trait.path));
		
		let imagePath = __dirname + `/nft/${i+1}.png`;
		await mergeImages(imgs2merge, {
			Canvas: Canvas
		}).then(img => {
			var base64Data = img.replace(/^data:image\/png;base64,/, "");
			const buf = new Buffer(base64Data, 'base64').toString('binary');
			fs.writeFileSync(imagePath, buf, 'binary');
			console.log(`${i+1}.png created`);
		});
		let description = selectTrait[2].description;
		if (selectTrait[1].value.startsWith("Rotten"))
			description += (" " + selectTrait[1].description);
		const metaData = {
			token_id: i+1,
			name: `TheHexagon #${i+1}`,
			description: description,
			// path: imagePath,
			attributes: selectTrait
		}
		// const nft = await minty.createNFTFromAssetFile(imagePath, metaData);
		const metafile = __dirname + `/metadata/${i+1}`;
		fs.writeFileSync(metafile, JSON.stringify(metaData), 'utf-8');
		// console.log(nft);
	}
	// const meta = await minty.createMetaDataIPFS(__dirname+'/metadata');
	// console.log(meta);
	console.log('file creating finished');
}

generateRandomImages();