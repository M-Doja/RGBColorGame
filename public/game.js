// var game = {};
// game.init = function(){
//   setUpModeBtn();
//   setUpSquares();
//   reset();
// }

var colors = [];
var squareNum = 6;
var pickedColor;
const h1 = document.querySelector('h1');
const squares = document.querySelectorAll('.square');
const colorSpan = document.getElementById('colorDisplay');
const msg = document.querySelector('#msg');
const newColor = document.querySelector('#newColor');
const easy = document.querySelector('#easy');
const hard = document.querySelector('#hard');
const modeBtn = document.querySelectorAll('.mode');

init();

function init(){
  setUpModeBtn();
  setUpSquares();
  reset();
}

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
function setUpSquares(){
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function(){
      var clickedSquare = this.style.backgroundColor;
      if (clickedSquare === pickedColor) {
        msg.textContent = 'Correct!';
        changeColors(clickedSquare);
        h1.style.backgroundColor = clickedSquare;
        newColor.textContent  = "Play Again?"
      }else {
        this.style.backgroundColor = '#232323';
        msg.textContent = 'Try Again!'
      }
    });
  }
}

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
  h1.style.backgroundColor = "steelblue";
}

colorSpan.textContent = pickedColor;

newColor.addEventListener('click', function(){
  reset();
});



function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random]
}

function generateRandomColors(num){
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor(){
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
