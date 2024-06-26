let arr = [];


async function view() {
  let data = await fetch(`https://mock-server-app-ixch.onrender.com/cart`);
  arr = await data.json();
  renderCart();
}


function renderCart() {
  let total = 0;
  let disscount = 0;
  let maintotal = 0;
  let itemCount = arr.length;


  document.getElementById("itemCount").innerText = itemCount;

  document.getElementById("data").innerHTML = arr
    .map((el, index) => {
      total += +el.price;

      let dis = Math.floor(
        ((el.strikedOffPrice - el.price) / el.strikedOffPrice) * 100
      );

      return `<div class="main">
                <div class="imgbox">
                    <img src="${el.imageURL}" />
                </div>
                <div class="detailsbox">
                    <p style="font-size: 20px; margin-bottom: -8px;">${el.product}</p>
                    <p style="color: gray; margin:16px;">${el.brand}</p>
                    <p style="margin:16px">
                        <span class="price">Rs. ${el.price}</span>
                        <span class="striked-price">Rs. ${el.strikedOffPrice}</span>
                    </p>
                    <span class="offer">(${dis}% OFF)</span>
                </div>
                <div class="buttonbox">
                    <button data-id="${el.id}">REMOVE</button>
                </div>
              </div>`;
    })
    .join("");

  disscount = 0.1 * total;
  maintotal = total - disscount;

  document.getElementById("maintotal").innerText = "" + total;
  document.getElementById("dissco").innerText = "- " + Math.round(disscount);
  document.getElementById("total").innerText = "" + Math.round(maintotal);

  attachRemoveListeners();
}


function attachRemoveListeners() {
  const buttons = document.querySelectorAll(".buttonbox button");
  buttons.forEach(button => {
    button.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      await removeItem(id);
      await view();
    });
  });
}


async function removeItem(id) {
  await fetch(`https://mock-server-app-ixch.onrender.com/cart/${id}`, {
    method: 'DELETE',
  });
}


view();

setInterval(view, 30000); 
