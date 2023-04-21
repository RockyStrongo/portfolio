const colorSchemes = [
  ["#00CFFF", "#FF736C"],
  ["#FFE600", "#00CFFF"],
  ["#f72585", "#7209b7"],
  ["#1B9CFC", "#55E6C1"],
  ["#4b4e6d", "#fc4a1a"],
  ["#d9f2d2", "#89c2a9"],
  ["#54A0FF", "#D399FF"],
  ["#00B4DB", "#0083B0"],
  ["#5F2C82", "#49A09D"],
  ["#FFC8B4", "#FFA07A"],
  ["#F1F1F1", "#333333"]
];



let index = 0;
const items = document.querySelectorAll('.animation-item');

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
  var targetDivPosition = document.querySelector('.second-page').offsetTop;
  const span = document.querySelector('.underline--magical');
  underlineAnimation(span)
});

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}

function underlineAnimation(span) {
  setTimeout(function () { span.style.backgroundSize = "100% 88%" }, 1000);
}