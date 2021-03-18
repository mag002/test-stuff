const {Parser} = require('json2csv');
const fs = require('fs')

const parser = new Parser({});

let testJson = fs.readFileSync('official.json');
// testJson = testJson.toString().replace("\n","<br>")
// console.log(testJson.toString());
console.log(testJson);
const objectJSON = JSON.parse(testJson.toString());

const language = objectJSON.language;

const header = Object.keys(language);

const csv = [
    `key,${header.join(',')}`,
    ...Object.keys(language.en).map(keyword=>{
        if (keyword.includes('TOAST_SCREENSHOT_SS')) {
            console.log('ok');
        }
        const value = header.reduce((string, item)=>{
            let value = language[item][keyword];
            if(!value){
                value = ''
            }
            value = JSON.stringify(value)
            value = value.replace(/\\\\n/g, "<br>");
            value = value.replace(/\\n/g,' ')
            value = value.replace(/\,/g,'<comma>')
            value = value.replace("<br>","\\n");
            value = value.replace(/\"/g,"")
            console.log(value);
            return string = string + value + "," 
        },"")
        return `${keyword},${value}`
    })
].join('\r\n')
csv.replace('/\n/g','#')
console.log(csv);
fs.writeFileSync('test.csv',csv)
console.log(csvJSON(csv));
fs.writeFileSync('test-out.json',JSON.stringify(csvJSON(csv)))

function csvJSON(csv) {
    const lines = csv.split('\r\n')
    const result = {}
    const headers = lines[0].split(',')
    headers.forEach(element => {
        if (element !== 'key') {
            result[element] = {}
        }
    });
    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue
        const currentline = lines[i].split(',')
        for (let j = 1; j < headers.length ; j++) {
            // console.log(result[headers[j]]);
            if (currentline[0]) {
                let value = currentline[j];
                value = value.replace('<comma>',',')
                value = value.replace(/\\/g,'')
                result[headers[j]][currentline[0]] = value
            }
        }
    }
    return result
}

const checkStructureCSV = (csvData) => {
    const lines = csvData.split('\r\n')
    const headers = lines[0].split(',')
    const allowedHeader = [
        'key', 'en', 'srp',
        'pl',  'zh', 'de',
        'es',  'fr', 'it',
        'ru'
      ]
    let cloneAllowedHeader = [...allowedHeader]
    // Check header is in ['key', 'en', 'srp', 'pl',  'zh', 'de', 'es',  'fr', 'it', 'ru']
    for (let i=0; i < headers.length; i++) {
        const index = cloneAllowedHeader.indexOf(headers[i]);
        if (index < 0) {
            return new Error(`Header ${i+1} is not correct`)
        }
        cloneAllowedHeader[i] = true;
    }
    if(!cloneAllowedHeader.every((item)=> item === true)) {
        return new Error(`Header is only in ['key', 'en', 'srp', 'pl',  'zh', 'de', 'es',  'fr', 'it', 'ru']`)
    }

    // Check row length

    for (let i=0; i < lines.length; i++) {
        console.log(lines[i].split(','));
        if (lines[i].split(',').length !== allowedHeader.length) {
            return new Error(`Error at line ${i+1}`)
        }
    }
    return csvData
}
