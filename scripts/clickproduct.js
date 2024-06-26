document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
    fetch(`https://mock-server-app-ixch.onrender.com/mendata/${productId}`)
      .then(response => response.json())
      .then(product => displayProduct(product))
      .catch(error => console.error('Error fetching product data:', error));
  } else {
    console.error('No product ID found in the URL');
  }

  function displayProduct(product) {
    const parent = document.getElementById("naz-product-detail");
    parent.innerHTML = "";

    const productDetail = document.createElement("div");
    productDetail.setAttribute("class", "naz-product-detail");

    const poster = document.createElement("img");
    poster.setAttribute("class", "naz-product-img");
    poster.setAttribute("src", product.imageURL);

    const brand = document.createElement("p");
    brand.setAttribute("class", "naz-product-brand");
    brand.innerHTML = `Brand: ${product.brand}`;

    const title = document.createElement("p");
    title.setAttribute("class", "naz-product-title");
    title.innerHTML = `Product: ${product.product}`;

    const priceContainer = document.createElement("div");
    priceContainer.setAttribute("class", "naz-price-container");

    const price = document.createElement("p");
    price.setAttribute("class", "naz-price");
    price.innerHTML = `Price: ₹${product.price}`;

    const strikedPrice = document.createElement("p");
    strikedPrice.setAttribute("class", "naz-striked-price");
    strikedPrice.innerHTML = `₹${product.strikedOffPrice}`;

    const offer = document.createElement("p");
    offer.setAttribute("class", "naz-offer");
    const offerValue = Math.floor(((product.strikedOffPrice - product.price) / product.strikedOffPrice) * 100);
    offer.innerHTML = `(${offerValue}% off)`;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class", "naz-buttons");

    const addToCartButton = document.createElement("button");
    addToCartButton.setAttribute("class", "naz-button cart");
    addToCartButton.innerText = "Add to Cart";
    addToCartButton.onclick = () => addToCart(product.id);

    const ac = document.createElement("a");
    ac.setAttribute("href", `cart.html?id=${product.id}`);

    const goToCartButton = document.createElement("button");
    goToCartButton.setAttribute("class", "naz-button favorite");
    goToCartButton.innerText = "Go To Cart";
    ac.append(goToCartButton);

    buttonsContainer.append(addToCartButton, ac);

    priceContainer.append(price, strikedPrice, offer);
    productDetail.append(poster, brand, title, priceContainer, buttonsContainer);

    parent.append(productDetail);
  }

  function addToCart(productId) {
    fetch(`https://mock-server-app-ixch.onrender.com/mendata/${productId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(product => {
        fetch("https://mock-server-app-ixch.onrender.com/cart", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('Failed to add product to cart');
            }
            return res.json();
          })
          .then(res => {
            console.log('Product added to cart:', res);
            // Show SweetAlert on success
            Swal.fire({
              icon: 'success',
              title: 'Added to Cart!',
              text: `${product.product} has been added to your cart.`,
              confirmButtonText: 'OK'
            });
          })
          .catch(err => {
            console.error('Error adding product to cart:', err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to add product to cart. Please try again later.',
              confirmButtonText: 'OK'
            });
          });
      })
      .catch(err => {
        console.error('Error fetching product data:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch product data. Please try again later.',
          confirmButtonText: 'OK'
        });
      });
  }


  function addToFavorite(productId) {
    console.log(`Product ${productId} added to favorite`);

  }
});













