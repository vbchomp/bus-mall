'use strict';

// global varibales
let allProducts = [];
let clicks = 0;
let clicksAllowed = 5;
let sameNumbers = [];

// accessing the DOM
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let myAside = document.querySelector('aside ul');
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:last-child');

// constructor
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

// new instances
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');


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

// function to select random numbers between 0 and 18, the numbers of the product images in the allProducts array
function selectRandomProductIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

// function to select only unique numbers that are not in the sameNumbers array. this will not allow a product image to repeat more than once in every 6 images.
function selectUniqueProductNumbers() {
  while (sameNumbers.length < 6) {
    let numbers = selectRandomProductIndex();
    if (!sameNumbers.includes(numbers)) {
      sameNumbers.push(numbers);
    }
  }
}

// function to assign a product image the latest unique number and push to the allProducts array and increments the views each product receives. 
function renderProducts() {
  selectUniqueProductNumbers();
  let productOne = sameNumbers[0];
  let productTwo = sameNumbers[1];
  let productThree = sameNumbers[2];
  imageOne.src = allProducts[productOne].src;
  imageOne.alt = allProducts[productOne].name;
  allProducts[productOne].views++;
  imageTwo.src = allProducts[productTwo].src;
  imageTwo.alt = allProducts[productThree].name;
  allProducts[productTwo].views++;
  imageThree.src = allProducts[productThree].src;
  imageThree.alt = allProducts[productThree].name;
  allProducts[productThree].views++;
}

function clickHandler(event) {
  clicks++;
  let imageClicked = event.target.title;
  if (imageClicked === 'imageOne'){
    allProducts[sameNumbers[0]].clicks++;
  }
  if (imageClicked === 'imageTwo'){
    allProducts[sameNumbers[1]].clicks++;
  }
  if (imageClicked === 'imageThree'){
    allProducts[sameNumbers[2]].clicks++;
  }
  sameNumbers = sameNumbers.slice(3,6);
  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', clickHandler);
    myButton.addEventListener('click', resultHandler);
  }
  renderProducts();
}

function resultHandler() {
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes, and was seen ${allProducts[i].views} times.`;
    myAside.appendChild(li);
  }
  myButton.removeEventListener('click', resultHandler);
}

renderProducts();

myContainer.addEventListener('click', clickHandler);
