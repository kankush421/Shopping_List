const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const itemClear = document.getElementById("clear");

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Item
  if (newItem === "") {
    alert("Add Item First");
    return;
  }

  //Create List Item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
  checkUI();
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

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
itemClear.addEventListener("click", removeAllItem);

checkUI();


/**  
T0-Do

Add the functionality to filter item section by adding event listener and compairing string of li and filter text
 


*/
