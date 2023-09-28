let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

//get toatal
let gettotal = function () {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = result;
    total.style.background = "#008000";
  } else {
    total.innerHTML = "";
    total.style.background = "#008000";
  }
};

//create product
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  swal( " register successfuly!", "success")
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (title.value != "" && category.value != "" && newpro.count < 100) {
    if (mood === "create") {
      
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[tmp] = newpro;
      submit.innerHTML = "create";
      mood = "create";
      count.style.display = "block";
    }
    cleardata();
  }

  localStorage.setItem("product", JSON.stringify(datapro));
  
  console.log(datapro);
  cleardata();
  showdata();
};
//save local storag
//clear input
function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//read

function showdata() {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button  onclick="updatedata(${i})" id="update">update</button></td>
      <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr> 
      `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btndelete = document.getElementById("deleteall");
  if (datapro.length > 0) {
    btndelete.innerHTML = `
          <button onclick = "deleteall()">delete all  (${datapro.length})</button>

        `;
  } else {
    btndelete.innerHTML = "";
  }
}
showdata();
//count
//delete
function deletedata(i) {
  swal( "successfuly delete !", "success")
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showdata();
}

//dellete all function

function deleteall() {
  swal( " successfuly deleted all !", "success")
  localStorage.clear();
  datapro.splice(0);
  showdata();
}

//count

//update

function updatedata(i) {
 
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  gettotal();
  count.style.display = "none";
  category.value = datapro[i].category;
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search

let searchmood = "title";

function getsearchmood(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle") {
    searchmood = "title";
    search.placeholder = "search by title";
  } else {
    searchmood = "category";
    search.placeholder = "search by category";
  }

  search.focus();
  search.value = "";
  showdata();
}

function searchdata(value) {
  let table = "";
  if (searchmood == "title") {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value)) {
        table = `
                    <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button  onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                  </tr> 
                    `;
      }
    }
  } else {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value)) {
        table = `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button  onclick="updatedata(${i})" id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
              </tr> 
                `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//meun
let menu = document.querySelector(".menu");
let opencrud = document.querySelector(".btn-opencrud");
let crudlist = document.querySelector(".crud");
let xbs = document.querySelector(".x");
let header = document.querySelector(".hidden");
let container = document.querySelector('.con-main');
let mainpro = document.querySelector('.main-pro')
let containerx = document.querySelector('.container-x')

let getopen = function () {
  header.classList.remove("hidden");
};

let getclose = function () {
  header.classList.add("hidden");
};
let crudsystem = function () {
  crudlist.classList.remove("crud");
  crudlist.style.transiton= "1s ease-in-out";
};
let close = function () {
  header.classList.add("hidden");
};
let home = function()
{
   container.classList.remove("con-main")
}
let closemainpro = function () {
  container.classList.add('con-main')
}

menu.addEventListener("click", getopen);
xbs.addEventListener("click", getclose);
//opencrud.addEventListener('click',crudsystem)
opencrud.addEventListener("click", close );
opencrud.addEventListener('click',crudsystem)
mainpro.addEventListener('click', home )
containerx.addEventListener('click', closemainpro)
//mainpro.addEventListener('click', getclose )





//phone product

let img = document.querySelector('.img');
let containerr = document.querySelector('.container-wrpper');

function phones (phone)
{
  img.src = phone;
}

function colors (color)
{
 containerr.style.background = color;
}