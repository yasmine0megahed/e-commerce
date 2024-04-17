import { cartNumber } from "./nav.js";

const prodCont = document.querySelector(".prodContainer");
const searchParams = new URLSearchParams(window.location.search);
if (searchParams.get("category")) {
  var category = searchParams.get("category"); // price_descending
  document.title = category;
  var link = `https://dummyjson.com/products/category/${category}`;
} else {
  var link = `https://dummyjson.com/products`;
  document.title = "Our Products";
}

fetch(link)
  .then((res) => res.json())
  .then((products) => {
    products.products.forEach((element) => {
      //Product card
      let prodCard = document.createElement("div");
      prodCard.classList.add("prodCard");

      //Product image
      let prodImage = document.createElement("img");
      prodImage.src = element.thumbnail;
      prodImage.classList.add("prodImage");
      prodCard.appendChild(prodImage);

      //Product description
      let prodDesc = document.createElement("p");
      prodDesc.innerText = element.description;
      prodDesc.classList.add("prodDesc");
      prodCard.appendChild(prodDesc);

      //Product price
      let prodPrice = document.createElement("p");
      prodPrice.innerText = element.price + "$";

      //Product Discount
      let prodDscnt = document.createElement("p");
      let discount = Math.ceil(
        element.price - element.price * (element.discountPercentage / 100)
      );
      prodDscnt.innerText = discount + "$";

      //Price div
      let priceDiv = document.createElement("div");
      priceDiv.appendChild(prodPrice);
      priceDiv.appendChild(prodDscnt);
      prodCard.appendChild(priceDiv);

      priceDiv.classList.add("priceDiv");
      if (element.discountPercentage >= 10) {
        prodDscnt.classList.add("prodDscnt");
        prodPrice.classList.add("prodPrice");
      } else {
        prodPrice.style.fontSize = "2rem";
        prodPrice.classList.add("prodDscnt");
        prodDscnt.style.display = "none";
      }

      //Add to cart button
      let add2Cart = document.createElement("button");
      add2Cart.value = 1;
      add2Cart.innerText = "Add To Cart";
      add2Cart.classList.add("add2Cart");
      add2Cart.setAttribute("id", element.id);
      prodCard.appendChild(add2Cart);

      // Product details
      let prodDetails = document.createElement("a");
      prodDetails.innerText = "View product details";
      prodDetails.classList.add("prodDetails");
      prodDetails.href = `snglprod.html?id=${element.id}`;
      add2Cart.insertAdjacentElement("beforeBegin", prodDetails);

      prodCont.appendChild(prodCard);
    });

    //Add products to cart
    const cartButtons = document.getElementsByClassName("add2Cart");
    for (let i = 0; i < cartButtons.length; i++) {
      cartButtons[i].addEventListener("click", (event) => {
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
    }
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
