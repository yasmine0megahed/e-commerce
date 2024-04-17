let divparent = document.getElementById("all-cat-container-nav")||document.getElementById("all-cat-container");
let allcat1 = fetch("https://dummyjson.com/products/categories")
  .then((res) => res.json())
  .then((outputjson) => {
    length = Object.keys(outputjson).length;
    for (let i = 0; i < length; i++) {
      let div = `<div id=nv${i} class="nv"><a href="products.html?category=${outputjson[i]}">${outputjson[i]}</a></div>`;
      divparent.innerHTML += div;
    }
  });
