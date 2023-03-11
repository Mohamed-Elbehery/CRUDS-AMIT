//! Variables
const inputs = document.querySelectorAll("input");
const proName = document.querySelector("#name");
const price = document.querySelector("#price");
const category = document.querySelector("#cat");
const description = document.querySelector("#desc");
const searchField = document.querySelector("input[type='search']");
const addBtn = document.querySelector("#addBtn");
const table = document.querySelector("table");
const tbody = document.querySelector("tbody");
const form = document.querySelector("form");
const deleteAllBtn = document.querySelector("#deleteAllBtn");
const error = document.querySelector("#form-error");
const success = document.querySelector("#success");
const darkIcon = document.querySelector(".fa-solid.fa-moon");
const lightIcon = document.querySelector(".fa-solid.fa-sun");
const arrowUp = document.querySelector(".fa-solid.fa-arrow-up");
let updateBtnClicked = false;
let products = [];

//! Functions
//* Will be Triggered after clicking on the Add Product button
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
    success.classList.add("animate-success");
    proName.focus();

    setTimeout(() => {
      success.classList.remove("animate-success");
    }, 3000);
    displayProducts();
    clearInputs();
    inputs.forEach((input) => {
      input.style.boxShadow = "none";
    });
  } else if (proName.value.length === 0) {
    proName.focus();
    error.innerHTML = "Please enter a product Name";
    errorAnimation();
  } else if (price.value.length === 0) {
    price.focus();
    error.innerHTML = "Please enter a product Price";
    errorAnimation();
  } else if (category.value.length === 0) {
    category.focus();
    error.innerHTML = "Please enter a product Category";
    errorAnimation();
  } else if (description.value.length === 0) {
    description.focus();
    error.innerHTML = "Please enter a product Description";
    errorAnimation();
  }
};

//* Will be Triggered after clicking on the delete button
const deleteProduct = (id) => {
  if (searchField.value.length == 0) {
    if (products.length == 1) products = [];
    products = products.filter((product) => product.id != id);
    localStorage.setItem("products", JSON.stringify(products));
    deleteAllBtn.style.display = "none";
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

//* Will be Triggered after clicking on the update button
const updateProduct = (id) => {
  updateBtnClicked = false;
  addBtn.type = "button";
  if (!updateBtnClicked) {
    displayProducts();
    const updateBtn = document.querySelector(`#updateBtn${id}`);
    const saveBtn = document.querySelector(`#saveBtn${id}`);
    const cancelBtn = document.querySelector(`#cancelBtn${id}`);
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
    cancelBtn.style.cssText = "display: block !important";
    updateBtnClicked = true;
    proNameUpdate.focus();
  }
};

//* Will save the new updates for the product
const saveProduct = (id) => {
  updateBtnClicked = true;
  let proIndex;
  //TODO to get the product and the index of the product in the products array
  let product = products.find((product, index) => {
    proIndex = index;
    return product.id === id;
  });
  const proNameUpdate = document.querySelector(`#nameUpdate${id}`);
  const priceUpdate = document.querySelector(`#priceUpdate${id}`);
  const categoryUpdate = document.querySelector(`#catUpdate${id}`);
  const descUpdate = document.querySelector(`#descUpdate${id}`);
  if (
    proNameUpdate.value &&
    priceUpdate.value &&
    categoryUpdate.value &&
    descUpdate.value
  ) {
    addBtn.type = "submit";
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
  } else if (proNameUpdate.value.length === 0) proNameUpdate.focus();
  else if (priceUpdate.value.length === 0) priceUpdate.focus();
  else if (categoryUpdate.value.length === 0) categoryUpdate.focus();
  else if (descUpdate.value.length === 0) descUpdate.focus();
};

//* Will cancel the update function
const cancelUpdate = () => {
  displayProducts();
};

//* Will be Triggered on each keyup event on the search field
const searchProducts = () => {
  if (searchField.value.length > 0) {
    products = JSON.parse(localStorage.getItem("products"));
    products = products.filter((product) =>
      product.proName.toLowerCase().startsWith(searchField.value.toLowerCase())
    );
    displayProducts();
  } else {
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts();
  }
};

//* Will be Triggered after adding at least 2 products
const deleteAllProducts = () => {
  const confirmation = prompt(
    'Please Enter "yes" to Confirm that you want to delete all products.'
  );
  if (confirmation.toLowerCase() === "yes") {
    products = [];
    localStorage.setItem("products", JSON.stringify(products));
    deleteAllBtn.style.display = "none";
    displayProducts();
  }
};

//* to Prevent the page from refreshing
const handleSubmit = (e) => {
  e.preventDefault();
};

//* Will clear the inputs after adding a new product
const clearInputs = () => {
  proName.value = price.value = category.value = description.value = "";
};

//* Will be Triggered after adding, deleting or updating a product
const displayProducts = () => {
  if (products.length > 1) {
    deleteAllBtn.style.cssText = "display: block !important;";
  }
  tbody.innerHTML = "";

  products.forEach((product) => {
    tbody.innerHTML += `
  <tr>
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
        type="submit"
        class="btn btn-outline-success px-3 d-none"
        id="saveBtn${product.id}"
        onclick="saveProduct(${product.id})"
      >
        Save
      </button>
    </td>
    <td><button type="button" class="btn btn-outline-warning d-none" id="cancelBtn${product.id}" onclick="cancelUpdate()">Cancel</button></td>
  </tr>
`;
  });
};

//* Will be Triggered if there is an empty input field
const errorAnimation = () => {
  error.classList.add("animate");
  setTimeout(() => {
    error.classList.remove("animate");
  }, 900);
};

//* Will be Triggered if the user presses any key on the search field
const validation = () => {
  error.innerHTML = "";
};

//* Will be Triggered if the user clicks on any theme icon or reloading the page
const changeTheme = () => {
  if (localStorage.theme == "dark") {
    table.classList.add("text-white");
    inputs.forEach((input) => {
      input.classList =
        "form-control mb-3 bg-secondary text-white border-secondary";
    });
    document.body.style.cssText = "background-color: #3b3b3b; color: white;";
    darkIcon.style.display = "none";
    lightIcon.style.display = "block";
  } else {
    table.classList.remove("text-white");
    inputs.forEach((input) => {
      input.classList = "form-control mb-3";
    });
    lightIcon.style.display = "none";
    darkIcon.style.display = "block";
    document.body.style.cssText = "";
  }
};

//* Will be Triggered if the user clicks on the moon icon
const changeToDark = () => {
  localStorage.setItem("theme", "dark");
  changeTheme();
};

//* Will be Triggered if the user clicks on the sun icon
const changeToLight = () => {
  localStorage.setItem("theme", "light");
  changeTheme();
};

//* Will be Triggered if the user pageYOffset >= 600
const toggleArrow = () => {
  if (window.pageYOffset >= 600) {
    arrowUp.style.cssText = "opacity: 1; pointer-events: all;";
  } else {
    arrowUp.style.cssText = "opacity: 0; pointer-events: none;";
  }
};

//* Will be Triggered if the user clicks on the Arrow Up icon at the bottom right corner of the page
const scrollUp = () => {
  window.scroll(0, 0);
};

//* Will be Triggered if the user stops focusing on the input fields
const validInputs = (input) => {
  if (input.value.length > 0) {
    input.style.boxShadow = "0 0 5px 0.1rem rgb(27, 230, 27)";
  } else {
    input.style.boxShadow = "none";
  }
};

//! Event Listeners
addBtn.addEventListener("click", addProducts);
form.addEventListener("submit", handleSubmit);
searchField.addEventListener("keyup", searchProducts);
deleteAllBtn.addEventListener("click", deleteAllProducts);
darkIcon.addEventListener("click", changeToDark);
lightIcon.addEventListener("click", changeToLight);
window.addEventListener("scroll", toggleArrow);
arrowUp.addEventListener("click", scrollUp);

//! Local Storage
window.onload = () => {
  if (localStorage.products) {
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts();
  }

  if (localStorage.theme) {
    changeTheme();
  } else {
    localStorage.setItem("theme", "light");
    changeTheme();
  }

  localStorage.setItem("products", JSON.stringify(products));
};
