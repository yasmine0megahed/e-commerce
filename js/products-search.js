import { cartNumber } from "./nav.js";
search1()
function search1() {
  const prodCont = document.querySelector(".prodContainer");
  const searchParams = new URLSearchParams(window.location.search);
  let category = searchParams.get('category'); // price_descending
  let searchButton = document.getElementById("search-logo");

  let searchValue1 = localStorage.getItem("value-1");
  console.log(searchValue1);


  if (searchValue1.length > 0) {
    fetch(`https://dummyjson.com/products/search?q=${searchValue1}`)
      .then((res) => res.json())
      .then((products) => {
        let allItems = products.products;
        console.log(allItems)
        length = Object.keys(allItems).length
        //----------------------------------------------------------------------
        //start of if to display product
        if (length > 0) {
          // import { cartNumber } from "./nav.js";
          document.title = `Search:${searchValue1}`;
          prodCont.innerHTML = ""//remove items

          //-----------------------------------------------------------------------------------------------
          //start of foreach 
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


            priceDiv.classList.add('priceDiv')
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
          //end of foreach
          //---------------------------------------------------------------------------------------------
          //start of content out foreach but in  if to display product
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
           };
           //end of content out foreach but in  if to display product
          // end of if to display product
          // ---------------------------------------------------------------------
        }else {
          alert("no matched value")
        }
      }); //end of second .then

    // ---------------------------------------------------------------------------------
  }else {
    alert("please, type product name..")
  }
}

let searchButton = document.getElementById("search-logo");
searchButton.onclick = function searchData() {
  let searchValue = document.getElementById("search-text").value.toLowerCase()
  if (searchValue.length > 0) {
    fetch(`https://dummyjson.com/products/search?q=${searchValue}`)
      .then((res) => res.json())
      .then((searchItem) => {
        let allItems = searchItem.products;
        length = Object.keys(allItems).length
        if (length > 0) {
          window.localStorage.setItem("value-1", searchValue)
          search1()
        }
        else {
          alert("no matched value")
        }
      }
      )
  }
  else {
    alert("please, type product name..")
  }
}