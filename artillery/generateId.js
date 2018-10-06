const fs = require('fs');

const generateAllUsers = () => {
  let csvString = '';
  for (let i = 9800000; i < 10000000; i += 1) {
    csvString += (i.toString() + '\n');
  }

  fs.appendFile(`./reviewId.csv`, csvString, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('done');
  });
};

generateAllUsers();
