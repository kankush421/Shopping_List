const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e){
   e.preventDefault();

   const newItem = itemInput.value;

   // Validate Item
   if(newItem === ''){
    alert("Add Item First");
    return;
   }

   const li

}


//Event Listeners

itemForm.addEventListener('submit', addItem);