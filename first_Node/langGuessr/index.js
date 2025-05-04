const franc = require('franc');
const langs = require('langs');
const input = process.argv[2];
// const langCode = franc('Alle menslike wesens word vry') //=> 'afr'
const langCode = franc(input);

const language = langs.where("3", langCode);
console.log(langs.where("3", "Friend"));