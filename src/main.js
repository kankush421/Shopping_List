const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const itemClear = document.getElementById("clear");

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


function addItemToDOM(item){
  //Create List Item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
}

function addItemToStorage(item){
  let itemFromStorage;
  if(localStorage.getItem('items')===null){
    itemFromStorage = [];
  }else{
    itemFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  //Adding new Item to Array
  itemFromStorage.push(item);

  // Convert to JSON String and add to Local Storage
  localStorage.setItem('items',JSON.stringify(itemFromStorage));
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

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (window.confirm("Are you Sure !! ")) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

function removeAllItem() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}

function filterItem(e){
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item)=>{
    const itemName = item.firstChild.textContent.toLowerCase();
    if(itemName.indexOf(text) != -1){
       item.style.display='flex';
    }else{
      item.style.display = 'none';
    }
  })
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
//Event Listeners

itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
itemClear.addEventListener("click", removeAllItem);
itemFilter.addEventListener("input",filterItem);

checkUI();

