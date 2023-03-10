//! Variables
const proName = document.querySelector("#name");
const price = document.querySelector("#price");
const category = document.querySelector("#cat");
const description = document.querySelector("#desc");
const searchField = document.querySelector("input[type='search']");
const addBtn = document.querySelector("#addBtn");
const tbody = document.querySelector("tbody");
const form = document.querySelector("form");
let updateBtnClicked = false;
let products = [];

//! Functions
const addProducts = () => {
  if (proName.value && price.value && category.value && description.value) {
    const product = {
      id: Math.floor(Math.random() * 999999999999999) + 1,
      proName: proName.value,
      price: price.value,
      category: category.value,
      description: description.value,
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();
    clearInputs();
  } else if (proName.value.length === 0) proName.focus();
  else if (price.value.length === 0) price.focus();
  else if (category.value.length === 0) category.focus();
  else if (description.value.length === 0) description.focus();
};

const deleteProduct = (id) => {
  if (searchField.value.length == 0) {
    if (products.length == 1) products = [];
    products = products.filter((product) => product.id != id);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
  } else {
    products = JSON.parse(localStorage.products);
    products = products.filter((product) => product.id != id);
    localStorage.setItem("products", JSON.stringify(products));
    //TODO To Trigger the event on the search field we dispatched this event
    searchField.dispatchEvent(new Event("keyup", { bubbles: true }));
    displayProducts();
  }
};

const updateProduct = (id) => {
  updateBtnClicked = false;
  if (!updateBtnClicked) {
    displayProducts();
    const updateBtn = document.querySelector(`#updateBtn${id}`);
    const saveBtn = document.querySelector(`#saveBtn${id}`);
    const proNameUpdate = document.querySelector(`#nameUpdate${id}`);
    const priceUpdate = document.querySelector(`#priceUpdate${id}`);
    const categoryUpdate = document.querySelector(`#catUpdate${id}`);
    const descUpdate = document.querySelector(`#descUpdate${id}`);

    const proNameProduct = document.querySelector(`#nameProduct${id}`);
    const priceProduct = document.querySelector(`#priceProduct${id}`);
    const categoryProduct = document.querySelector(`#catProduct${id}`);
    const descProduct = document.querySelector(`#descProduct${id}`);

    proNameUpdate.style.cssText =
      priceUpdate.style.cssText =
      categoryUpdate.style.cssText =
      descUpdate.style.cssText =
        "display: block !important";
    proNameProduct.style.display =
      priceProduct.style.display =
      categoryProduct.style.display =
      descProduct.style.display =
        "none";

    updateBtn.style.display = "none";
    saveBtn.style.cssText = "display: block !important";
    updateBtnClicked = true;
  }
};

const saveProduct = (id) => {
  updateBtnClicked = true;
  let proIndex;
  const proNameUpdate = document.querySelector(`#nameUpdate${id}`);
  const priceUpdate = document.querySelector(`#priceUpdate${id}`);
  const categoryUpdate = document.querySelector(`#catUpdate${id}`);
  const descUpdate = document.querySelector(`#descUpdate${id}`);
  let product = products.find((product, index) => {
    proIndex = index;
    return product.id === id;
  });
  product = {
    id: id,
    proName: proNameUpdate.value,
    price: priceUpdate.value,
    category: categoryUpdate.value,
    description: descUpdate.value,
  };
  products[proIndex] = product;
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
};

const searchProducts = () => {
  if (searchField.value.length > 0) {
    products = JSON.parse(localStorage.getItem("products"));
    products = products.filter(
      (product) => product.proName == +searchField.value
    );
    displayProducts();
  } else {
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts();
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
};

const clearInputs = () => {
  proName.value = price.value = category.value = description.value = "";
};

const displayProducts = () => {
  tbody.innerHTML = "";

  products.forEach((product) => {
    tbody.innerHTML += ` <tr>
    <td scope="row">
      <p id="nameProduct${product.id}">${product.proName}</p>
      <input
        type="text"
        class="form-control d-none"
        id="nameUpdate${product.id}"
        
      />
    </td>
    <td>
      <p id="priceProduct${product.id}">${product.price}</p>
      <input
        type="text"
        class="form-control d-none"
        id="priceUpdate${product.id}"
        
      />
    </td>
    <td>
      <p id="catProduct${product.id}">${product.category}</p>
      <input type="text" class="form-control d-none" id="catUpdate${product.id}" />
    </td>
    <td>
      <p id="descProduct${product.id}">${product.description}</p>
      <input
        type="text"
        class="form-control d-none"
        id="descUpdate${product.id}"
        
      />
    </td>
    <td><button type="button" class="btn btn-outline-danger" onclick="deleteProduct(${product.id})">Delete</button></td>
    <td>
      <button type="button" class="btn btn-outline-warning" id="updateBtn${product.id}" onclick="updateProduct(${product.id})">
        Update
      </button>
      <button
        type="button"
        class="btn btn-outline-success px-3 d-none"
        id="saveBtn${product.id}"
        onclick="saveProduct(${product.id})"
      >
        Save
      </button>
    </td>
  </tr>
`;
  });
};

//! Event Listeners
addBtn.addEventListener("click", addProducts);
form.addEventListener("submit", handleSubmit);
searchField.addEventListener("keyup", searchProducts);

//! Local Storage
window.onload = () => {
  if (localStorage.products) {
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts();
  }

  localStorage.setItem("products", JSON.stringify(products));
};
