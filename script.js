const pearlNumber = 10;
var fullPageHeight = document.documentElement.scrollHeight *-1; //so the pearls don't disappear after 100vh...
document.documentElement.style.setProperty("--pageHeight", fullPageHeight + "px");

for (let i = 0; i < pearlNumber; i++) {
  const pearl = document.createElement("div");
  pearl.classList.add("pearl");
  pearl.style.left = Math.random() * 100 + "vw"; // random position (in view widths)
  pearl.style.animationDuration = (3 + Math.random() * 3) + "s"; //between 3 and 6!
  pearl.style.animationDelay = Math.random() * 5 + "s"; 
  const bobaColors = [
    '#a4e1f3',
    '#ad3c3a',
    '#fc8707',
    '#ff9b28',
    '#fccf38',
    '#fca9ae',
    '#acdb96',
    '#62b740',
    '#7f78ba',
    '#270b0b'  
  ];
  const baseColor = bobaColors[Math.floor(Math.random() * bobaColors.length)];
  pearl.style.background = `radial-gradient(circle at 30% 30%, ${lighten(baseColor, 0.7)}, ${baseColor})`;  
  document.body.appendChild(pearl);
}
function lighten(hex, percent) {
  let num = parseInt(hex.slice(1), 16);
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;

  r = Math.min(255, Math.floor(r + (255 - r) * percent));
  g = Math.min(255, Math.floor(g + (255 - g) * percent));
  b = Math.min(255, Math.floor(b + (255 - b) * percent));

  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}


const pearlsButton = document.getElementById('stop-pearls');
let pearlsAreVisible = true;

pearlsButton.addEventListener('click', function () {
  const pearls = document.querySelectorAll('.pearl');

  if (pearlsAreVisible) {
    pearls.forEach(function (pearl) {
      pearl.style.animationPlayState = 'paused';
      pearl.classList.add('hidden');
    });
    pearlsButton.textContent = 'start boba pearls :)';
    pearlsAreVisible = false;
  } else {
    pearls.forEach(function (pearl) {
      pearl.classList.remove('hidden');
      pearl.style.animationPlayState = 'running';
    });
    pearlsButton.textContent = 'stop boba pearls :(';
    pearlsAreVisible = true;
  }
});

const rainButton = document.getElementById('rain');

const toppingsImage = document.getElementById('toppingsTitle');

rainButton.addEventListener('click', () => {
  const sprinkleCount = 15;

  for (let i = 0; i < sprinkleCount; i++) {
    const sprinkle = document.createElement('div');
    sprinkle.classList.add('sprinkle');

    const randomLeft = 35 + Math.random() * (30);
    sprinkle.style.left = randomLeft + 'vw';    sprinkle.style.backgroundColor = getRandomColor();

    const randomRotation = Math.floor(Math.random() * 181) - 90;
    sprinkle.style.setProperty('--initial-rotation', `${randomRotation}deg`);


    const fallDuration = 2 + Math.random() ;
    sprinkle.style.animationDuration = fallDuration + 's';
    document.body.appendChild(sprinkle);

    const checkInterval = setInterval(() => {
      const sprinkleRect = sprinkle.getBoundingClientRect();
      const imageRect = toppingsImage.getBoundingClientRect();

      if (sprinkleRect.bottom >= imageRect.top+10) {
        sprinkle.remove();
        toppingsImage.src = 'sprinkles-title.png';
        clearInterval(checkInterval);
      }
    }, 16);

    setTimeout(() => {
      sprinkle.remove();
      clearInterval(checkInterval);
    }, fallDuration * 1000);
  }
});

function getRandomColor() {
  const pastelColors = ['#ff9aa2', '#C67FBE', '#793C61', '#f6c1c7', '#e38a95', '#ff80c1'];
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
}

