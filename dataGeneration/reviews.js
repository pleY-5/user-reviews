const faker = require('faker');
const fs = require('fs');
const async = require('async');
const stringify = require('csv-stringify');
const path = require('path');

const reviews = [
  'Lorem ipsum dolor amet paleo dreamcatcher sustainable migas swag shaman. Pitchfork austin next level shabby chic pok pok jean shorts pork belly, church-key yuccie mumblecore hell of.',
  'Direct trade kitsch coloring book glossier neutra. Farm-to-table seitan letterpress, cronut freegan flannel sustainable neutra hashtag tofu art party.',
  'Small batch unicorn twee bespoke, migas ugh synth vexillologist tumeric fashion axe banjo banh mi. Brunch offal wolf mustache green juice tilde hammock hella XOXO.',
  'Kitsch lomo jean shorts portland, twee roof party paleo iceland actually four loko. Cliche succulents bespoke pour-over hot chicken activated charcoal, jean shorts wolf literally austin unicorn letterpress.',
  'Occupy microdosing photo booth, authentic butcher waistcoat try-hard ugh lo-fi fanny pack adaptogen XOXO scenester food truck. Poke umami cloud bread organic asymmetrical fingerstache iPhone pitchfork street art pok pok air plant.',
  'Stumptown VHS meh, kombucha celiac pop-up photo booth selvage thundercats locavore portland. Cronut squid godard, pour-over ethical man braid mustache. Chillwave retro af air plant blog chicharrones craft beer.',
  'Godard slow-carb retro cloud bread four dollar toast. Green juice chartreuse pinterest humblebrag, ramps tacos bitters. Vaporware humblebrag put a bird on it wolf tousled knausgaard banh mi blog.',
  'Microdosing activated charcoal raw denim kombucha normcore blog truffaut retro meggings helvetica locavore keytar brunch. Taiyaki schlitz ugh hot chicken mixtape. Single-origin coffee normcore cronut church-key echo park.',
  'Gluten-free echo park taxidermy, mixtape hammock umami kitsch. Offal tote bag tilde, cornhole trust fund ramps messenger bag vice succulents photo booth cardigan glossier pug.',
  'Lorem ipsum dolor amet celiac cred subway tile cardigan vinyl, chambray offal vexillologist pickled. Offal gluten-free PBR&B, occupy bitters tousled semiotics godard photo booth.',
  'Organic freegan sustainable food truck gastropub squid tattooed. Everyday carry butcher literally authentic semiotics actually squid small batch jianbing glossier freegan yuccie unicorn migas.',
  'Hammock mixtape shabby chic yuccie live-edge af humblebrag banh mi gochujang keytar. Blog cornhole mlkshk fam art party tbh unicorn ramps cray poke wayfarers messenger bag air plant pork belly forage.',
  'Sriracha hoodie meh, try-hard fashion axe enamel pin cold-pressed locavore plaid lyft cray. Tousled humblebrag meggings, seitan pork belly typewriter cornhole bespoke cliche chicharrones thundercats craft beer bicycle rights.',
  'Cliche iPhone YOLO, health goth hexagon selvage chia cred pitchfork chicharrones raclette. Franzen hell of shaman neutra lomo green juice kogi ethical tousled mlkshk knausgaard truffaut. Pickled direct trade polaroid art party.',
  'Health goth chartreuse raw denim wolf. Sustainable marfa occupy echo park ugh waistcoat hoodie. Fanny pack normcore organic microdosing, XOXO 3 wolf moon leggings. Gastropub health goth post-ironic selfies.',
  'Gastropub street art organic yr wolf listicle freegan sartorial bitters letterpress raw denim twee messenger bag shoreditch swag. Cardigan shaman glossier, ennui master cleanse photo booth salvia keffiyeh chia chartreuse banh mi everyday carry pop-up.',
  'Tilde banh mi vexillologist lyft, four loko taxidermy cronut photo booth street art ennui keytar direct trade swag freegan. Asymmetrical street art meh, squid vinyl sriracha lomo portland. Green juice cold-pressed drinking vinegar trust fund pickled, yr copper mug stumptown actually williamsburg.',
  'Cronut dreamcatcher portland williamsburg direct trade tumblr cardigan etsy af keffiyeh migas offal retro. Art party tacos fingerstache mlkshk asymmetrical wayfarers lumbersexual gastropub fam banjo raw denim. Try-hard cronut food truck sriracha.',
  'Sartorial artisan hexagon chia venmo. Chartreuse adaptogen 8-bit vexillologist taxidermy venmo. Four dollar toast hexagon iceland chambray DIY street art art party ramps narwhal letterpress franzen snackwave offal gentrify. VHS franzen copper mug kombucha, taiyaki DIY offal.',
  'Mumblecore gochujang swag, pok pok synth adaptogen microdosing stumptown glossier echo park flexitarian keytar before they sold out activated charcoal. Stumptown thundercats franzen direct trade.',
  'Unicorn pok pok meggings iceland. Lo-fi XOXO tofu semiotics mixtape next level skateboard affogato raw denim art party literally austin normcore wayfarers.',
  'Farm-to-table cornhole roof party, seitan yuccie cold-pressed put a bird on it hashtag twee humblebrag vice hell of etsy letterpress marfa. Kombucha organic jianbing vice fam man bun put a bird on it gentrify distillery letterpress skateboard roof party street art blue bottle vegan.',
  'Tousled paleo small batch stumptown. Dreamcatcher organic affogato forage jianbing schlitz flannel af fanny pack glossier wolf wayfarers sriracha plaid tote bag.',
  'Tacos locavore tousled tumblr cronut pok pok coloring book chambray celiac tofu pour-over banh mi. Keffiyeh direct trade beard vice palo santo, aesthetic pok pok. Hot chicken keytar health goth post-ironic, yr pickled jianbing glossier.',
  'Disrupt pinterest flannel seitan microdosing intelligentsia mixtape williamsburg glossier semiotics vegan migas artisan. Cloud bread selvage woke art party chambray adaptogen YOLO unicorn four loko kombucha beard.',
  'Meggings +1 pork belly disrupt franzen activated charcoal fanny pack thundercats, banjo snackwave biodiesel next level succulents. Prism skateboard venmo actually, vice ramps shoreditch pop-up poke.',
  'Edison bulb church-key disrupt coloring book skateboard narwhal, lo-fi austin hexagon snackwave flannel. Scenester portland listicle, twee helvetica yr shoreditch marfa lyft kinfolk cold-pressed authentic tumblr.',
  'Unicorn hoodie banh mi slow-carb irony lyft hell of mustache VHS edison bulb freegan cronut pickled adaptogen yuccie. Taxidermy pickled blog lomo raw denim photo booth.',
  'Cronut succulents squid etsy venmo photo booth blog lyft umami kombucha fam. Asymmetrical small batch leggings VHS. Typewriter four loko irony umami, vape keffiyeh squid post-ironic. Gastropub locavore disrupt brunch.',
  'Celiac disrupt chillwave health goth bushwick williamsburg man bun activated charcoal twee hoodie. Meditation adaptogen palo santo, tumeric normcore cardigan tousled mlkshk street art.'
]

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
};

// const generateUser = () => {
//   return {
//     user: {
//       name: faker.name.findName(),
//       city: faker.address.city(),
//       state: faker.address.stateAbbr(),
//       profileImage: faker.image.avatar(),
//       countFriends: getRandomIntInclusive(0, 750),
//       countReviews: getRandomIntInclusive(0, 450),
//       countPhotos: getRandomIntInclusive(0, 150),
//     }
//   }
// };

const generateHeader = (fileNumber) => {
  return 'restaurantId,name,reviewsCount,usefulCount,funnyCount,coolCount,ratings,user,usefulClicked,funnyClicked,coolClicked,reviewDate,reviewText,reviewCheckinCount\n'
}

const generateReview = (name) => {
  return `${getRandomIntInclusive(1, 10000001)},${name},${getRandomIntInclusive(0, 750)},${getRandomIntInclusive(0, 3)},${getRandomIntInclusive(0, 3)},${getRandomIntInclusive(0, 3)},${getRandomIntInclusive(1, 5)},${getRandomIntInclusive(1, 100001)},false,false,false,${faker.date.between('2015-01-01', '2018-9-30')},${reviews[getRandomIntInclusive(0, 29)]},${getRandomIntInclusive(0, 8)}\n`
};

const generateMillionNames = (letter) => {
  var allPossibilities = [];
  for (let i = 0; i < 1000000; i++) {
      allPossibilities.push([('TuLan' + i + letter).split(' ').join('')]);
  }
  return allPossibilities;
};

const generateData = (fileNumber) => {
  const letters = 'abcdefghij'.split('');
  if (fileNumber === 51) {
    return;
  }

  let csvString = '';

  let restaurantNames = generateMillionNames(letters[Math.floor(fileNumber / 5)]);

  for (let i = 0; i < 1000000; i++) {
    const review = generateReview(restaurantNames[i])
    csvString += review;
  }

  fs.appendFile(`./reviews/${fileNumber}.csv`, generateHeader(), (err) => {
    fs.appendFile(`./reviews/${fileNumber}.csv`, csvString, (err) => {
      if (err) {
        console.error(err);
      }
  
      console.log(fileNumber);
      generateData(fileNumber + 1);
    });
  })
};

generateData(1);