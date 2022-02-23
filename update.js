const fs = require('fs');
const jsonfile = require('jsonfile');
var files = fs.readdirSync('./metadata');

for(var w_i = 0; w_i < files.length; w_i++)
{
    var w_path = 'metadata/' + files[w_i];
    //console.log(w_path);
    var obj = jsonfile.readFileSync(w_path);
    // obj.image = 'http://ipfs.io/ipfs/QmenAEJZW6CB1ZBb754Zj2eMn22Ppg9mRrNrH5yYGgFbPT/' + obj.token_id + ".png";
    obj.name = `Crognomes #${files[w_i]}`;
    // obj.description = '2000 secretive hard working Crognomes living on the cronos blockchain who might share the location of the secret mines if taken care of well enough';
    // obj.attributes = obj.attributes.map(attr => ({trait_type: attr.trait_type, value: attr.value}))
    jsonfile.writeFileSync(w_path, obj);
}