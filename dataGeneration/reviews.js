const faker = require('faker');
const fs = require('fs');

const reviews = [
  'Direct trade kitsch coloring book',
  'Kitsch lomo jean shorts portland',
  'Occupy microdosing photo booth, authentic',
  'Stumptown VHS meh, kombucha celiac',
  'Godard slow-carb retro cloud bread',
  'Microdosing activated charcoal raw denim',
  'Gluten-free echo park taxidermy, mixtape',
  'Lorem ipsum dolor amet celiac',
  'Organic freegan sustainable food truck',
  'Hammock mixtape shabby chic yuccie',
  'Sriracha hoodie meh, try-hard',
  'Cliche iPhone YOLO, health goth',
  'Health goth chartreuse raw denim wolf.',
  'Gastropub street art organic yr',
  'Tilde banh mi vexillologist lyft',
  'Cronut dreamcatcher portland williamsburg',
  'Sartorial artisan hexagon chia venmo.',
  'Mumblecore gochujang swag, pok pok',
  'Unicorn pok pok meggings iceland.',
  'Tousled paleo small batch stumptown.',
  'Tacos locavore tousled tumblr cronut',
  'Disrupt pinterest flannel seitan microdosing',
  'Meggings +1 pork belly disrupt franzen',
  'Edison bulb church-key disrupt coloring.',
  'Unicorn hoodie banh mi slow-carb irony.',
  'Cronut succulents squid etsy venmo photo.',
  'Celiac disrupt chillwave health goth.',
];

const getRandomIntInclusive = (min, max) => {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
};

const generateHeader = () => 'restaurantId,restaurant_name,user_id,date,count_star_ratings,count_checkin,ratings,useful_count,funny_count,cool_count,reviews_count,useful_clicked,funny_clicked,cool_clicked,review\n';


const generateReview = (restaurantId, restaurantName) => {
  return `${restaurantId},${restaurantName},${getRandomIntInclusive(0, 999999)},${faker.date.between('2015-01-01', '2018-9-30')},${getRandomIntInclusive(1, 5)},${getRandomIntInclusive(0, 8)},${getRandomIntInclusive(1, 5)},${getRandomIntInclusive(0, 3)},${getRandomIntInclusive(0, 3)},${getRandomIntInclusive(0, 3)},${getRandomIntInclusive(0, 750)},false,false,false,"${reviews[getRandomIntInclusive(0, 26)]}"\n`;
};

const generateMillionNames = (letter) => {
  const allPossibilities = [];
  for (let i = 0; i < 1000000; i++) {
    allPossibilities.push([('TuLan' + i + letter).split(' ').join('')]);
  }
  return allPossibilities;
};

const generateAllReviews = (fileNumber) => {
  const letters = 'abcdefghij'.split('');

  if (fileNumber === 51) {
    console.log('done');
    return;
  }

  let csvString = '';
  const set = Math.floor((fileNumber - 1) / 5);
  let restaurant_id = set * 1000000 + 1;


  let restaurantNames = generateMillionNames(letters[set]);

  for (let i = 0; i < 1000000; i++) {
    const review = generateReview(restaurant_id, restaurantNames[i]);
    restaurant_id++;
    csvString += review;
  }

  fs.appendFile(`./reviews/review${fileNumber}.csv`, generateHeader(), (err) => {
    fs.appendFile(`./reviews/review${fileNumber}.csv`, csvString, (err) => {
      if (err) {
        console.error(err);
      }

      console.log(fileNumber);
      generateAllReviews(fileNumber + 1);
    });
  });
};

generateAllReviews(1);
