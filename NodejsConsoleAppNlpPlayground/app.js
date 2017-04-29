var $nlp = require('nlp-toolkit');
var $r = require('request');
var $f = require('fs');
var $e = require('event-stream');
var $franc = require('franc');
var $retext = require('retext');
var $sentiment = require('retext-sentiment');
var $latin = require('retext-latin');
var $debug = require('unist-util-inspect');

var content = '';

function analyzeConent() {
    $retext()
        .use($sentiment)
        .use(_ => (tree, file) => {
            file.nlp = {
                sentiment: {
                    valence: tree.data.valence,
                    polarity: tree.data.polarity,
                },
                language: $franc(content)
            };
        })
        .process(content, (err, file) => {
            console.log(JSON.stringify(file.nlp, null, 4));
        });
}

$f.createReadStream('content.txt')
    //$r('http://www.textfiles.com/virus/allvirus.vir')
    //    .pipe($e.map((x, cb) => cb(null, x.toString())))

    .on('data', text => content += text)
    .on('end', analyzeConent)

    //.pipe($nlp.tokenizer())
    //.pipe($nlp.stopwords())
    //.pipe($nlp.stemmer())
    //.pipe($nlp.frequency())
    //.on('data', tokens => {
    //    console.log('data');
    //    var a = 'test';
    //})
    //.on('end', (err, tokens) => {
    //    console.log('end');
    //})
    //.on('error', tokens => { console.log('error'); })
    //.on('close', tokens => { console.log('close'); })
    ;

process.stdin.on('data', _ => process.exit());