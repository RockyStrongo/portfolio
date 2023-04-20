var colorSchemes = [["#FF736C", "#FFE600"],
["#00CFFF", "#FF736C"],
["#FFE600", "#00CFFF"]
];

var index = 0;
var items = document.querySelectorAll('.animation-item');

function changeColor() {
  for (var i = 0; i < items.length; i++) {
    items[i].style.background = "linear-gradient(to bottom right, " + colorSchemes[index][0] + ", " + colorSchemes[index][1] + ")";
  }
  index++;
  if (index >= colorSchemes.length) {
    index = 0;
  }
}

setInterval(changeColor, 1000);

window.addEventListener('scroll', function () {
  var scrollPosition = window.scrollY;
  var targetDivPosition = document.getElementById('show-header-from-here').offsetTop;
  if (scrollPosition >= targetDivPosition) {
    document.querySelector('.header').style.display = 'flex';
  } else if (scrollPosition < targetDivPosition) {
    document.querySelector('.header').style.display = 'none';
  }
});

function scrollToBottom() {
  console.log("test")
  document.documentElement.scrollTop = document.documentElement.scrollHeight;
  document.body.scrollTop = document.body.scrollHeight;
}
