
document.addEventListener("DOMContentLoaded", function() {
  // Insert sidebar HTML into the container
  document.getElementById("sidebar-container").innerHTML = sidebar();

  // API call to fetch product data
  let productData;
  getData();

  // Sort and filter functionality
  document.getElementById("nameSort").addEventListener("change", sortNames);
  document.getElementById("priceSort").addEventListener("change", sortPrice);
  document.getElementById("brandFilter").addEventListener("change", filterBrand);

  async function getData() {
      const res = await fetch("https://mock-server-app-ixch.onrender.com/mendata");
      productData = await res.json();
      displayPage(productData);
  }

  function displayPage(data) {
      let parent = document.getElementById("naz-product-container");
      parent.innerHTML = "";
      data.forEach((elem) => {
          let product = document.createElement("div");
          product.setAttribute("class", "naz-product");

          let poster = document.createElement("img");
          poster.setAttribute("class", "naz-product-img");
          poster.setAttribute("src", elem.imageURL);

          let brand = document.createElement("p");
          brand.setAttribute("class", "naz-product-brand");
          brand.innerHTML = elem.brand;

          // Create a link for the product title
          let titleLink = document.createElement("a");
          titleLink.setAttribute("href", `clickedproduct.html?id=${elem.id}`);
          titleLink.setAttribute("class", "naz-product-title");
          titleLink.innerHTML = elem.product;

          // Append the title link instead of the paragraph
          let title = document.createElement("p");
          title.appendChild(titleLink);

          let price_container = document.createElement("div");
          price_container.setAttribute("class", "naz-price-container");

          let price = document.createElement("p");
          price.setAttribute("class", "naz-price");
          price.innerHTML = `₹${elem.price}`;

          let strikedPrice = document.createElement("p");
          strikedPrice.setAttribute("class", "naz-striked-price");
          strikedPrice.innerHTML = `₹${elem.strikedOffPrice}`;

          let offer = document.createElement("p");
          offer.setAttribute("class", "naz-offer");
          let offerValue = Math.floor(
              ((elem.strikedOffPrice - elem.price) / elem.strikedOffPrice) * 100
          );
          offer.innerHTML = `(${offerValue}% off)`;

          price_container.append(price, strikedPrice, offer);
          product.append(poster, brand, title, price_container);

          parent.append(product);

          // Attach click event listener to the entire product div
          product.addEventListener("click", function() {
              // Navigate to the single product page
              window.location.href = `clickedproduct.html?id=${elem.id}`;
          });
      });
  }

  function sortNames() {
      var selected = document.getElementById("nameSort").value;
      if (selected == "asc") {
          productData.sort(function(a, b) {
              return a.brand.localeCompare(b.brand);
          });
      } else {
          productData.sort(function(a, b) {
              return b.brand.localeCompare(a.brand);
          });
      }
      displayPage(productData);
  }

  function sortPrice() {
      var selected = document.getElementById("priceSort").value;
      if (selected == "lth") {
          productData.sort(function(a, b) {
              return a.price - b.price;
          });
      } else {
          productData.sort(function(a, b) {
              return b.price - a.price;
          });
      }
      displayPage(productData);
  }

  function filterBrand() {
      var selected = document.getElementById("brandFilter").value;
      if (selected === "all") {
          displayPage(productData);
      } else {
          var newArray = productData.filter(function(element) {
              return element.brand === selected;
          });
          displayPage(newArray);
      }
  }

  function sidebar() {
      return `
          <div id="wrapper">
              <div id="filter">
                  <div class="a">
                      <h3>FILTERS </h3>
                      <div>
                          <input type="radio" id="menFilter" name="group">
                          <label for="menFilter">Men</label><br>
                          <input type="radio" id="womenFilter" name="group">
                          <label for="womenFilter">Women</label><br>
                          <input type="radio" id="kidsFilter" name="group">
                          <label for="kidsFilter">Boys</label><br>
                          <input type="radio" id="girlsFilter" name="group">
                          <label for="girlsFilter">Girls</label>
                      </div>
                  </div>
                  <div class="b">
                      <h3>CATEGORIES</h3>
                      <div>
                          <input type="checkbox" id="tshirtFilter" name="group">
                          <label for="tshirtFilter">Tshirts</label><br>
                          <input type="checkbox" id="shirtFilter" name="group">
                          <label for="shirtFilter">Shirts</label><br>
                          <input type="checkbox" id="jacketFilter" name="group">
                          <label for="jacketFilter">Jackets</label><br>
                          <input type="checkbox" id="trouserFilter" name="group">
                          <label for="trouserFilter">Trousers</label><br>
                          <input type="checkbox" id="shortsFilter" name="group">
                          <label for="shortsFilter">Shorts</label><br>
                          <input type="checkbox" id="topsFilter" name="group">
                          <label for="topsFilter">Tops</label><br>
                          <input type="checkbox" id="kurtasFilter" name="group">
                          <label for="kurtasFilter">Kurtas</label><br>
                          <input type="checkbox" id="sareeFilter" name="group">
                          <label for="sareeFilter">Saree</label><br>
                      </div>
                  </div>
                  <div class="b">
                      <h3>BRAND</h3>
                      <div>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">U.S. Polo Assn.</label><br>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">Roadster</label><br>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">KLOTTHE</label><br>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">Mast & Harbour</label><br>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">Puma</label><br>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">WROGN</label><br>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">HRX by Hrithik Roshan</label><br>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">Flying Machine</label>
                      </div>
                  </div>
                  <div class="b">
                      <h3>PRICE</h3>
                      <div>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">Rs 499 to Rs 1349</label><br>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">Rs. 1349 to Rs. 2199</label><br>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">Rs. 2199 to Rs. 3049</label><br>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">Rs. 3049 to Rs. 3899</label><br>
                          <input type="checkbox" id="cb" name="group">
                          <label for="cb">Rs. 3899 to Rs. 4749</label>
                      </div>
                  </div>
                  <div class="b">
                      <h3>DISCOUNT RANGE</h3>
                      <div>
                          <input type="radio" id="rb" name="discount">
                          <label for="rb">10% and above</label><br>
                          <input type="radio" id="rb" name="discount">
                          <label for="rb">20% and above</label><br>
                          <input type="radio" id="rb" name="discount">
                          <label for="rb">30% and above</label><br>
                          <input type="radio" id="rb" name="discount">
                          <label for="rb">40% and above</label><br>
                          <input type="radio" id="rb" name="discount">
                          <label for="rb">50% and above</label><br>
                          <input type="radio" id="rb" name="discount">
                          <label for="rb">60% and above</label><br>
                          <input type="radio" id="rb" name="discount">
                          <label for="rb">70% and above</label><br>
                          <input type="radio" id="rb" name="discount">
                          <label for="rb">80% and above</label><br>
                          <input type="radio" id="rb" name="discount">
                          <label for="rb">90% and above</label><br>
                      </div>
                  </div>
              </div>
          </div>
      `;
  }
});
