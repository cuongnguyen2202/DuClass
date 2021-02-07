const listProduct = document.getElementById("list-products");
const productAPI = "https://601fc671e3e55e0017f47888.mockapi.io/api/product";

function start() {
    getProduct(renderProduct);
    handleAdd();
}
start();
// Get Product
function getProduct(callback) {
    fetch(productAPI)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}
//render
function renderProduct(products) {
    let renderHtmls = products.map(function(product) {
        return `
   <tr class="product-${product.id}">
   <td>${product.name}</td>
   <td>${product.description}</td>
   <td>${product.price} $</td>
   <td>
       <button href="#editEmployeeModal" onclick="handelUpdateProducts(${product.id})" class="edit" data-toggle="modal" onclick=""><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></button>
       <button class="delete" data-toggle="modal" onclick="deleteProduct(${product.id})"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>
   </td>
</tr>
   `;
    });
    listProduct.innerHTML = renderHtmls.join("");
}

function handleAdd() {
    let addBtn = document.getElementById("add");
    addBtn.onclick = function() {
        let name = document.querySelector('input[name="name"]').value;
        let description = document.querySelector('input[name="description"]').value;
        let price = document.querySelector('input[name="price"]').value;
        let productData = {
            name: name,
            description: description,
            price: price,
        };
        addNewProduct(productData, function() {
            getProduct(renderProduct);
        });
    };
}

function addNewProduct(data, callback) {
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    };
    fetch(productAPI, option)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}
//Delete
function deleteProduct(id) {
    let option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(productAPI + "/" + id, option)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            let productItem = document.querySelector(".product-" + id);
            productItem.remove();
        });
}
//Update
function updateProduct(id, data, callback) {
    let option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    };
    fetch(productAPI + "/" + id, option)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function handelUpdateProducts(id) {
    let itemProduct = document.querySelector(".product-" + id);
    let getName = itemProduct.querySelector("tr td:nth-child(1)").innerText;
    let getDescription = itemProduct.querySelector("tr td:nth-child(2)")
        .innerText;
    let getPrice = itemProduct.querySelector("tr td:nth-child(3)").innerText;
    let name = document.querySelector('input[name="edit-name"]');
    let description = document.querySelector('input[name="edit-description]"');
    let price = document.querySelector('input[name="edit-price]"');
    name.value = getName;
    description.value = getDescription;
    price.value = getPrice;
    let editBtn = document.getElementById("editBtn");
    console.log(editBtn);
    editBtn.onclick = function() {
        let productData = {
            name: name.value,
            description: description.value,
            price: price.value,
        };
        updateProduct(id, productData, function() {
            getProduct(renderProduct);
        });
    };
}