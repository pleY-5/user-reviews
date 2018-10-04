const faker = require('faker');
const stringify = require('csv-stringify');
const fs = require('fs');

const generateMillionNames = (letter, num) => {
    let id = num * 1000000 + 1;
    let csvString = '';

    for (let i = 0; i < 1000000; i++) {
      const currentStr = `${id},TuLan${i}${letter}\n`
      csvString += currentStr;
      id++;
    }
    return csvString;
};

const generateRestaurantNames = (num = 0) => {
  const letters = 'abcdefghij'.split('');

  if (num === 10) {
    console.log('done');
    return;
  } else {
    const csvString = generateMillionNames(letters[num], num);
    fs.appendFile('./restaurants/restaurantNames.csv', csvString, (err) => {
      if (err) {
        console.log(err);
      }
      generateRestaurantNames(num + 1);
    });
  }
}

generateRestaurantNames();