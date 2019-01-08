// our array
var rgbFolder = new Array();
var folder = localStorage.setItem('arr', JSON.stringify(rgbFolder))
console.log(folder);
// var rgb = 'rgb[212, 2, 0]';
// function saveLocalStorage(rgbValue){
//   rgbFolder.push(rgbValue);
//   // storing our array as a string
//   localStorage.setItem("rgbColors", JSON.stringify(rgbFolder));
// }
// saveLocalStorage(rgb);




const game = {};
var mycolors = [];
game.init = function(){
  setUpModeBtn();
  setUpSquares();
  reset();
}
if (localStorage.getItem('myColors') === null) {
  var myColors = localStorage.getItem('myColors');
  myColors = [];
}

let mySavedColors = [];
let colors = [];
let squareNum = 6;
let pickedColor;
let clickedSquare;
const h1 = document.querySelector('h1');
const squares = document.querySelectorAll('.square');
const colorSpan = document.getElementById('colorDisplay');
const msg = document.querySelector('#msg');
const newColor = document.querySelector('#newColor');
const easy = document.querySelector('#easy');
const hard = document.querySelector('#hard');
const modeBtn = document.querySelectorAll('.mode');

game.init();

// Set up the mode between easy and hard
function setUpModeBtn(){
  for (var i = 0; i < modeBtn.length; i++) {
    modeBtn[i].addEventListener('click', function(){
      modeBtn[0].classList.remove('selected');
      modeBtn[1].classList.remove('selected');
      this.classList.add('selected');
      this.textContent === 'EASY' ? squareNum = 3: squareNum = 6;
      reset();
    });
  }
}
const saveBtn = document.getElementById('saveColorBtn');
saveBtn.style.display = 'none';


// When sqaures are clicked they are checked
// to see if it matches the random value
function setUpSquares(){
var arr = [];
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function(){
       clickedSquare = this.style.backgroundColor;
      if (clickedSquare === pickedColor) {
        saveBtn.style.display = 'inline-block';
        msg.textContent = 'Correct!';
        msg.style.fontWeight = "bold";
        msg.style.color = "red";
        changeColors(clickedSquare);
        h1.style.backgroundColor = clickedSquare;
        newColor.textContent  = "Play Again?";

        // Save the color to localStorage
        // Get locally stored Color data
        var jsonArray = localStorage.getItem('array');
        if (jsonArray) {
          var mainArray = JSON.parse(jsonArray);
        }else {
          // Set empty storage array if no data exists
          var mainArray = [];
        }
        saveBtn.addEventListener('click', function(){
          mainArray.push(clickedSquare);
          localStorage.setItem('array', JSON.stringify(mainArray));
          console.log("ADDED To Array: "+mainArray);
          location.reload();
          msg.textContent = 'Color Saved';
          setTimeout(fadeout, 2000);
        });

      }else {
        this.style.backgroundColor = '#000';
        msg.textContent = 'Try Again!';
        msg.style.color = "white";
        setTimeout(fadeout, 1500);
      }
    });
  }
}



function getFromLocalStorage(){
  if (localStorage.getItem('myColors')) {
    return localStorage.getItem('myColors');
  }else {
    return [];
  }
}


// Disappear 'try again' message after 1.5 sec
function fadeout(){
  msg.textContent = '';
}

// Re-populate square with random colors
function reset(){
  colors = generateRandomColors(squareNum);
  pickedColor = pickColor();
  colorSpan.textContent = pickedColor;
  newColor.textContent  = "New Color"
  msg.textContent = '';
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i]
    }else {
      squares[i].style.display = 'none';
    }
  }
  h1.style.backgroundColor = "#777";
}

colorSpan.textContent = pickedColor;

newColor.addEventListener('click', function(){
  reset();
});

// show the correct color
function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

// Generating random color values
function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random]
}

// Generating color for color array
function generateRandomColors(num){
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

// Display random color value
function randomColor(){
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById("instruct");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
