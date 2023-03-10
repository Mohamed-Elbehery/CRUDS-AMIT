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
const darkIcon = document.querySelector(".dark-icon");
const lightIcon = document.querySelector(".fa-solid.fa-sun");
const arrowUp = document.querySelector(".fa-solid.fa-arrow-up");
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
    success.innerHTML = "Product Added Successfully :)";
    success.classList.add("animate-success");
    proName.focus();

    setTimeout(() => {
      success.innerHTML = "";
      success.classList.remove("animate-success");
    }, 1500);

    displayProducts();
    clearInputs();
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

const cancelUpdate = () => {
  displayProducts();
};

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

const handleSubmit = (e) => {
  e.preventDefault();
};

const clearInputs = () => {
  proName.value = price.value = category.value = description.value = "";
};

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

const errorAnimation = () => {
  error.classList.add("animate");
  setTimeout(() => {
    error.classList.remove("animate");
  }, 900);
};

const validation = () => {
  error.innerHTML = "";
};

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

const changeToDark = () => {
  localStorage.setItem("theme", "dark");
  changeTheme();
};

const changeToLight = () => {
  localStorage.setItem("theme", "light");
  changeTheme();
};

const toggleArrow = () => {
  if (window.pageYOffset >= 600) {
    arrowUp.style.cssText = "opacity: 1; pointer-events: all;";
  } else {
    arrowUp.style.cssText = "opacity: 0; pointer-events: none;";
  }
};

const scrollUp = () => {
  window.scroll(0, 0);
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
