'use strict';

// global varibales
let allProducts = [];
let clicks = 0;
let clicksAllowed = 25;
let sameNumbers = [];

// accessing the DOM
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
// let myAside = document.querySelector('aside ul');
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:last-child');
let ctx = document.getElementById('myChart').getContext('2d');

// constructor
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

// retrieve storage if exists or instantiate objects if does not.
let retrievedProducts = localStorage.getItem('allProducts');
if (retrievedProducts) {
  let parsedProducts = JSON.parse(retrievedProducts);
  allProducts = parsedProducts;
} else {
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
}

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

// function to count the clicks generated for each imageOne, Two or Three of the sameNumbers array. Then it takes those 3 images out of the array and stops allowing clicks when the clicksAllowed is reached.
function clickHandler(event) {
  clicks++;
  let imageClicked = event.target.title;
  if (imageClicked === 'imageOne') {
    allProducts[sameNumbers[0]].clicks++;
  }
  if (imageClicked === 'imageTwo') {
    allProducts[sameNumbers[1]].clicks++;
  }
  if (imageClicked === 'imageThree') {
    allProducts[sameNumbers[2]].clicks++;
  }
  sameNumbers = sameNumbers.slice(3, 6);
  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', clickHandler);
    myButton.addEventListener('click', resultHandler);
    let stringifiedProducts = JSON.stringify(allProducts);
    localStorage.setItem('allProducts', stringifiedProducts);
  }
  renderProducts();
}

// function for pushing products as strings into labels for chart.js
// function productsForChart() {
function resultHandler() {
  let productNames = [];
  let productViews = [];
  let productClicks = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }

  // function to create each product with the views and clicks in the aside.
  // added the chart.js to chart the results of the clicks/views.
  // function resultHandler() {
  // console.log('resultHandler');
  // for (let i = 0; i < allProducts.length; i++) {
  //   let li = document.createElement('li');
  //   li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes, and was seen ${allProducts[i].views} times.`;
  //   myAside.appendChild(li);
  // }
  myButton.removeEventListener('click', resultHandler);
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor: '#f0ffff',
        borderColor: '#e0ffff',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(153, 102, 255, 0.6)',
        hoverBorderColor: 'rgba(153, 102, 255, 1)'
      }, {
        label: '# of Clicks',
        data: productClicks,
        backgroundColor: '#800000',
        borderColor: '#404040',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255, 206, 86, 0.6)',
        hoverBorderColor: 'rgba(255, 206, 86, 1)'
      }]
    },
    options: {
      indexAxis: 'y',
      color: 'rgba(255, 255, 255, 1)',
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  });
}

renderProducts();

myContainer.addEventListener('click', clickHandler);
