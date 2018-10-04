const faker = require('faker');
const fs = require('fs');

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
};

const generateUser = (i) => {
  return `${i},${faker.name.findName()},${faker.address.city()},${faker.address.stateAbbr()},${faker.image.avatar()},${getRandomIntInclusive(0, 750)},${getRandomIntInclusive(0, 450)},${getRandomIntInclusive(0, 150)}\n`;
}

const generateAllUsers = () => {
  let csvString = '';
  for (let i = 0; i < 1000000; i++) {
    const user = generateUser(i)
    csvString += user;
  }
  
  fs.appendFile(`./users/user.csv`, csvString, (err) => {
    if (err) {
      console.error(err);
    }
  
    console.log('done');
  });
}

generateAllUsers();
