let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
// to change button action
let mood = 'create';
// mastar variable to use {i} from function update --> at submit function 
let tmp;
// get total
function getTotal() {
    if (price.value != '') {
        let resut = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = resut;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#8b0000';

    }
}

// creat product
//dataPro is array to store data
let dataPro;
//check localstorage had data or not if local had storge didn't clear it 
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (mood === 'create') {
        //check count
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        //update
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';
    }



    //push save object to array
    //dataPro.push(newPro);
    //save localStorage
    localStorage.setItem('product', JSON.stringify(dataPro));

    clearData()
    showData()
}

//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    search.value = '';
}
// read
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `<tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].count}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    //delete all
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">delete all (${dataPro.length})</button>`
    } else {
        btnDelete.innerHTML = '';
    }
    // to change color of total from green to red after finish create or update
    getTotal()
}
showData()




//delete
function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData()
}
//delete all function
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
//count
function countData() {
    let count = 0;
}

//update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    // scroll up
    scroll({
        top: 0,
        behavior: "smooth",
    })
}
clearData()
    //search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
        //  search.placeholder = 'Search By Title';
    } else {
        searchMood = 'category';
        //search.placeholder = 'Search By Category';
    }
    search.placeholder = 'Search By ' + searchMood.charAt(0).toUpperCase() +
        searchMood.slice(1);
    search.focus()
    search.value = '';
    showData()
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {
            //for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `<tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].count}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
            }
            // }
        } else {

            // for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `<tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].count}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
//clean data