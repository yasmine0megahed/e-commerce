let searchButton = document.getElementById("search-logo1");
searchButton.onclick = function searchData() {
  let searchValue = document.getElementById("search-text").value.toLowerCase()
  if (searchValue.length > 0) {
    fetch(`https://dummyjson.com/products/search?q=${searchValue}`)
      .then((res) => res.json())
      .then((searchItem) => {
        let allItems = searchItem.products;
        length = Object.keys(allItems).length
        if(length>0){
          window.localStorage.setItem("value-1",searchValue)
          window.location.href = "product-1.html";
        }
        else{
          alert("no matched value")
        }
      }
      )
  }
  else{
    alert("please, type product name..")
  }
}



