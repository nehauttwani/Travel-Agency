let header = `
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <div class="header-container">
          <a href="index.html">
            <img
              src="images/logo.png"
              alt="Travel Tales Logo"
              style="max-width: 100px; height: 10vh"
            />
          </a>
          <h2 class="d-inline-block header-h2">WELCOME TO TRAVEL TALES</h2>
        </div>
        
        <div id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="index.html"
                >HOME</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contact.html">CONTACT US</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="register.html">REGISTER</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

let footer = `<footer>
      <p>&copy; 2024 Travel Tales. All rights reserved.</p>
    </footer>`;

let bootstrapCDN = `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>`;

// Arrays for image sources, descriptions, and related URLs

const images = [
  "images/mountain.jpg",
  "images/beach.jpg",
  "images/skyline.jpg",
  "images/forest.jpg",
];

const descriptions = [
  "A breathtaking view of a mountain landscape during sunset, with vibrant orange and pink hues reflecting off the snow-capped peaks.",
  "A serene beach scene at dusk, featuring gentle waves lapping against the shore and a colorful sky filled with clouds.",
  "A bustling city skyline at night, illuminated by thousands of lights from skyscrapers, with a starry sky above.",
  "A peaceful forest path lined with tall trees, dappled sunlight filtering through the leaves, creating a tranquil atmosphere.",
];

const urls = [
  "https://www.banfflakelouise.com/experiences/vermilion-lakes",
  "https://www.calgary.ca/parks/sandy-beach.html",
  "https://www.calgary.ca/major-projects/experience-downtown.html?redirect=/exploredowntown",
  "https://www.alltrails.com/trail/canada/alberta/shannon-terrace-to-votier-flats",
];

// Displaying images in index page

function displayImages() {
  const gallery = document.getElementById("gallery");
  const fragment = document.createDocumentFragment();

  images.forEach((image, index) => {
    const card = createCard(image, index);
    fragment.appendChild(card);
  });
  gallery.appendChild(fragment);
}

function createCard(imageSrc, index) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="image-row card-front" id="card-front${index}">
      <img src="${imageSrc}" class="gallery_img" alt="Image ${index + 1}">
    </div>
    <div class="card-back" id="card-back${index}"></div>
  `;
// Add event listeners for mouseover, mouseout, and click
  card.addEventListener("mouseover", () => showImage(index));
  card.addEventListener("mouseout", () => hideImage(index));
  card.addEventListener("click", () => externalURL(index));

  return card;
}

// Image interaction functions

function showImage(index) {
  const front = document.getElementById(`card-front${index}`);
  const back = document.getElementById(`card-back${index}`);

  if (front && back) {
    back.style.display = "block";
    back.style.backgroundColor = "#00000061";
    back.style.border = "3px solid #5b5b39";
    back.style.borderRadius = "3px";
    back.innerHTML = descriptions[index];

    front.style.transition = "0.5s";
    front.style.filter = "blur(4px)";
  }
}

function hideImage(index) {
  const front = document.getElementById(`card-front${index}`);
  const back = document.getElementById(`card-back${index}`);

  if (front && back) {
    front.style.display = "block";
    front.style.filter = "none";
    front.style.transition = "0.5s";
    back.style.display = "none";
  }
}

function externalURL(index) {
  newwindow = window.open("", "_blank", "height=400,width=450");
  if (window.focus) {
    newwindow.document.body.innerHTML = `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    <p>You will be redirected to:</p>
    <a href="${urls[index]}" target="_blank">${urls[index]}</a>
    <p>in <span id="timer">5</span> seconds</p>
    <button id="cancelBtn">Cancel</button>
  </div>`;
    newwindow.focus();

    let timeLeft = 5;
    const timerId = setInterval(() => {
      timeLeft--;
      newwindow.document.getElementById("timer").textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timerId);
        newwindow.close();
        window.location.href = urls[index]
      }

      newwindow.document
        .getElementById("cancelBtn")
        .addEventListener("click", () => {
          clearInterval(timerId);
          newwindow.close();
        });
    }, 1000);
  }
}

// Confirmation functions for form actions

function confirmSubmit() {
  return confirm("Do you really want to submit?");
}

function confirmReset() {
  return confirm("Do you really want to reset?");
}

// Function to move the image
function moveImage() {
  const img = document.getElementById('movingImage');
  let x = 0;
  let y = 0;
  let dx = 2;
  let dy = 2;

  setInterval(() => {
      const maxX = window.innerWidth - img.width;
      const maxY = window.innerHeight - img.height;

      x += dx;
      y += dy;

      if (x <= 0 || x >= maxX) dx = -dx;
      if (y <= 0 || y >= maxY) dy = -dy;

      img.style.left = x + 'px';
      img.style.top = y + 'px';
  }, 20);
}

// Initialize page on load

onload = () => {
  document.getElementsByTagName("head")[0].innerHTML += bootstrapCDN;
  document.querySelector(".header").innerHTML = header;
  displayImages();
  moveImage();
  document.querySelector(".footer").innerHTML = footer;
};
