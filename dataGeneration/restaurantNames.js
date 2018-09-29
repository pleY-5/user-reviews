const faker = require('faker');
const stringify = require('csv-stringify');
const fs = require('fs');

const generateMillionNames = (letter) => {

    var allPossibilities = [];
    for (let i = 0; i < 1000000; i++) {
        allPossibilities.push([('TuLan' + i + letter).split(' ').join('')]);
    }
    return allPossibilities;
};

const genTenMillionEntries = (num = 0) => {
    const letters = 'abcdefghij'.split('');
    if (num === 0) {
        stringify(generateMillionNames(letters[num]), (err, data) => {
            if (err) {
                console.log(err);
            } else {
                fs.writeFile('companyNames.csv', data, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                genTenMillionEntries(num+=1);
            }
        })
    } else if (num === 10) {
        console.log('done');
        return;
    }
    else {
        stringify(generateMillionNames(letters[num]), (err, data) => {
            if (err) {
                console.log(err);
            } else {
                fs.appendFile('companyNames.csv', data, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                genTenMillionEntries(num+=1);
            }
        });
    }
}

genTenMillionEntries();
