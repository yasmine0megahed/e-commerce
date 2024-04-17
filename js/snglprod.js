import { cartNumber } from "./nav.js";
const prodCard = document.getElementsByClassName("prodCard")[0];
const searchParams = new URLSearchParams(window.location.search);
let prodID = searchParams.get("id"); // price_descending


document.addEventListener("DOMContentLoaded", async function () {

fetch(`https://dummyjson.com/products/${prodID}`)
  .then((res) => res.json())
  .then((product) => {
    document.title = product.title;
    //Product Images
    let images = product.images;
    let prodImage = document.createElement("div");
    prodImage.classList.add("prodImage");
    prodCard.appendChild(prodImage);
    // return product , prodImage;
    let i = 0;
    setInterval(() => {
      prodImage.style.backgroundImage = `url(${images[i]})`;
      i++;
      if (i === images.length) {
        i = 0;
      }
    }, 3000);

    prodImage.classList.add("prodImage");
    prodCard.appendChild(prodImage);

    //Product Name
    let prodTitle = document.createElement("h2");
    prodTitle.innerText = product.title;
    prodTitle.classList.add("prodTitle");
    prodCard.appendChild(prodTitle);

    //Product brand
    let prodBrand = document.createElement("p");
    prodBrand.innerHTML = `<span>Brand Name :  </span>${product.brand}`;
    prodBrand.classList.add("prodBrand");
    prodCard.appendChild(prodBrand);

    //Product description
    let prodDesc = document.createElement("p");
    prodDesc.innerText = product.description;
    prodDesc.classList.add("prodDesc");
    prodCard.appendChild(prodDesc);

    //Product price
    let prodPrice = document.createElement("p");
    prodPrice.innerText = product.price + "$";
    // prodPrice.classList.add("prodPrice");

    //Product Discount
    let prodDscnt = document.createElement("p");
    let discount = Math.ceil(
      product.price - product.price * (product.discountPercentage / 100)
    );
    prodDscnt.innerText = discount + "$";

    let prodSale = document.createElement("p");
    prodSale.innerText = Math.ceil(product.discountPercentage) + "%";

    let priceDiv = document.createElement("div");
    priceDiv.appendChild(prodPrice);
    priceDiv.appendChild(prodDscnt);
    prodCard.appendChild(priceDiv);

    priceDiv.classList.add("priceDiv");

    if (product.discountPercentage >= 10) {
      prodDscnt.classList.add("prodDscnt");
      prodPrice.classList.add("prodPrice");
      prodSale = document.createElement("p");
      prodSale.innerHTML = `<p>${Math.ceil(
        product.discountPercentage
      )}%<br>OFF</p>`;
      prodSale.classList.add("prodSale");
      priceDiv.appendChild(prodSale);
    } else {
      prodPrice.style.fontSize = "2rem";
      prodPrice.classList.add("prodDscnt");
      prodDscnt.style.display = "none";
    }

    //// Product rating start
    let rate = (product.rating / 5) * 100;

    //&#9733;
    const fullStar = `
        <div class="fullStar" style="width:${rate}%">
        <span>★★★★★</span>
        </div>
        `;
    const emptyStar = `
        <div class="emptyStar">
        <span>★★★★★</span>
        </div>
     
        `;
    let prodRating = document.createElement("div");
    prodRating.innerHTML = emptyStar + fullStar;
    prodRating.classList.add("prodRating");
    prodRating.classList.add("star-ratings");

    //Product rating number
    const rateNum = document.createElement("p");
    rateNum.innerText = product.rating;
    rateNum.classList.add("rateNum");

    //Product rating div
    const ratingDiv = document.createElement("div");
    ratingDiv.appendChild(prodRating);
    ratingDiv.appendChild(rateNum);
    prodCard.appendChild(ratingDiv);
    ratingDiv.classList.add("ratingDiv");

    //Add to cart button
    let add2Cart = document.createElement("button");
    add2Cart.value = 1;
    add2Cart.innerText = "Add To Cart";
    add2Cart.classList.add("add2Cart");
    add2Cart.setAttribute("id", product.id);
    prodCard.appendChild(add2Cart);

    add2Cart.addEventListener("click", (event) => {
      const itemId = event.target.id;
      let cart = [];

      if (localStorage.getItem("cartItems")) {
        cart = JSON.parse(localStorage.getItem("cartItems"));
      }

      let itemIndex = cart.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        // If item already exists in cart, increase its quantity
        cart[itemIndex].quantity += 1;
      } else {
        // If item does not exist in cart, add it with quantity 1
        cart.push({ id: itemId, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(cart));
      cartNumber();
    });
  });

//Toggle categories section visibility

const menu = document.getElementsByClassName("fa-solid")[0];
const categories = document.getElementById("all-cat-container");
menu.addEventListener("click", () => {
  if (categories.style.display == "none") {
    console.log("none");
    categories.style.display = "flex";
  } else {
    categories.style.display = "none";
    console.log("flex");
  }
});

})