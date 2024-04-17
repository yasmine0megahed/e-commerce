// const cartNum = document.getElementById("cart-number");
// export function cartNumber(cartNum) {
//   if (localStorage.getItem("cartItems")) {
//     // console.log(localStorage.getItem("cartItems") );

//     cartNum.innerText = JSON.parse(localStorage.getItem("cartItems")).length;
//   } else {
//     cartNum.innerText = 0;
//   }
// }

// product.js

export function cartNumber() {
  const cartNumElement = document.getElementById("cart-number");
  if (localStorage.getItem("cartItems")) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const cartLength = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    cartNumElement.innerText = cartLength;
  } else {
    cartNumElement.innerText = 0;
  }
}

// import { cartNumber } from "./nav.js";

addEventListener("DOMContentLoaded", (event) => {
  cartNumber();
});
