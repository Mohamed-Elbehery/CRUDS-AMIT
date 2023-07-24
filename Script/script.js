//! REGEX
const nameReg = /[A-Z](\w){2,}/;
const priceReg = /^\d+$/;
const categoryReg = /[A-Za-z]\d?/;
//! Variables
const root = document.querySelector(":root");
const inputs = document.querySelectorAll("input");
const proName = document.querySelector("#name");
const price = document.querySelector("#price");
const category = document.querySelector("#cat");
const description = document.querySelector("#desc");
const searchField = document.querySelector("input[type='search']");
const addBtn = document.querySelector("#addBtn");
const table = document.querySelector("table");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const form = document.querySelector("form");
const deleteAllBtn = document.querySelector("#deleteAllBtn");
const success = document.querySelector("#success");
const darkIcon = document.querySelector(".fa-solid.fa-moon");
const lightIcon = document.querySelector(".fa-solid.fa-sun");
const arrowUp = document.querySelector(".fa-solid.fa-arrow-up");
let updateBtnClicked = false;
let products = [];
//! Objects
class Product {
  //todo Object Attributes
  id;
  proName;
  price;
  category;
  description;

  //* Object Initializor (Constructor)
  constructor(proName, price, category, description) {
    this.id = new Date().getTime();
    this.proName = proName || "";
    this.price = price || 0;
    this.category = category || "";
    this.description = description || "";
  }

  //todo Object Behaviours
  /* @Override */
  toString = () =>
    `id : ${this.id}\nProduct Name : ${this.proName}\nProduct Price : ${this.price}\nProduct Category : ${this.category}\nProduct Description : ${this.description}`;
}

//! Functions
//* Will be Triggered after clicking on the Add Product button
const addProducts = () => {
  if (proName.value && price.value && category.value && description.value) {
    if (!nameReg.test(proName.value)) {
      proName.nextElementSibling.innerHTML =
        "Name Should be atleast 3 letters and the first character should be capital";
      errorAnimation(proName.nextElementSibling);
    } else if (!priceReg.test(price.value)) {
      price.nextElementSibling.innerHTML =
        "The Price Input should be only Numbers";
      errorAnimation(price.nextElementSibling);
    } else if (!categoryReg.test(category.value)) {
      category.nextElementSibling.innerHTML = "Category Can't be Only Numbers";
      errorAnimation(category.nextElementSibling);
    } else {
      //todo Creating an Object from Product Class
      const product = new Product(
        proName.value,
        price.value,
        category.value,
        description.value
      );

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
    }
  } else if (proName.value.length === 0) {
    proName.focus();
    proName.nextElementSibling.innerHTML = "Please enter a product Name";
    errorAnimation(proName.nextElementSibling);
  } else if (price.value.length === 0) {
    price.focus();
    price.nextElementSibling.innerHTML = "Please enter a product Price";
    errorAnimation(price.nextElementSibling);
  } else if (category.value.length === 0) {
    category.focus();
    category.nextElementSibling.innerHTML = "Please enter a product Category";
    errorAnimation(category.nextElementSibling);
  } else if (description.value.length === 0) {
    description.focus();
    description.nextElementSibling.innerHTML =
      "Please enter a product Description";
    errorAnimation(description.nextElementSibling);
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
    // Buttons
    const updateBtn = document.querySelector(`#updateBtn${id}`);
    const saveBtn = document.querySelector(`#saveBtn${id}`);
    const cancelBtn = document.querySelector(`#cancelBtn${id}`);

    // update fields (input)
    const proNameUpdate = document.querySelector(`#nameUpdate${id}`);
    const priceUpdate = document.querySelector(`#priceUpdate${id}`);
    const categoryUpdate = document.querySelector(`#catUpdate${id}`);
    const descUpdate = document.querySelector(`#descUpdate${id}`);

    // data fields (p)
    const proNameProduct = document.querySelector(`#nameProduct${id}`);
    const priceProduct = document.querySelector(`#priceProduct${id}`);
    const categoryProduct = document.querySelector(`#catProduct${id}`);
    const descProduct = document.querySelector(`#descProduct${id}`);

    // displaying the update inputs
    proNameUpdate.style.cssText =
      priceUpdate.style.cssText =
      categoryUpdate.style.cssText =
      descUpdate.style.cssText =
        "display: block !important";

    // putting the data into the inputs
    proNameUpdate.value = proNameProduct.innerHTML;
    priceUpdate.value = priceProduct.innerHTML;
    categoryUpdate.value = categoryProduct.innerHTML;
    descUpdate.value = descProduct.innerHTML;

    // hiding the data
    proNameProduct.style.display =
      priceProduct.style.display =
      categoryProduct.style.display =
      descProduct.style.display =
        "none";

    /*
      after clicking on the update btn it will trigger the save and
      focus on the first update input (Product Name)
    */
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

  if (!nameReg.test(proNameUpdate.value)) {
    proNameUpdate.focus();
    proNameUpdate.nextElementSibling.innerHTML =
      "name field is required and should be atleast 3 characters and the first letter should be capital";
    errorAnimation(proNameUpdate.nextElementSibling);
  } else if (!priceReg.test(priceUpdate.value)) {
    priceUpdate.focus();
    priceUpdate.nextElementSibling.innerHTML =
      "price field is required and should be only numbers";
    errorAnimation(priceUpdate.nextElementSibling);
  } else if (!categoryReg.test(categoryUpdate.value)) {
    categoryUpdate.focus();
    categoryUpdate.nextElementSibling.innerHTML =
      "category field is required and can't be only numbers";
    errorAnimation(categoryUpdate.nextElementSibling);
  } else if (descUpdate.value.length === 0) descUpdate.focus();
  else {
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
  }
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

  thead.innerHTML = `
  <tr>
    <th>Name</th>
    <th>Price</th>
    <th>Category</th>
    <th>Description</th>
    <th>Delete</th>
    <th>Update</th>
  </tr>
`;

  products.forEach((product) => {
    thead.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Category</th>
      <th>Description</th>
      <th>Delete</th>
      <th>Update</th>
    </tr>`;
    tbody.innerHTML += `
  <tr>
    <td scope="row">
      <p id="nameProduct${product.id}">${product.proName}</p>
      <input
        type="text"
        class="form-control d-none"
        id="nameUpdate${product.id}"
        oninput="validation(event)"
        onblur="validInputs(this)"
        />
        <p class="form-error text-danger mt-3 fw-bold text-capitalize"></p>
    </td>
    <td>
      <p id="priceProduct${product.id}">${product.price}</p>
      <input
        type="text"
        class="form-control d-none"
        id="priceUpdate${product.id}"
        oninput="validation(event)"
        onblur="validInputs(this)"
      />
      <p class="form-error text-danger mt-3 fw-bold text-capitalize"></p>
    </td>
    <td>
      <p id="catProduct${product.id}">${product.category}</p>
      <input type="text" class="form-control d-none" id="catUpdate${product.id}" oninput="validation(event)" onblur="validInputs(this)" />
      <p class="form-error text-danger mt-3 fw-bold text-capitalize"></p>
    </td>
    <td>
      <p id="descProduct${product.id}">${product.description}</p>
      <input
        type="text"
        class="form-control d-none"
        id="descUpdate${product.id}"
        oninput="validation(event)"
        onblur="validInputs(this)"
      />
      <p class="form-error text-danger mt-3 fw-bold text-capitalize"></p>
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

//* Will be Triggered after adding, deleting or updating a product
const displayProductsForUsers = () => {
  if (products.length > 1) {
    deleteAllBtn.style.cssText = "display: block !important;";
  }
  tbody.innerHTML = "";

  thead.innerHTML = `
  <tr>
    <th>Name</th>
    <th>Price</th>
    <th>Category</th>
    <th>Description</th>
  </tr>
`;

  products.forEach((product) => {
    tbody.innerHTML += `
  <tr>
    <td scope="row">
      <p id="nameProduct${product.id}">${product.proName}</p>
      <input
        type="text"
        class="form-control d-none"
        id="nameUpdate${product.id}"
        oninput="validation(event)"
        onblur="validInputs(this)"
        />
        <p class="form-error text-danger mt-3 fw-bold text-capitalize"></p>
    </td>
    <td>
      <p id="priceProduct${product.id}">${product.price}</p>
      <input
        type="text"
        class="form-control d-none"
        id="priceUpdate${product.id}"
        oninput="validation(event)"
        onblur="validInputs(this)"
      />
      <p class="form-error text-danger mt-3 fw-bold text-capitalize"></p>
    </td>
    <td>
      <p id="catProduct${product.id}">${product.category}</p>
      <input type="text" class="form-control d-none" id="catUpdate${product.id}" oninput="validation(event)" onblur="validInputs(this)" />
      <p class="form-error text-danger mt-3 fw-bold text-capitalize"></p>
    </td>
    <td>
      <p id="descProduct${product.id}">${product.description}</p>
      <input
        type="text"
        class="form-control d-none"
        id="descUpdate${product.id}"
        oninput="validation(event)"
        onblur="validInputs(this)"
      />
      <p class="form-error text-danger mt-3 fw-bold text-capitalize"></p>
    </td>
  </tr>
`;
  });
};

//* Will be Triggered if there is an empty input field
const errorAnimation = (ele) => {
  ele.classList.add("animate");
  setTimeout(() => {
    ele.classList.remove("animate");
  }, 900);
};

//* Will be Triggered if the user presses any key on the search field
const validation = (e) => {
  e.target.nextElementSibling.innerHTML = "";
};

//* Will be Triggered if the user clicks on any theme icon or reloading the page
const changeTheme = () => {
  if (localStorage.theme == "dark") {
    table.classList.add("text-white");
    inputs.forEach((input) => {
      input.classList =
        "form-control mb-3 bg-secondary text-white border-secondary";
    });
    document.body.style.cssText = "color: white;";
    root.style.setProperty("--bodyBackground", "#3b3b3b");
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
    root.style.setProperty("--bodyBackground", "white");
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

const loadApp = () => {
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
window.onload = loadApp();
