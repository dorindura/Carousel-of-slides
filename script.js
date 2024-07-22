var swiper = new Swiper(".slide-content", {
  slidesPerView: 2,
  spaceBetween: 25,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 1,
    },
    950: {
      slidesPerView: 1,
    },
    1300: {
      slidesPerView: 2,
    },
  },
});

// Logica pentru a adauga datele din fisierul products.json

let http = new XMLHttpRequest();

http.open("get", "/products.json", true);

http.send();

// Logica pentru favourite button & add to cart button

let favouriteBtnValue = false;

function toggleBtnValue(event) {

  favouriteBtnValue = !favouriteBtnValue;

  event.target.src = favouriteBtnValue ? "/images/favourite.png" : "/images/not-favourite.png";
}

function prodInCart() {
  console.log("Produsul a fost adaugat in cosul de cumparaturi!");
}

// 

http.onload = function () {

  if (this.readyState == 4 && this.status == 200) {
    let products = JSON.parse(this.responseText);

    let output = "";

    for (let item of products) {
      output += `
          <div class="card swiper-slide">
            <div class="card-content">
              <div
                class="card-image flex-row background-color space-between card-styles box-shadow flex-media-queries"
              >
                <img
                  class="image-class"
                  src=${item.image}
                  alt=${item.name}
                />
                <div class="flex-class flex-col right-side-card">
                  <div class="product-name" >${item.name}</div>
                  <hr class="hr-class" />
                  <div class="gap-between-prices">
                    <div class="initial-price"><s>$ ${item.price}</s></div>
                    <div class="final-price">$ ${item.finalPrice}</div>
                  </div>
                  <div class="div-btn-class">
                    <button class="addToCart-btn">${item.btnValue}</button>
                    <button class="favourite-btn">
                      <img src="${favouriteBtnValue ? "/images/favourite.png" : "/images/not-favourite.png"}" alt="${favouriteBtnValue ? item.favouriteBtn : item.unFavouriteBtn}"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `;
    }
    document.querySelector(".class-for-javascript").innerHTML = output;

    const favouriteButtons = document.querySelectorAll(".favourite-btn img");
    favouriteButtons.forEach(button => {
      button.addEventListener('click', toggleBtnValue);
    });

    const addToCartButtons = document.querySelectorAll(".addToCart-btn");
    addToCartButtons.forEach(button => {
      button.addEventListener('click', prodInCart);
    });
  }
};
