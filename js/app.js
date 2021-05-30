'use strict';

// global varibales
let allProducts = [];
let clicks = 0;
let clicksAllowed = 25;

// accessing the DOM
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:last-child');

// constructor

function Product (name, fileExtension = 'jpg', ){
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

new Product ('bag');
new Product ('banana');
new Product ('bathroom');
new Product ('boots');
new Product ('breakfast');
new Product ('bubblegum');
new Product ('chair');
new Product ('cthulhu');
new Product ('dog-duck');
new Product ('dragon');
new Product ('pen');
new Product ('pet-sweep');
new Product ('scissors');
new Product ('shark');
new Product ('sweep', 'png');
new Product ('tauntaun');
new Product ('unicorn');
new Product ('water-can');
new Product ('wine-glass');







// assets
// imageOne.src = 'img/bag.jpg';
// imageTwo.src = 'img/banana.jpg';
// imageThree.src = 'img/bathroom.jpg';
// imageFour.src = 'img/boots.jpg';
// imageFive.src = 'img/breakfast.jpg';
// imageSix.src = 'img/bubblegum.jpg';
// imageSeven.src = 'img/chair.jpg';
// imageEight.src = 'img/cthulhu.jpg';
// imageNine.src = 'img/dog-duck.jpg';
// imageTen.src = 'img/dragon.jpg';
// imageEleven.src = 'img/pen.jpg';
// imageTwelve.src = 'img/pet-sweep.jpg';
// imageThirteen.src = 'img/scissors.jpg';
// imageFourteen.src = 'img/shark.jpg';
// imageFifteen.src = 'img/sweep.jpg';
// imageSixteen.src = 'img/tauntaun.jpg';
// imageSeventeen.src = 'img/unicorn.jpg';
// imageEighteen.src = 'img/water-can.jpg';
// imageNineteen.src = 'img/wine-glass.jpg';
