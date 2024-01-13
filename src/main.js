const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const itemButton = itemForm.querySelector("button");
const itemClear = document.getElementById("clear");
let isEditMode = false;

function displayItems() {
  const itemFromStorage = getItemFromStorage();
  itemFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Item
  if (newItem === "") {
    alert("Add Item First");
    return;
  }

  // Adding Item to DOM
  addItemToDOM(newItem);
  // Add Item to Local Storage
  addItemToStorage(newItem);
  checkUI();
}

function addItemToDOM(item) {
  //Create List Item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemFromStorage = getItemFromStorage();
  //Adding new Item to Array
  itemFromStorage.push(item);

  // Convert to JSON String and add to Local Storage
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

function getItemFromStorage() {
  let itemFromStorage;
  if (localStorage.getItem("items") === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemFromStorage;
}

function onClickItem(e){
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }else{
       setItemToEdit(e.target);
  }
}

function setItemToEdit(item){
  isEditMode = true;
  itemList.querySelectorAll('li').forEach((i)=> i.classList.remove('edit-mode'));
  item.classList.add("edit-mode");
  itemButton.innerHTML = '<i class = "fa-solid fa-pen"></i> UpdateItem';
  itemButton.style.backgroundColor = '#228B22';
  itemInput.value=item.textContent;
  
}

function removeItem(item) {
  
    if (window.confirm("Are you Sure !! ")) {
      //remove item from DOM
      item.remove();
      // remove item from Storage
      removeItemFromStorage(item.textContent);
      checkUI();
    }
}

function removeItemFromStorage(item){
  let itemFromStorage = getItemFromStorage();
  // Filter Out item to be removed
  itemFromStorage = itemFromStorage.filter((i)=> i !== item)
  // Reset the Local Storage
  localStorage.setItem('items', JSON.stringify(itemFromStorage));
}


function removeAllItem() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // Clear All Items from Storage
  localStorage.removeItem('items');
  checkUI();
}

function filterItem(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    itemFilter.style.display = "none";
    itemClear.style.display = "none";
  } else {
    itemFilter.style.display = "block";
    itemClear.style.display = "block";
  }
}

// Initialize App
function init() {
  //Event Listeners

  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  itemClear.addEventListener("click", removeAllItem);
  itemFilter.addEventListener("input", filterItem);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
