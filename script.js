var form = document.querySelector("form");
var input = document.querySelector("#txtTaskName");
var btnDeleteAll = document.querySelector("#btnDeleteAll");
var taskList = document.querySelector("#task-list");
let items;
// ıtems yüklemee
loadItems();

eventListeners();

function eventListeners() {
  // Görev Ekleme
  form.addEventListener("submit", addNewItem);
  // Görevleri tek tek Silme
  taskList.addEventListener("click", deleteItem);
  // Görevleri Hepsini birden silme
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
  items = getItemFromLS();

  items.forEach(function (item) {
    createItem(item);
  });
}

// Localstorageden itemleri getirme
function getItemFromLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}
// LocalStorageye itemleri ekleme
function setItemToLS(text) {
  items = getItemFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

// LocalStorageye itemleri silme

function deleteItemFromLS(text) {
  items = getItemFromLS();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}
// yeni item (görev ekleme)
function createItem(text) {
  var li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  var a = document.createElement("a");
  a.classList = "delete-item float-end";
  a.setAttribute("href", "#");
  a.innerHTML = "<i class='fas fa-times'></i>";

  li.appendChild(a);
  taskList.appendChild(li);
}

// Yeni Görev Ekleme Fonksiyonu
function addNewItem(e) {
  if (input === "" || input == null) {
    alert("Lütfen boş bırakmayınız");
  }

  // create item
  createItem(input.value);

  // Local storageye items Ekleme
  setItemToLS(input.value);

  input.value = "";
  e.preventDefault();
}
// Görev Sİlme Fonksiyonu
function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("Eminmisiniz")) {
      e.target.parentElement.parentElement.remove();

      // Locale Storage içindeki itemleri silme işlemi
      deleteItemFromLS(e.target.parentElement.parentElement.textcontent);
    }
  }
  e.preventDefault();
}
function deleteAllItems(e) {
  if (confirm("Eminmisiniz")) {
    // 1.yol
    // taskList.innerHTML="";

    // 2.yol
    //     taskList.childNodes.forEach(function (item) {
    //       if (item.nodeType === 1) {
    //         item.remove();
    //       }
    //     });
    //   }

    if (confirm("silmek istediğinize eminmisiniz ?")) {
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }
      localStorage.clear();
    }

    e.preventDefault();
  }
}







